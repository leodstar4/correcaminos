import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

export default function CalculadoraGanancia() {
  const [kg, setKg] = useState(500)
  const [precio, setPrecio] = useState(12.5)
  const [costo, setCosto] = useState(2500)

  const ingresoBruto = kg * precio
  const gananciaNeta = ingresoBruto - costo
  const margen = ingresoBruto > 0 ? ((gananciaNeta / ingresoBruto) * 100).toFixed(1) : 0

  const fmt = (n) => `$${Math.round(n).toLocaleString('es-MX')}`

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-teal-brand/10 flex items-center justify-center">
          <Calculator size={15} className="text-teal-brand" />
        </div>
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Calculadora de Ganancia</h3>
          <p className="font-body text-earth-tan text-xs">Neta estimada por cosecha</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="font-body text-xs text-earth-tan font-semibold uppercase tracking-wide mb-1 block">
            Cantidad: {kg.toLocaleString('es-MX')} kg
          </label>
          <input type="range" min={50} max={5000} step={50} value={kg}
            onChange={(e) => setKg(+e.target.value)} className="w-full accent-green-primary" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-body text-xs text-earth-tan font-semibold uppercase tracking-wide mb-1 block">Precio $/kg</label>
            <input type="number" min={1} step={0.5} value={precio}
              onChange={(e) => setPrecio(+e.target.value)}
              className="input-field text-sm py-2" />
          </div>
          <div>
            <label className="font-body text-xs text-earth-tan font-semibold uppercase tracking-wide mb-1 block">Costo prod. $</label>
            <input type="number" min={0} step={100} value={costo}
              onChange={(e) => setCosto(+e.target.value)}
              className="input-field text-sm py-2" />
          </div>
        </div>
      </div>

      <motion.div key={gananciaNeta} initial={{ opacity: 0.6, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-primary/8 to-teal-brand/6 rounded-xl p-4 grid grid-cols-3 gap-3 border border-green-primary/15"
      >
        <div className="text-center">
          <div className="font-body text-earth-tan text-xs mb-1">Bruto</div>
          <div className="font-display font-bold text-earth-dark text-sm">{fmt(ingresoBruto)}</div>
        </div>
        <div className="text-center border-x border-green-primary/20">
          <div className="font-body text-earth-tan text-xs mb-1">Neto</div>
          <div className={`font-display font-bold text-base ${gananciaNeta >= 0 ? 'text-green-primary' : 'text-red-500'}`}>
            {fmt(gananciaNeta)}
          </div>
        </div>
        <div className="text-center">
          <div className="font-body text-earth-tan text-xs mb-1">Margen</div>
          <div className={`font-display font-bold text-sm ${+margen >= 30 ? 'text-green-primary' : +margen >= 10 ? 'text-orange-brand' : 'text-red-500'}`}>
            {margen}%
          </div>
        </div>
      </motion.div>
    </div>
  )
}
