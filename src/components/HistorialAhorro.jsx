import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Filter } from 'lucide-react'

const HISTORIAL = [
  { fecha: '6 may 2026', pedido: 'CC-2026-003', productos: 'Tomate 200 kg',           productor: 'Fam. Hernández', total: 3700,  coyote: 5106,  ahorro: 1406 },
  { fecha: '5 may 2026', pedido: 'CC-2026-002', productos: 'Aguacate 100 kg',          productor: 'Rancho La Esp.', total: 4500,  coyote: 6210,  ahorro: 1710 },
  { fecha: '28 abr 2026',pedido: 'CC-2026-001', productos: 'Maíz 500kg + Chile 50kg',  productor: 'Don Aurelio',    total: 7850,  coyote: 10833, ahorro: 2983 },
  { fecha: '15 abr 2026',pedido: 'CC-2026-000', productos: 'Frijol Negro 300 kg',      productor: 'Ejido San José', total: 8400,  coyote: 11592, ahorro: 3192 },
  { fecha: '3 abr 2026', pedido: 'CC-2025-099', productos: 'Cebolla 400 kg',           productor: 'Coop. El Seco',  total: 6400,  coyote: 8832,  ahorro: 2432 },
]

const MESES = ['Todos', 'May', 'Abr', 'Mar']

function exportCSV(rows) {
  const header = 'Fecha,Pedido,Productos,Productor,Total,Con coyotes,Ahorro\n'
  const body = rows.map(r =>
    `${r.fecha},${r.pedido},"${r.productos}",${r.productor},$${r.total},$${r.coyote},$${r.ahorro}`
  ).join('\n')
  const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'historial-ahorro.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function HistorialAhorro() {
  const [mesFiltro, setMesFiltro] = useState('Todos')

  const filtered = mesFiltro === 'Todos'
    ? HISTORIAL
    : HISTORIAL.filter(r => r.fecha.includes(mesFiltro.toLowerCase()))

  const totalAhorro = filtered.reduce((s, r) => s + r.ahorro, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-earth-tan" />
          <div className="flex items-center gap-1 bg-white rounded-xl px-1 py-1 border border-cream-dark">
            {MESES.map(m => (
              <button key={m} onClick={() => setMesFiltro(m)}
                className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${mesFiltro === m ? 'bg-green-primary text-white' : 'text-earth-tan hover:bg-cream'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => exportCSV(filtered)}
          className="flex items-center gap-1.5 font-body text-sm font-semibold text-teal-brand hover:text-green-primary transition-colors"
        >
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-cream-dark">
              {['Fecha', 'Pedido', 'Productos', 'Productor', 'Total', 'Con coyotes', 'Ahorraste'].map(h => (
                <th key={h} className="font-body text-xs font-semibold text-earth-tan uppercase tracking-wider pb-2 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {filtered.map((row, i) => (
              <motion.tr key={row.pedido} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }} className="hover:bg-cream/40 transition-colors"
              >
                <td className="py-3 pr-4 font-body text-earth-tan text-xs whitespace-nowrap">{row.fecha}</td>
                <td className="py-3 pr-4 font-body font-semibold text-earth-dark text-xs">{row.pedido}</td>
                <td className="py-3 pr-4 font-body text-earth-dark text-xs max-w-[140px] truncate">{row.productos}</td>
                <td className="py-3 pr-4 font-body text-earth-tan text-xs whitespace-nowrap">{row.productor}</td>
                <td className="py-3 pr-4 font-body font-semibold text-earth-dark text-xs">${row.total.toLocaleString('es-MX')}</td>
                <td className="py-3 pr-4 font-body text-red-400 text-xs">${row.coyote.toLocaleString('es-MX')}</td>
                <td className="py-3 font-display font-bold text-green-primary text-sm">+${row.ahorro.toLocaleString('es-MX')}</td>
              </motion.tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-green-primary/20">
              <td colSpan={6} className="pt-3 font-body font-semibold text-earth-dark text-sm">Total ahorrado</td>
              <td className="pt-3 font-display font-bold text-green-primary text-base">${totalAhorro.toLocaleString('es-MX')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
