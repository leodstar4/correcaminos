import https from 'https';
import http from 'http';

const SNIIM_BASE = 'http://www.economia-sniim.gob.mx';

const PRODUCTOS = [
  { id: 839, nombre: 'Tomate' },
  { id: 29, nombre: 'Maíz' },
  { id: 50, nombre: 'Frijol' },
  { id: 36, nombre: 'Chile Poblano' },
  { id: 131, nombre: 'Aguacate' },
  { id: 117, nombre: 'Papa' },
  { id: 94, nombre: 'Cebolla' },
  { id: 105, nombre: 'Zanahoria' },
  { id: 84, nombre: 'Lechuga' },
  { id: 95, nombre: 'Ejote' },
];

const MERCADOS = [
  { id: 10, nombre: 'Central de Abastos Puebla' },
  { id: 12, nombre: 'Mercado de Atlixco' },
  { id: 15, nombre: 'Mercado de Tepeaca' },
];

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
  const regex = /<tr[^>]*>[\s\S]*?<td[^>]*>([^<]*)<\/td>[\s\S]*?<td[^>]*>([^<]*)<\/td>[\s\S]*?<td[^>]*>([^<]*)<\/td>[\s\S]*?<\/tr>/gi;
  
  let match;
  while ((match = regex.exec(html)) !== null) {
    const producto = match[1]?.trim();
    const precio = match[2]?.trim();
    const fecha = match[3]?.trim();
    
    if (producto && precio && !precio.includes('---')) {
      precios.push({ producto, precio, fecha });
    }
  }
  
  return precios;
}

export async function obtenerPreciosSNIIM() {
  console.log('🔄 Obteniendo precios del SNIIM...');
  
  const preciosActualizados = [];
  
  for (const producto of PRODUCTOS) {
    try {
      const url = `${SNIIM_BASE}/Nuevo/Home.aspx?opcion=Consultas/MercadosNacionales/PreciosDeMercado/Agricolas/ResultadosConsultaFechaFrutasYHortalizas.aspx?ProductoId=${producto.id}`;
      
      console.log(`  ↳ Consultando: ${producto.nombre}`);
      
      const html = await fetchPage(url);
      const precios = parsePrecios(html);
      
      preciosActualizados.push({
        producto: producto.nombre,
        precios: precios.slice(0, 10),
        actualizado: new Date().toISOString()
      });
      
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (error) {
      console.error(`  ⚠ Error con ${producto.nombre}: ${error.message}`);
    }
  }
  
  return preciosActualizados;
}

export async function obtenerPrecioEspecifico(producto, mercado = 10) {
  try {
    const url = `${SNIIM_BASE}/Nuevo/Home.aspx?opcion=Consultas/MercadosNacionales/PreciosDeMercado/Agricolas/ResultadosConsultaFechaFrutasYHortalizas.aspx?ProductoId=${producto.id}&MercadoId=${mercado}`;
    const html = await fetchPage(url);
    return parsePrecios(html);
  } catch (error) {
    console.error(`Error obteniendo precio de ${producto.nombre}:`, error);
    return null;
  }
}

export function convertirAPrecioKg(precioStr) {
  const limpio = precioStr.replace(/[^0-9.,]/g, '').replace(',', '.');
  const precio = parseFloat(limpio);
  return isNaN(precio) ? null : precio;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  obtenerPreciosSNIIM()
    .then(result => {
      console.log('\n✅ Precios obtenidos:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(console.error);
}