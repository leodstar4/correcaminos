import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useSimulationStore from '../store/useSimulationStore'

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return value
}

export default function WidgetAhorro() {
  const { cumulativeSavings, buyerSpendingData } = useSimulationStore()

  const totalReal    = buyerSpendingData.reduce((a, b) => a + b, 0)
  const totalCoyotes = Math.round(totalReal * 1.38)
  const pctAhorro    = (((totalCoyotes - totalReal) / totalCoyotes) * 100).toFixed(1)

  // Mejor mes
  const savingsPerMonth = buyerSpendingData.map(v => Math.round(v * 0.38))
  const maxSavings = Math.max(...savingsPerMonth)
  const meses = ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May']
  const mejorMes = meses[savingsPerMonth.indexOf(maxSavings)]

  const animAhorro   = useCountUp(cumulativeSavings)
  const animCoyotes  = useCountUp(totalCoyotes)
  const animReal     = useCountUp(totalReal)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-green-primary via-green-primary to-teal-brand rounded-2xl p-6 text-cream relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-8 w-24 h-24 rounded-full bg-white/4 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-2xl mb-1">🌽</div>
            <h3 className="font-display font-bold text-cream text-base">Tu Ahorro con Correcaminos</h3>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5">
            <span className="font-body text-cream text-xs font-semibold">-{pctAhorro}% vs mercado</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="font-body text-cream/60 text-xs mb-1">Con coyotes hubieras pagado</div>
            <div className="font-display font-bold text-cream/80 text-base">${animCoyotes.toLocaleString('es-MX')}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="font-body text-cream/60 text-xs mb-1">Lo que pagaste de verdad</div>
            <div className="font-display font-bold text-cream text-base">${animReal.toLocaleString('es-MX')}</div>
          </div>
        </div>

        <div className="bg-orange-brand/20 border border-orange-brand/30 rounded-xl p-4 mb-4">
          <div className="font-body text-cream/70 text-xs mb-0.5">💰 Ahorro acumulado total</div>
          <div className="font-display font-bold text-3xl text-orange-light">
            ${animAhorro.toLocaleString('es-MX')} MXN
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/8 rounded-xl p-3">
            <div className="font-body text-cream/60 text-xs mb-0.5">Mejor mes</div>
            <div className="font-body font-semibold text-cream text-sm">{mejorMes}</div>
            <div className="font-body text-cream/70 text-xs">-${maxSavings.toLocaleString('es-MX')}</div>
          </div>
          <div className="bg-white/8 rounded-xl p-3">
            <div className="font-body text-cream/60 text-xs mb-0.5">Último pedido</div>
            <div className="font-body font-semibold text-cream text-sm">Tomate · 200 kg</div>
            <div className="font-body text-cream/70 text-xs">Ahorraste $1,406</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
