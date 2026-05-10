import useSimulationStore from '../store/useSimulationStore'

const speeds = [
  { key: 'normal', label: 'Normal', emoji: '🐢' },
  { key: 'fast',   label: 'Rápido', emoji: '⚡' },
  { key: 'paused', label: 'Pausado', emoji: '⏸️' },
]

export default function SimulationControls() {
  const { simulationSpeed, setSimulationSpeed } = useSimulationStore()

  return (
    <div className="flex items-center gap-0.5 bg-cream rounded-xl p-0.5 border border-cream-dark">
      {speeds.map(({ key, label, emoji }) => (
        <button
          key={key}
          onClick={() => setSimulationSpeed(key)}
          title={label}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-body text-xs font-medium transition-all duration-150 ${
            simulationSpeed === key
              ? 'bg-white shadow-sm text-earth-dark border border-cream-dark'
              : 'text-earth-tan hover:text-earth-dark'
          }`}
        >
          <span>{emoji}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
