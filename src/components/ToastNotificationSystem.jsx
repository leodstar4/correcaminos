import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import useSimulationStore from '../store/useSimulationStore'

const POOL = [
  { type: "pedido",   emoji: "🛒", title: "Nuevo pedido recibido",    desc: "La Milpa Rest. quiere 300 kg de Cilantro" },
  { type: "envio",    emoji: "📦", title: "Pedido en camino",         desc: "CC-2026-005 salió de Tepeaca, Puebla" },
  { type: "pago",     emoji: "✅", title: "Pago confirmado",          desc: "$4,200 MXN depositados en tu cuenta" },
  { type: "mensaje",  emoji: "💬", title: "Nuevo mensaje",            desc: "La Milpa Rest. te envió un mensaje" },
  { type: "precio",   emoji: "📈", title: "Precio en alza",           desc: "Cilantro +12% vs semana pasada en SNIIM" },
  { type: "entrega",  emoji: "🎉", title: "¡Pedido entregado!",       desc: "CC-2026-003 entregado exitosamente" },
  { type: "alerta",   emoji: "⚠️", title: "Pedido próximo a vencer",  desc: "CC-2026-004 necesita confirmación hoy" },
  { type: "cosecha",  emoji: "🌱", title: "Cosecha registrada",       desc: "Maíz Criollo publicado en el catálogo" },
]

function CustomToast({ t, notif }) {
  return (
    <div
      className={`flex items-start gap-3 bg-white border border-cream-dark rounded-2xl shadow-xl p-4 max-w-xs cursor-pointer hover:shadow-2xl transition-shadow ${
        t.visible ? 'animate-fade-up' : ''
      }`}
      onClick={() => toast.dismiss(t.id)}
      style={{ minWidth: 260 }}
    >
      <div className="text-2xl flex-shrink-0 mt-0.5">{notif.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="font-body font-semibold text-earth-dark text-sm leading-snug">{notif.title}</div>
        <div className="font-body text-earth-tan text-xs mt-0.5 leading-snug">{notif.desc}</div>
      </div>
    </div>
  )
}

export default function ToastNotificationSystem() {
  const simulationSpeed = useSimulationStore((s) => s.simulationSpeed)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (simulationSpeed === 'paused') return

    const delay = simulationSpeed === 'fast' ? 8000 : 30000

    const fire = () => {
      const notif = POOL[Math.floor(Math.random() * POOL.length)]
      toast.custom((t) => <CustomToast t={t} notif={notif} />, { duration: 5000 })
    }

    // Primer toast al montar (con delay corto para no saturar)
    const initial = setTimeout(fire, 4000)
    intervalRef.current = setInterval(fire, delay)

    return () => {
      clearTimeout(initial)
      clearInterval(intervalRef.current)
    }
  }, [simulationSpeed])

  return null
}
