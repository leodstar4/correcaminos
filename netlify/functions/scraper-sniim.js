const https = require('https');
const http = require('http');

const SNIIM_BASE = 'http://www.economia-sniim.gob.mx';

const PRODUCTOS = [
  { id: 839, nombre: 'Tomate Saladette' },
  { id: 29, nombre: 'Maíz Criollo' },
  { id: 50, nombre: 'Frijol Negro' },
  { id: 36, nombre: 'Chile Poblano' },
  { id: 117, nombre: 'Papa' },
  { id: 94, nombre: 'Cebolla Blanca' },
  { id: 105, nombre: 'Zanahoria' },
  { id: 84, nombre: 'Lechuga Romana' },
  { id: 131, nombre: 'Aguacate Hass' },
  { id: 95, nombre: 'Ejote' },
];

const MERCADO_DEFAULT = 10;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parsePrecios(html) {
  const precios = [];
  
  const tdRegex = /<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>/gi;
  let match;
  while ((match = tdRegex.exec(html)) !== null) {
    const producto = match[1]?.trim();
    const precio = match[2]?.trim();
    const fecha = match[3]?.trim();
    
    if (producto && precio && !precio.includes('---') && !precio.includes('N/A')) {
      const precioLimpio = parseFloat(precio.replace(/[^0-9.,]/g, '').replace(',', '.'));
      if (!isNaN(precioLimpio) && precioLimpio > 0) {
        precios.push({
          nombre: producto,
          precioKg: precioLimpio,
          fecha: fecha || new Date().toISOString().split('T')[0]
        });
      }
    }
  }
  
  return precios;
}

async function obtenerPreciosProducto(productoId) {
  try {
    const url = `${SNIIM_BASE}/Nuevo/Home.aspx?opcion=Consultas/MercadosNacionales/PreciosDeMercado/Agricolas/ResultadosConsultaFechaFrutasYHortalizas.aspx?ProductoId=${productoId}&MercadoId=${MERCADO_DEFAULT}`;
    
    const html = await fetchPage(url);
    const precios = parsePrecios(html);
    
    return precios.length > 0 ? precios[0] : null;
  } catch (error) {
    console.error(`Error obteniendo precio para producto ${productoId}:`, error.message);
    return null;
  }
}

async function handler(event, context) {
  console.log('🔄 Obteniendo precios del SNIIM...');
  
  const preciosActualizados = [];
  const timestamp = new Date().toISOString();
  
  for (const producto of PRODUCTOS) {
    try {
      console.log(`  ↳ Consultando: ${producto.nombre}`);
      
      const resultado = await obtenerPreciosProducto(producto.id);
      
      if (resultado) {
        preciosActualizados.push({
          nombre: producto.nombre,
          precioKg: resultado.precioKg,
          origen: 'Central de Abastos Puebla',
          unidad: 'kg',
          ultimaActualizacion: resultado.fecha
        });
      } else {
        preciosActualizados.push({
          nombre: producto.nombre,
          precioKg: null,
          origen: 'SNIIM',
          unidad: 'kg',
          observaciones: 'Dato no disponible'
        });
      }
      
      await new Promise(r => setTimeout(r, 500));
      
    } catch (error) {
      console.error(`  ⚠ Error con ${producto.nombre}:`, error.message);
      preciosActualizados.push({
        nombre: producto.nombre,
        precioKg: null,
        error: error.message
      });
    }
  }
  
  const response = {
    ultimoUpdate: timestamp,
    origen: 'SNIIM - Sistema Nacional de Información de Mercados',
    mercado: 'Central de Abastos Puebla',
    productos: preciosActualizados.filter(p => p.precioKg !== null)
  };
  
  console.log(`✅ Obtenidos ${response.productos.length} precios`);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(response)
  };
}

module.exports = { handler };