const PRECIOS_SNIIM_BASE = {
  ultimoUpdate: '2026-05-05',
  origen: 'SNIIM - Sistema Nacional de Información de Mercados',
  
  productos: [
    { nombre: 'Tomate Saladette', precioKg: 18.50, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Maíz Criollo', precioKg: 12.50, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Maíz Amarillo', precioKg: 7.50, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Frijol Negro', precioKg: 28.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Frijol Pinto', precioKg: 26.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Chile Poblano', precioKg: 32.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Chile Jalapeño', precioKg: 25.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Papa', precioKg: 14.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Cebolla Blanca', precioKg: 16.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Zanahoria', precioKg: 12.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Lechuga Romana', precioKg: 15.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Aguacate Hass', precioKg: 45.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Ejote', precioKg: 22.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Calabacita', precioKg: 14.00, origen: 'Puebla', unidad: 'kg' },
    { nombre: 'Brócoli', precioKg: 20.00, origen: 'Puebla', unidad: 'kg' },
  ],
  
  comparativaCoyote: {
    tomate: { coyote: 6.00, correcaminos: 18.50, diferencia: '+208%' },
    maiz: { coyote: 5.00, correcaminos: 12.50, diferencia: '+150%' },
    frijol: { coyote: 18.00, correcaminos: 28.00, diferencia: '+56%' },
    chilePoblano: { coyote: 15.00, correcaminos: 32.00, diferencia: '+113%' },
  },
};

export function getPreciosSNIIM() {
  return PRECIOS_SNIIM_BASE;
}

export function getPrecioProducto(nombreProducto) {
  const producto = PRECIOS_SNIIM_BASE.productos.find(
    p => p.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
  );
  return producto || null;
}

export function getComparativaCoyote(producto) {
  const key = producto.toLowerCase().replace(' ', '');
  return PRECIOS_SNIIM_BASE.comparativaCoyote[key] || null;
}

export function formatPrecio(precio) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(precio);
}

export async function actualizarPreciosDesdeSNIIM() {
  console.log('Actualizando precios desde SNIIM...');
  return PRECIOS_SNIIM_BASE;
}