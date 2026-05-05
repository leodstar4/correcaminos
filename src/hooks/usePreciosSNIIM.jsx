import { useState, useEffect } from 'react';

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
};

export function usePreciosSNIIM() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function obtenerPrecios() {
      try {
        setCargando(true);
        
        const respuesta = await fetch('/api/scraper-sniim');
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener precios');
        }
        
        const datos = await respuesta.json();
        setDatos(datos);
      } catch (err) {
        console.warn('SNIIM no disponible, usando datos locales:', err.message);
        setDatos(PRECIOS_SNIIM_BASE);
      } finally {
        setCargando(false);
      }
    }

    obtenerPrecios();
  }, []);

  return { datos, cargando, error };
}

export function getPrecioProducto(datos, nombreProducto) {
  if (!datos?.productos) return null;
  
  const producto = datos.productos.find(
    p => p.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
  );
  return producto || null;
}

export function formatPrecio(precio) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(precio);
}