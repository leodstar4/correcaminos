import { useRef, useState } from 'react'
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

const GREEN   = '#2A6B4F'
const TEAL    = '#1A8A7B'
const ORANGE  = '#E07B20'
const CREAM   = '#F5F0E8'

const WEEK_LABELS = ['27 mar', '3 abr', '10 abr', '17 abr', '24 abr', '1 may', '8 may', '15 may']
const MONTH_LABELS = ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May']

const tooltipDefaults = {
  backgroundColor: '#fff',
  titleColor: '#1C1C1C',
  bodyColor: '#8A7560',
  borderColor: '#E8E0D5',
  borderWidth: 1,
  padding: 10,
  cornerRadius: 10,
}

export function WeeklyRevenueChart() {
  const weeklyRevenueData = useSimulationStore((s) => s.weeklyRevenueData)
  const meta = 9000

  const data = {
    labels: WEEK_LABELS,
    datasets: [
      {
        label: 'Ingreso real',
        data: weeklyRevenueData,
        backgroundColor: GREEN + 'CC',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Meta',
        data: Array(8).fill(meta),
        backgroundColor: ORANGE + '33',
        borderRadius: 8,
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
          <h3 className="font-display font-bold text-earth-dark text-sm">Ingresos Semanales</h3>
          <p className="font-body text-earth-tan text-xs">vs meta $9,000/sem</p>
        </div>
        <span className="badge bg-green-primary/10 text-green-primary text-xs">Últimas 8 semanas</span>
      </div>
      <div style={{ height: 200 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export function MonthlyVolumeChart() {
  const monthlyVolumeData = useSimulationStore((s) => s.monthlyVolumeData)
  const metaLine = Array(6).fill(12)

  const data = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Volumen real (ton)',
        data: monthlyVolumeData,
        borderColor: GREEN,
        backgroundColor: GREEN + '22',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: GREEN,
        pointRadius: 4,
      },
      {
        label: 'Meta 2026 (12 ton)',
        data: metaLine,
        borderColor: ORANGE,
        borderDash: [6, 4],
        backgroundColor: 'transparent',
        pointRadius: 0,
        tension: 0,
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
        callbacks: { label: (ctx) => ` ${ctx.parsed.y.toFixed(1)} ton` },
      },
    },
    scales: {
      y: {
        grid: { color: '#E8E0D522' },
        ticks: { callback: (v) => `${v} t` },
        min: 6,
        max: 14,
      },
      x: { grid: { display: false } },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Volumen Mensual</h3>
          <p className="font-body text-earth-tan text-xs">Toneladas movilizadas</p>
        </div>
        <span className="badge bg-teal-brand/10 text-teal-brand text-xs">Meta: 12 ton</span>
      </div>
      <div style={{ height: 200 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export function HarvestProjectionChart() {
  const [proyeccion, setProyeccion] = useState([8, 9, 11, 10, 12, 13, 12, 14])
  const real = [7.8, 9.2, 10.5, 9.8, 11.3, 12.1, null, null]

  const data = {
    labels: ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Real/Estimado',
        data: real,
        borderColor: GREEN,
        backgroundColor: GREEN + '22',
        fill: false,
        tension: 0.4,
        pointBackgroundColor: GREEN,
        pointRadius: 4,
      },
      {
        label: 'Proyección',
        data: proyeccion,
        borderColor: TEAL,
        borderDash: [6, 4],
        backgroundColor: 'transparent',
        tension: 0.4,
        pointBackgroundColor: TEAL,
        pointRadius: 3,
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
        callbacks: { label: (ctx) => ` ${ctx.parsed.y?.toFixed(1) || '—'} ton` },
      },
    },
    scales: {
      y: { grid: { color: '#E8E0D522' }, ticks: { callback: (v) => `${v}t` } },
      x: { grid: { display: false } },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Proyección de Cosecha</h3>
          <p className="font-body text-earth-tan text-xs">Real vs estimado (ton)</p>
        </div>
      </div>
      <div style={{ height: 180 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export function SalesDistributionChart() {
  const data = {
    labels: ['Cilantro', 'Maíz Criollo', 'Chile Poblano', 'Tomate', 'Frijol', 'Otros'],
    datasets: [{
      data: [22, 35, 18, 12, 8, 5],
      backgroundColor: [GREEN, TEAL, ORANGE, '#E8B84B', '#8A7560', '#C4B5A5'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 10, font: { size: 10 }, padding: 8 } },
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
        <h3 className="font-display font-bold text-earth-dark text-sm">Distribución de Ventas</h3>
        <p className="font-body text-earth-tan text-xs">Por producto</p>
      </div>
      <div style={{ height: 200 }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
