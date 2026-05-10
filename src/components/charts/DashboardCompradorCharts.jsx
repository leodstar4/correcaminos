import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, Title, Tooltip, Legend, Filler, ArcElement,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import useSimulationStore from '../../store/useSimulationStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement)
ChartJS.defaults.font.family = "'Inter', sans-serif"
ChartJS.defaults.color = '#8A7560'

const GREEN  = '#2A6B4F'
const TEAL   = '#1A8A7B'
const ORANGE = '#E07B20'
const RED    = '#DC2626'

const tooltipDefaults = {
  backgroundColor: '#fff',
  titleColor: '#1C1C1C',
  bodyColor: '#8A7560',
  borderColor: '#E8E0D5',
  borderWidth: 1,
  padding: 10,
  cornerRadius: 10,
}

const MONTH_LABELS = ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May']

export function MonthlySpendingChart() {
  const buyerSpendingData = useSimulationStore((s) => s.buyerSpendingData)

  const data = {
    labels: MONTH_LABELS,
    datasets: [{
      label: 'Gasto mensual',
      data: buyerSpendingData,
      borderColor: GREEN,
      backgroundColor: GREEN + '22',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: GREEN,
      pointRadius: 4,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipDefaults,
        callbacks: { label: (ctx) => ` $${ctx.parsed.y.toLocaleString('es-MX')} MXN` },
      },
    },
    scales: {
      y: {
        grid: { color: '#E8E0D522' },
        ticks: { callback: (v) => `$${(v / 1000).toFixed(0)}k` },
      },
      x: { grid: { display: false } },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Gasto Mensual</h3>
          <p className="font-body text-earth-tan text-xs">Últimos 6 meses</p>
        </div>
        <span className="badge bg-green-primary/10 text-green-primary text-xs">
          ${(buyerSpendingData.reduce((a, b) => a + b, 0) / 1000).toFixed(0)}k total
        </span>
      </div>
      <div style={{ height: 200 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export function SavingsChart() {
  const buyerSpendingData = useSimulationStore((s) => s.buyerSpendingData)
  // "Con coyotes" sería 35% más caro
  const coyoteData = buyerSpendingData.map(v => Math.round(v * 1.38))
  const savings = buyerSpendingData.map((v, i) => coyoteData[i] - v)

  const data = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Con coyotes',
        data: coyoteData,
        backgroundColor: RED + 'BB',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Con Correcaminos',
        data: buyerSpendingData,
        backgroundColor: GREEN + 'CC',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
      tooltip: {
        ...tooltipDefaults,
        callbacks: {
          afterBody: (ctx) => {
            const i = ctx[0].dataIndex
            return [`Ahorro: $${savings[i].toLocaleString('es-MX')} MXN`]
          },
          label: (ctx) => ` $${ctx.parsed.y.toLocaleString('es-MX')} MXN`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: '#E8E0D522' },
        ticks: { callback: (v) => `$${(v / 1000).toFixed(0)}k` },
      },
      x: { grid: { display: false } },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Ahorro vs Coyotes</h3>
          <p className="font-body text-earth-tan text-xs">Comparativa mensual</p>
        </div>
        <span className="badge bg-green-primary/10 text-green-primary text-xs">
          Ahorro: ${savings.reduce((a, b) => a + b, 0).toLocaleString('es-MX')}
        </span>
      </div>
      <div style={{ height: 200 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export function PriceTrendsChart() {
  const labels = ['27 mar', '3 abr', '10 abr', '17 abr', '24 abr', '1 may', '8 may', '15 may']

  const datasets = [
    { label: 'Cilantro (manojo)', data: [18, 20, 19, 22, 21, 20, 23, 22], borderColor: GREEN,  fill: false, tension: 0.4, pointRadius: 3 },
    { label: 'Maíz Criollo',     data: [11, 12, 12, 13, 12.5, 12, 13, 13.5], borderColor: TEAL, fill: false, tension: 0.4, pointRadius: 3 },
    { label: 'Tomate',           data: [16, 18, 17, 19, 18, 17, 18.5, 19], borderColor: ORANGE, fill: false, tension: 0.4, pointRadius: 3 },
    { label: 'Chile Poblano',    data: [28, 30, 29, 32, 31, 30, 33, 32], borderColor: '#8A7560', fill: false, tension: 0.4, pointRadius: 3 },
  ]

  const data = { labels, datasets }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { boxWidth: 10, font: { size: 10 }, padding: 8 } },
      tooltip: {
        ...tooltipDefaults,
        callbacks: { label: (ctx) => ` ${ctx.dataset.label}: $${ctx.parsed.y}/kg` },
      },
    },
    scales: {
      y: {
        grid: { color: '#E8E0D522' },
        ticks: { callback: (v) => `$${v}` },
      },
      x: { grid: { display: false } },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Tendencia de Precios</h3>
          <p className="font-body text-earth-tan text-xs">$/kg · 8 semanas</p>
        </div>
      </div>
      <div style={{ height: 200 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export function CategoryBreakdownChart() {
  const data = {
    labels: ['Verduras', 'Granos', 'Frutas'],
    datasets: [{
      data: [58, 28, 14],
      backgroundColor: [GREEN + 'CC', ORANGE + 'CC', TEAL + 'CC'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 }, padding: 10 } },
      tooltip: {
        ...tooltipDefaults,
        callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
      },
    },
    cutout: '62%',
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="mb-4">
        <h3 className="font-display font-bold text-earth-dark text-sm">Categorías Compradas</h3>
        <p className="font-body text-earth-tan text-xs">Distribución por tipo</p>
      </div>
      <div style={{ height: 200 }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
