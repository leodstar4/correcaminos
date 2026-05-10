import { motion } from 'framer-motion'
import { AlertTriangle, Package } from 'lucide-react'

const CAPACIDAD_MAX = 10000 // kg

const PEDIDOS_ACTUALES = [
  { product: 'Maíz Criollo',    kg: 3500, color: '#2A6B4F' },
  { product: 'Chile Poblano',   kg: 1800, color: '#E07B20' },
  { product: 'Tomate',          kg: 2200, color: '#1A8A7B' },
]

export default function SimuladorCapacidad() {
  const totalPedidos = PEDIDOS_ACTUALES.reduce((s, p) => s + p.kg, 0)
  const pct = (totalPedidos / CAPACIDAD_MAX) * 100
  const restante = CAPACIDAD_MAX - totalPedidos

  const alertColor = pct >= 100 ? 'text-red-500' : pct >= 80 ? 'text-orange-brand' : 'text-green-primary'
  const barColor   = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-orange-brand' : 'bg-green-primary'

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-brand/10 flex items-center justify-center">
            <Package size={15} className="text-orange-brand" />
          </div>
          <div>
            <h3 className="font-display font-bold text-earth-dark text-sm">Capacidad de Envío</h3>
            <p className="font-body text-earth-tan text-xs">Ciclo actual</p>
          </div>
        </div>
        {pct >= 80 && (
          <div className={`flex items-center gap-1 text-xs font-body font-semibold ${alertColor}`}>
            <AlertTriangle size={13} />
            {pct >= 100 ? '¡Sobrecarga!' : 'Casi lleno'}
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between font-body text-xs text-earth-tan mb-1.5">
          <span>{totalPedidos.toLocaleString('es-MX')} kg comprometidos</span>
          <span className={`font-semibold ${alertColor}`}>{pct.toFixed(0)}%</span>
        </div>
        <div className="h-4 bg-cream rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ duration: 1, type: 'spring', damping: 20 }}
            className={`h-full ${barColor} rounded-full`}
          />
        </div>
        <div className="flex justify-between font-body text-xs text-earth-tan mt-1">
          <span>0</span>
          <span>Máx: {CAPACIDAD_MAX.toLocaleString('es-MX')} kg</span>
        </div>
      </div>

      {/* Distribución por producto */}
      <div className="space-y-2">
        {PEDIDOS_ACTUALES.map((p) => {
          const pPct = ((p.kg / CAPACIDAD_MAX) * 100).toFixed(1)
          return (
            <div key={p.product} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
              <div className="flex-1 font-body text-earth-dark text-xs">{p.product}</div>
              <div className="font-body text-earth-tan text-xs">{p.kg.toLocaleString('es-MX')} kg</div>
              <div className="font-body font-semibold text-earth-dark text-xs w-10 text-right">{pPct}%</div>
            </div>
          )
        })}
      </div>

      <div className={`mt-3 text-center font-body text-xs ${restante > 0 ? 'text-green-primary' : 'text-red-500'} font-semibold`}>
        {restante > 0
          ? `Disponible: ${restante.toLocaleString('es-MX')} kg`
          : `Sobrecarga: ${Math.abs(restante).toLocaleString('es-MX')} kg`}
      </div>
    </div>
  )
}
