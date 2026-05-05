import { useState, useEffect } from 'react';

const PRECIOS_DEFAULT = {
  ultimoUpdate: new Date().toISOString(),
  origen: 'SNIIM',
  productos: [
    { nombre: 'Tomate Saladette', precioKg: 18.50, unidad: 'kg' },
    { nombre: 'Maíz Criollo', precioKg: 12.50, unidad: 'kg' },
    { nombre: 'Maíz Amarillo', precioKg: 7.50, unidad: 'kg' },
    { nombre: 'Frijol Negro', precioKg: 28.00, unidad: 'kg' },
    { nombre: 'Frijol Pinto', precioKg: 26.00, unidad: 'kg' },
    { nombre: 'Chile Poblano', precioKg: 32.00, unidad: 'kg' },
    { nombre: 'Chile Jalapeño', precioKg: 25.00, unidad: 'kg' },
    { nombre: 'Papa', precioKg: 14.00, unidad: 'kg' },
    { nombre: 'Cebolla Blanca', precioKg: 16.00, unidad: 'kg' },
    { nombre: 'Zanahoria', precioKg: 12.00, unidad: 'kg' },
    { nombre: 'Lechuga Romana', precioKg: 15.00,unidad: 'kg' },
    { nombre: 'Aguacate Hass', precioKg: 45.00,unidad: 'kg' },
    { nombre: 'Ejote', precioKg: 22.00,unidad: 'kg' },
    { nombre: 'Calabacita', precioKg: 14.00,unidad: 'kg' },
    { nombre: 'Brócoli', precioKg: 20.00,unidad: 'kg' },
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
          setDatos(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Error cargando precios:', err.message);
    }
    setDatos(PRECIOS_DEFAULT);
  };

  useEffect(() => {
    obtenerPrecios();
  }, []);

  const actualizar = () => obtenerPrecios();

  return { datos, cargando, actualizar };
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