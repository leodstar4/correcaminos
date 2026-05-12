// Fórmulas oficiales del modelo Correcaminos:
// coyote paga ~50% del SNIIM, Correcaminos paga ~90%.
export function calcularPrecioCoyote(precioSNIIM) {
  return +(precioSNIIM * 0.5).toFixed(2)
}

export function calcularPrecioCorrecaminos(precioSNIIM) {
  return +(precioSNIIM * 0.9).toFixed(2)
}

export function calcularIngresos(precioSNIIM, cantidad) {
  const precioCoyote = calcularPrecioCoyote(precioSNIIM)
  const precioCorrecaminos = calcularPrecioCorrecaminos(precioSNIIM)
  const ingresoCorrecaminos = Math.round(precioCorrecaminos * cantidad)
  const ingresoCoyote = Math.round(precioCoyote * cantidad)
  const diferencia = ingresoCorrecaminos - ingresoCoyote
  const pct = precioCoyote > 0
    ? Math.round(((precioCorrecaminos - precioCoyote) / precioCoyote) * 100)
    : 0
  return { precioCoyote, precioCorrecaminos, ingresoCorrecaminos, ingresoCoyote, diferencia, pct }
}

export function calcularGananciaNeta(kg, precio, costo) {
  const ingresoBruto = kg * precio
  const gananciaNeta = ingresoBruto - costo
  const margen = ingresoBruto > 0 ? +((gananciaNeta / ingresoBruto) * 100).toFixed(1) : 0
  return { ingresoBruto, gananciaNeta, margen }
}
