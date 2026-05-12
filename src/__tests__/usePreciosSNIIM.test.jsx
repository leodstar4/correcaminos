import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import {
  usePreciosSNIIM,
  getPrecioProducto,
  getUnidadLabel,
  getHistorialProducto,
  formatPrecio,
} from '../hooks/usePreciosSNIIM'

const MOCK_DATA = {
  ultimoUpdate: '2026-05-11T12:00:00.000Z',
  origen: 'SNIIM',
  mercado: 'Central de Abastos Puebla',
  historial: [
    { fecha: '2026-05-10', precios: { 'Tomate Saladette': 19.0, 'Maíz Criollo': 13.0 } },
    { fecha: '2026-05-09', precios: { 'Tomate Saladette': 18.5, 'Maíz Criollo': 12.5 } },
  ],
  productos: [
    { nombre: 'Cilantro', precioKg: 22.0, unidad: 'manojo' },
    { nombre: 'Tomate Saladette', precioKg: 19.0, unidad: 'kg' },
    { nombre: 'Maíz Criollo', precioKg: 13.0, unidad: 'kg' },
  ],
}

describe('usePreciosSNIIM', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('carga precios del JSON exitosamente', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA })

    const { result } = renderHook(() => usePreciosSNIIM())

    expect(result.current.cargando).toBe(true)

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(result.current.datos.productos).toHaveLength(3)
    expect(result.current.datos.mercado).toBe('Central de Abastos Puebla')
  })

  it('garantiza que cilantro es el primer producto aunque no venga primero', async () => {
    const dataDesordenada = {
      ...MOCK_DATA,
      productos: [
        { nombre: 'Tomate Saladette', precioKg: 19.0, unidad: 'kg' },
        { nombre: 'Cilantro', precioKg: 22.0, unidad: 'manojo' },
        { nombre: 'Maíz Criollo', precioKg: 13.0, unidad: 'kg' },
      ],
    }
    fetch.mockResolvedValueOnce({ ok: true, json: async () => dataDesordenada })

    const { result } = renderHook(() => usePreciosSNIIM())

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(result.current.datos.productos[0].nombre).toBe('Cilantro')
  })

  it('usa precios por defecto cuando el fetch lanza error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => usePreciosSNIIM())

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(result.current.datos).not.toBeNull()
    expect(result.current.datos.productos.length).toBeGreaterThan(0)
  })

  it('usa precios por defecto cuando la respuesta HTTP no es ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false })

    const { result } = renderHook(() => usePreciosSNIIM())

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(result.current.datos.productos.length).toBeGreaterThan(0)
  })

  it('usa precios por defecto cuando el JSON tiene lista de productos vacía', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ productos: [] }) })

    const { result } = renderHook(() => usePreciosSNIIM())

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(result.current.datos.productos.length).toBeGreaterThan(0)
  })

  it('expone la función actualizar', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => MOCK_DATA })

    const { result } = renderHook(() => usePreciosSNIIM())

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(typeof result.current.actualizar).toBe('function')
  })
})

describe('getPrecioProducto', () => {
  const datos = { productos: MOCK_DATA.productos }

  it('encuentra producto por nombre exacto', () => {
    const p = getPrecioProducto(datos, 'Cilantro')
    expect(p).not.toBeNull()
    expect(p.precioKg).toBe(22.0)
  })

  it('es case-insensitive', () => {
    expect(getPrecioProducto(datos, 'cilantro')).not.toBeNull()
    expect(getPrecioProducto(datos, 'TOMATE')).not.toBeNull()
  })

  it('encuentra por nombre parcial', () => {
    expect(getPrecioProducto(datos, 'Maíz')).not.toBeNull()
  })

  it('devuelve null cuando el producto no existe', () => {
    expect(getPrecioProducto(datos, 'Plátano')).toBeNull()
  })

  it('devuelve null cuando datos es null', () => {
    expect(getPrecioProducto(null, 'Cilantro')).toBeNull()
  })

  it('devuelve null cuando datos no tiene productos', () => {
    expect(getPrecioProducto({}, 'Cilantro')).toBeNull()
  })
})

describe('getUnidadLabel', () => {
  it('devuelve "manojo" para cilantro', () => {
    expect(getUnidadLabel({ unidad: 'manojo' })).toBe('manojo')
  })

  it('devuelve "kg" para productos normales', () => {
    expect(getUnidadLabel({ unidad: 'kg' })).toBe('kg')
  })

  it('devuelve "kg" para null o undefined', () => {
    expect(getUnidadLabel(null)).toBe('kg')
    expect(getUnidadLabel(undefined)).toBe('kg')
  })
})

describe('getHistorialProducto', () => {
  const datos = { historial: MOCK_DATA.historial }

  it('extrae la serie histórica de un producto', () => {
    const serie = getHistorialProducto(datos, 'Tomate Saladette')
    expect(serie).toHaveLength(2)
    expect(serie[0]).toEqual({ fecha: '2026-05-10', precio: 19.0 })
  })

  it('devuelve array vacío cuando historial no existe', () => {
    expect(getHistorialProducto({}, 'Tomate')).toEqual([])
    expect(getHistorialProducto(null, 'Tomate')).toEqual([])
  })

  it('devuelve array vacío cuando el producto no tiene datos históricos', () => {
    expect(getHistorialProducto(datos, 'Aguacate')).toEqual([])
  })
})

describe('formatPrecio', () => {
  it('formatea como peso mexicano con 2 decimales', () => {
    const formatted = formatPrecio(12.5)
    expect(formatted).toContain('12')
    expect(formatted).toContain('.50')
  })

  it('incluye el símbolo de moneda MXN', () => {
    const formatted = formatPrecio(100)
    expect(formatted).toContain('$')
  })
})
