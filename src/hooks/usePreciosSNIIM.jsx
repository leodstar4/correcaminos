import { useState, useEffect } from 'react';

// Cilantro se cotiza por manojo en SNIIM (no por kg).
// 1 manojo estándar ≈ 100-120 g → ~10-12 manojos/kg.
// El campo precioKg almacena el precio en la unidad nativa (manojo para cilantro, kg para el resto).
const PRECIOS_DEFAULT = {
  ultimoUpdate: new Date().toISOString(),
  origen: 'SNIIM',
  mercado: 'Central de Abastos Puebla',
  historial: [],
  productos: [
    { nombre: 'Cilantro',        precioKg: 20.0,  unidad: 'manojo' },
    { nombre: 'Tomate Saladette',precioKg: 18.50, unidad: 'kg' },
    { nombre: 'Maíz Criollo',    precioKg: 12.50, unidad: 'kg' },
    { nombre: 'Maíz Amarillo',   precioKg: 7.50,  unidad: 'kg' },
    { nombre: 'Frijol Negro',    precioKg: 28.00, unidad: 'kg' },
    { nombre: 'Frijol Pinto',    precioKg: 26.00, unidad: 'kg' },
    { nombre: 'Chile Poblano',   precioKg: 32.00, unidad: 'kg' },
    { nombre: 'Chile Jalapeño',  precioKg: 25.00, unidad: 'kg' },
    { nombre: 'Papa',            precioKg: 14.00, unidad: 'kg' },
    { nombre: 'Cebolla Blanca',  precioKg: 16.00, unidad: 'kg' },
    { nombre: 'Zanahoria',       precioKg: 12.00, unidad: 'kg' },
    { nombre: 'Lechuga Romana',  precioKg: 15.00, unidad: 'kg' },
    { nombre: 'Aguacate Hass',   precioKg: 45.00, unidad: 'kg' },
    { nombre: 'Ejote',           precioKg: 22.00, unidad: 'kg' },
    { nombre: 'Calabacita',      precioKg: 14.00, unidad: 'kg' },
    { nombre: 'Brócoli',         precioKg: 20.00, unidad: 'kg' },
  ],
};

export function usePreciosSNIIM() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  const obtenerPrecios = async () => {
    try {
      setCargando(true);
      const response = await fetch('/precios-sniim.json');
      if (response.ok) {
        const data = await response.json();
        if (data.productos?.length > 0) {
          // Garantizar que cilantro siempre sea el primer producto
          const cilantro = data.productos.find(p => p.nombre === 'Cilantro');
          const resto = data.productos.filter(p => p.nombre !== 'Cilantro');
          setDatos({ ...data, productos: cilantro ? [cilantro, ...resto] : data.productos });
          return;
        }
      }
    } catch (err) {
      console.warn('Error cargando precios:', err.message);
    }
    setDatos(PRECIOS_DEFAULT);
  };

  useEffect(() => { obtenerPrecios(); }, []);

  return { datos, cargando, actualizar: obtenerPrecios };
}

export function getPrecioProducto(datos, nombreProducto) {
  if (!datos?.productos) return null;
  return datos.productos.find(
    p => p.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
  ) || null;
}

// Devuelve la etiqueta de unidad correcta para mostrar en UI
export function getUnidadLabel(producto) {
  return producto?.unidad === 'manojo' ? 'manojo' : 'kg';
}

// Extrae la serie histórica de un producto del campo historial del JSON
export function getHistorialProducto(datos, nombreProducto) {
  if (!datos?.historial?.length) return [];
  return datos.historial
    .filter(h => h.precios?.[nombreProducto] != null)
    .map(h => ({ fecha: h.fecha, precio: h.precios[nombreProducto] }));
}

export function formatPrecio(precio) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(precio);
}
