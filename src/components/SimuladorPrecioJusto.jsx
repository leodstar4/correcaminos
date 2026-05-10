import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp } from 'lucide-react'
import { usePreciosSNIIM, getPrecioProducto } from '../hooks/usePreciosSNIIM'

const PRODUCTOS = [
  'Cilantro', 'Tomate Saladette', 'Maíz Criollo', 'Chile Poblano',
  'Frijol Negro', 'Papa', 'Cebolla Blanca', 'Zanahoria', 'Aguacate Hass',
  'Ejote', 'Calabacita', 'Brócoli',
]

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    if (!target || isNaN(target)) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return value
}

export default function SimuladorPrecioJusto({ onClose }) {
  const [producto, setProducto] = useState('Maíz Criollo')
  const [cantidad, setCantidad] = useState(500)
  const { datos } = usePreciosSNIIM()

  const precioObj = datos ? getPrecioProducto(datos, producto) : null
  const precioSNIIM = precioObj?.precioKg ?? 12.5
  const precioCoyote = +(precioSNIIM * 0.5).toFixed(2)
  const precioCorrecaminos = +(precioSNIIM * 0.9).toFixed(2)

  const ingresoCorrecaminos = Math.round(precioCorrecaminos * cantidad)
  const ingresoCoyote       = Math.round(precioCoyote * cantidad)
  const diferencia          = ingresoCorrecaminos - ingresoCoyote
  const pct                 = precioCoyote > 0 ? Math.round(((precioCorrecaminos - precioCoyote) / precioCoyote) * 100) : 0

  const animatedCorrecaminos = useCountUp(ingresoCorrecaminos)
  const animatedCoyote       = useCountUp(ingresoCoyote)
  const animatedDif          = useCountUp(diferencia)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-primary to-teal-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-cream text-xl">💰 Precio Justo</h3>
              <p className="font-body text-cream/65 text-sm mt-0.5">Compara tu ingreso real vs coyotes</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-cream transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Producto</label>
              <select className="input-field" value={producto} onChange={(e) => setProducto(e.target.value)}>
                {PRODUCTOS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">
                Cantidad: {cantidad.toLocaleString('es-MX')} kg
              </label>
              <input type="range" min={50} max={5000} step={50} value={cantidad}
                onChange={(e) => setCantidad(+e.target.value)}
                className="w-full accent-green-primary"
              />
              <div className="flex justify-between font-body text-earth-tan text-xs mt-1">
                <span>50 kg</span><span>5,000 kg</span>
              </div>
            </div>
          </div>

          {/* Precios comparados */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3 border border-red-100">
              <div>
                <div className="font-body text-xs text-red-400 font-semibold uppercase tracking-wide">Coyote</div>
                <div className="font-display font-bold text-red-500 text-xl">${precioCoyote.toFixed(2)}<span className="text-sm font-body font-normal text-red-400">/kg</span></div>
              </div>
              <div className="text-red-400 text-xs font-body">~50% del SNIIM</div>
            </div>

            <div className="flex items-center justify-between bg-yellow-50 rounded-xl px-4 py-3 border border-yellow-200">
              <div>
                <div className="font-body text-xs text-yellow-600 font-semibold uppercase tracking-wide">SNIIM oficial</div>
                <div className="font-display font-bold text-yellow-700 text-xl">${precioSNIIM.toFixed(2)}<span className="text-sm font-body font-normal text-yellow-600">/kg</span></div>
              </div>
              <div className="text-yellow-600 text-xs font-body">Referencia mercado</div>
            </div>

            <div className="flex items-center justify-between bg-green-primary/8 rounded-xl px-4 py-3 border border-green-primary/20">
              <div>
                <div className="font-body text-xs text-green-primary font-semibold uppercase tracking-wide">Correcaminos</div>
                <div className="font-display font-bold text-green-primary text-xl">${precioCorrecaminos.toFixed(2)}<span className="text-sm font-body font-normal text-green-primary/70">/kg</span></div>
              </div>
              <div className="flex items-center gap-1 text-green-primary text-xs font-body font-semibold">
                <TrendingUp size={12} />
                +{pct}% vs coyote
              </div>
            </div>
          </div>

          {/* Ingreso total */}
          <div className="bg-gradient-to-br from-green-primary to-teal-brand rounded-2xl p-4 text-cream space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-body text-cream/70 text-sm">Con Correcaminos</span>
              <span className="font-display font-bold text-xl">${animatedCorrecaminos.toLocaleString('es-MX')}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <span className="font-body text-cream/70 text-sm">Con coyotes</span>
              <span className="font-display font-bold text-cream/60 text-lg">${animatedCoyote.toLocaleString('es-MX')}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <span className="font-body font-semibold text-cream text-sm">Tu ganancia extra 💚</span>
              <span className="font-display font-bold text-orange-light text-xl">${animatedDif.toLocaleString('es-MX')}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 btn-outline text-sm">Cerrar</button>
            <button className="flex-1 bg-green-primary text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-green-dark transition-colors shadow-card active:scale-95">
              Publicar cosecha →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
