import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, CheckCircle } from 'lucide-react'

const PRODUCTOS_BASE = [
  { name: 'Maíz Criollo',    kg: 50,  precio: 12.5,  emoji: '🌽', categoria: 'Granos' },
  { name: 'Cilantro',        kg: 10,  precio: 1.5,   emoji: '🌿', categoria: 'Verduras', nota: 'por manojo' },
  { name: 'Chile Poblano',   kg: 30,  precio: 32,    emoji: '🌶️', categoria: 'Verduras' },
  { name: 'Tomate Saladette',kg: 60,  precio: 18.5,  emoji: '🍅', categoria: 'Verduras' },
  { name: 'Aguacate Hass',   kg: 20,  precio: 45,    emoji: '🥑', categoria: 'Frutas' },
  { name: 'Frijol Negro',    kg: 25,  precio: 28,    emoji: '🫘', categoria: 'Granos' },
  { name: 'Papa',            kg: 80,  precio: 14,    emoji: '🥔', categoria: 'Verduras' },
  { name: 'Cebolla Blanca',  kg: 40,  precio: 16,    emoji: '🧅', categoria: 'Verduras' },
]

const TIPOS = ['Restaurante', 'Hotel', 'Tienda']

function optimizarPedido(presupuesto, tipo) {
  let pool = [...PRODUCTOS_BASE].sort((a, b) => {
    if (tipo === 'Restaurante') return a.precio - b.precio
    if (tipo === 'Hotel') return b.precio - a.precio
    return 0
  })

  let remaining = presupuesto
  const seleccion = []
  for (const p of pool) {
    const maxKg = Math.floor(remaining / p.precio)
    if (maxKg >= 10) {
      const kg = Math.min(maxKg, p.kg * 2)
      const subtotal = kg * p.precio
      seleccion.push({ ...p, kg, subtotal })
      remaining -= subtotal
      if (remaining < 200) break
    }
  }
  return seleccion
}

export default function CalculadoraPedido({ onClose }) {
  const [presupuesto, setPresupuesto] = useState(10000)
  const [tipo, setTipo] = useState('Restaurante')

  const opcion = optimizarPedido(presupuesto, tipo)
  const totalCorrecaminos = opcion.reduce((s, p) => s + p.subtotal, 0)
  const totalCoyotes = Math.round(totalCorrecaminos * 1.38)
  const ahorro = totalCoyotes - totalCorrecaminos

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-gradient-to-r from-teal-brand to-green-primary p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-cream text-xl">
                <ShoppingBag size={18} className="inline mr-2" />
                Pedido Óptimo
              </h3>
              <p className="font-body text-cream/65 text-sm mt-0.5">Maximiza tu presupuesto</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-cream transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1 scrollbar-thin">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Presupuesto (MXN)</label>
              <input type="number" min={1000} step={500} value={presupuesto}
                onChange={(e) => setPresupuesto(+e.target.value)}
                className="input-field" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Tipo de negocio</label>
              <select className="input-field" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Resultado */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-earth-dark text-sm">Combinación recomendada</h4>
            {opcion.map((p) => (
              <div key={p.name} className="flex items-center gap-3 bg-cream/50 rounded-xl p-3">
                <span className="text-xl">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-semibold text-earth-dark text-sm">{p.name}</div>
                  <div className="font-body text-earth-tan text-xs">{p.kg} kg · ${p.precio}/{p.nota || 'kg'}</div>
                </div>
                <div className="font-display font-bold text-earth-dark text-sm">
                  ${p.subtotal.toLocaleString('es-MX')}
                </div>
              </div>
            ))}
          </div>

          {/* Comparativa */}
          <div className="bg-green-primary/8 border border-green-primary/15 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between font-body text-sm">
              <span className="text-earth-tan">Total Correcaminos</span>
              <span className="font-semibold text-green-primary">${totalCorrecaminos.toLocaleString('es-MX')}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-earth-tan">Con coyotes (estimado)</span>
              <span className="font-semibold text-red-500">${totalCoyotes.toLocaleString('es-MX')}</span>
            </div>
            <div className="flex justify-between font-body font-semibold text-sm border-t border-green-primary/15 pt-2">
              <span className="text-green-primary flex items-center gap-1"><CheckCircle size={13} />Tu ahorro</span>
              <span className="text-green-primary">${ahorro.toLocaleString('es-MX')} MXN</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-cream-dark flex-shrink-0 flex gap-3">
          <button onClick={onClose} className="flex-1 btn-outline text-sm">Cancelar</button>
          <button className="flex-1 bg-orange-brand text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-orange-dark transition-colors shadow-orange active:scale-95">
            Agregar al pedido →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
