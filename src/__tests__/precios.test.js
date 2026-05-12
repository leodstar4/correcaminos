import { describe, it, expect } from 'vitest'
import {
  calcularPrecioCoyote,
  calcularPrecioCorrecaminos,
  calcularIngresos,
  calcularGananciaNeta,
} from '../utils/precios'

describe('calcularPrecioCoyote', () => {
  it('devuelve el 50% del precio SNIIM', () => {
    expect(calcularPrecioCoyote(12.5)).toBe(6.25)
    expect(calcularPrecioCoyote(18.5)).toBe(9.25)
    expect(calcularPrecioCoyote(45)).toBe(22.5)
  })

  it('devuelve 0 cuando el precio SNIIM es 0', () => {
    expect(calcularPrecioCoyote(0)).toBe(0)
  })

  it('redondea a 2 decimales', () => {
    // 7.33 * 0.5 = 3.665 → 3.67
    expect(calcularPrecioCoyote(7.33)).toBe(3.67)
  })
})

describe('calcularPrecioCorrecaminos', () => {
  it('devuelve el 90% del precio SNIIM', () => {
    expect(calcularPrecioCorrecaminos(20)).toBe(18)
    expect(calcularPrecioCorrecaminos(12.5)).toBe(11.25)
    expect(calcularPrecioCorrecaminos(45)).toBe(40.5)
  })

  it('siempre es mayor que el precio coyote', () => {
    [10, 12.5, 18.5, 28, 32, 45].forEach((p) => {
      expect(calcularPrecioCorrecaminos(p)).toBeGreaterThan(calcularPrecioCoyote(p))
    })
  })
})

describe('calcularIngresos', () => {
  it('calcula ingresos correctamente para maíz criollo', () => {
    // SNIIM $12.50 · 500 kg
    const r = calcularIngresos(12.5, 500)
    expect(r.precioCoyote).toBe(6.25)
    expect(r.precioCorrecaminos).toBe(11.25)
    expect(r.ingresoCorrecaminos).toBe(5625)
    expect(r.ingresoCoyote).toBe(3125)
    expect(r.diferencia).toBe(2500)
  })

  it('el porcentaje de mejora siempre es 80% (90% vs 50% del SNIIM)', () => {
    [10, 20, 32, 45].forEach((p) => {
      expect(calcularIngresos(p, 100).pct).toBe(80)
    })
  })

  it('la diferencia siempre es positiva con precios SNIIM reales', () => {
    [12.5, 18.5, 28, 32, 45].forEach((p) => {
      expect(calcularIngresos(p, 100).diferencia).toBeGreaterThan(0)
    })
  })

  it('pct es 0 cuando el precio SNIIM es 0', () => {
    expect(calcularIngresos(0, 500).pct).toBe(0)
  })
})

describe('calcularGananciaNeta', () => {
  it('calcula ingreso bruto, neto y margen correctamente', () => {
    const r = calcularGananciaNeta(500, 12.5, 2500)
    expect(r.ingresoBruto).toBe(6250)
    expect(r.gananciaNeta).toBe(3750)
    expect(r.margen).toBe(60)
  })

  it('margen es 0 cuando el ingreso bruto es 0', () => {
    expect(calcularGananciaNeta(0, 12.5, 0).margen).toBe(0)
  })

  it('ganancia neta puede ser negativa cuando el costo supera al ingreso', () => {
    expect(calcularGananciaNeta(10, 5, 10000).gananciaNeta).toBeLessThan(0)
  })

  it('margen es 100% cuando el costo es 0', () => {
    expect(calcularGananciaNeta(100, 10, 0).margen).toBe(100)
  })
})
