import { useState, useEffect, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Truck, MapPin, Clock, Pause, Play } from 'lucide-react'
import useSimulationStore, { COORDINATES } from '../store/useSimulationStore'

// Fix default Leaflet icon URLs for Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const makeIcon = (emoji, size = 28) => L.divIcon({
  html: `<span style="font-size:${size}px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))">${emoji}</span>`,
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size / 2],
})

const ORIGIN_ICON = makeIcon('🌿', 28)
const DEST_ICON   = makeIcon('🏢', 28)
const TRUCK_ICON  = makeIcon('🚚', 32)

function getPositionOnRoute(coords, progress) {
  if (!coords || coords.length < 2) return null
  const total = coords.length - 1
  const pos = progress * total
  const seg = Math.min(Math.floor(pos), total - 1)
  const t = pos - seg
  const [lng1, lat1] = coords[seg]
  const [lng2, lat2] = coords[seg + 1]
  return [lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t]
}

function MapRecenterer({ center }) {
  const map = useMap()
  useEffect(() => { if (center) map.flyTo(center, 9, { duration: 1.2 }) }, [center, map])
  return null
}

function RouteLayer({ order, progress }) {
  const [routeCoords, setRouteCoords] = useState(null)
  const [straight, setStraight] = useState(false)
  const origin = COORDINATES[order.originId]
  const dest   = COORDINATES[order.destId]

  useEffect(() => {
    if (!origin || !dest) return
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`
    fetch(url, { signal: AbortSignal.timeout(8000) })
      .then(r => r.json())
      .then(data => {
        const coords = data.routes?.[0]?.geometry?.coordinates
        if (coords?.length > 1) { setRouteCoords(coords); setStraight(false) }
        else throw new Error('no route')
      })
      .catch(() => {
        setRouteCoords([[origin.lng, origin.lat], [dest.lng, dest.lat]])
        setStraight(true)
      })
  }, [order.originId, order.destId])

  if (!origin || !dest) return null

  const truckPos = routeCoords && order.status === 'En tránsito'
    ? getPositionOnRoute(routeCoords, progress)
    : null

  const polyPoints = routeCoords
    ? routeCoords.map(([lng, lat]) => [lat, lng])
    : [[origin.lat, origin.lng], [dest.lat, dest.lng]]

  return (
    <>
      <Marker position={[origin.lat, origin.lng]} icon={ORIGIN_ICON}>
        <Popup><strong>{origin.name}</strong><br />Origen · {order.product}</Popup>
      </Marker>
      <Marker position={[dest.lat, dest.lng]} icon={DEST_ICON}>
        <Popup><strong>{dest.name}</strong><br />Destino · {order.buyer}</Popup>
      </Marker>

      <Polyline positions={polyPoints}
        color="#2A6B4F" weight={4} opacity={0.8}
        dashArray={straight ? '8 6' : undefined}
      />

      {truckPos && (
        <Marker position={truckPos} icon={TRUCK_ICON} zIndexOffset={1000}>
          <Popup>
            <strong>🚚 {order.id}</strong><br />
            {order.product} · {order.qty}<br />
            Progreso: {Math.round(progress * 100)}%
          </Popup>
        </Marker>
      )}
    </>
  )
}

export default function OrderTrackerMap() {
  const { activeOrders, gpsPositions, simulationSpeed, updateGpsProgress } = useSimulationStore()
  const [selectedId, setSelectedId] = useState(activeOrders[0]?.id || null)
  const [localPaused, setLocalPaused] = useState(false)
  const intervalRef = useRef(null)

  const inTransit = activeOrders.filter(o => o.status === 'En tránsito')

  const selectedOrder = activeOrders.find(o => o.id === selectedId)
  const selectedOrigin = selectedOrder ? COORDINATES[selectedOrder.originId] : null
  const mapCenter = selectedOrigin
    ? [selectedOrigin.lat, selectedOrigin.lng]
    : [19.04, -98.2]

  // Animate truck progress
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (simulationSpeed === 'paused' || localPaused) return

    const tick = simulationSpeed === 'fast' ? 500 : 2000
    const step = simulationSpeed === 'fast' ? 0.008 : 0.003

    intervalRef.current = setInterval(() => {
      inTransit.forEach(o => {
        const current = gpsPositions[o.id]?.progress ?? 0
        if (current < 1) updateGpsProgress(o.id, current + step)
      })
    }, tick)

    return () => clearInterval(intervalRef.current)
  }, [simulationSpeed, localPaused, inTransit.length])

  const distanciaRestante = useCallback((orderId) => {
    const progress = gpsPositions[orderId]?.progress ?? 0
    return `${Math.round((1 - progress) * 100)}% restante`
  }, [gpsPositions])

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Panel lateral */}
      <div className="w-full lg:w-72 flex-shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-earth-dark text-sm">Pedidos en ruta</h3>
          <button
            onClick={() => setLocalPaused(v => !v)}
            className="flex items-center gap-1.5 font-body text-xs font-semibold text-earth-tan hover:text-earth-dark transition-colors"
          >
            {localPaused ? <><Play size={12} />Reanudar</> : <><Pause size={12} />Pausar</>}
          </button>
        </div>

        <div className="space-y-2">
          {activeOrders.map(order => {
            const origin = COORDINATES[order.originId]
            const dest   = COORDINATES[order.destId]
            const progress = gpsPositions[order.id]?.progress ?? 0
            const isSelected = order.id === selectedId

            return (
              <button key={order.id} onClick={() => setSelectedId(order.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-green-primary/40 bg-green-primary/6 shadow-card'
                    : 'border-cream-dark bg-white hover:border-green-primary/20'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">{order.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-bold text-earth-dark text-xs">{order.id}</div>
                    <div className="font-body text-earth-tan text-xs truncate">{order.product} · {order.qty}</div>
                  </div>
                  <span className={`badge text-xs flex-shrink-0 ${
                    order.status === 'En tránsito' ? 'bg-teal-brand/10 text-teal-brand'
                    : 'bg-orange-brand/10 text-orange-brand'
                  }`}>{order.status}</span>
                </div>

                {order.status === 'En tránsito' && (
                  <>
                    <div className="h-1.5 bg-cream rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full bg-green-primary rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(progress * 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 font-body text-earth-tan text-xs">
                        <MapPin size={9} />
                        {origin?.name?.split(' ').slice(-1)[0]}
                      </div>
                      <span className="font-body text-earth-tan text-xs">{distanciaRestante(order.id)}</span>
                      <div className="flex items-center gap-1 font-body text-earth-tan text-xs">
                        <Truck size={9} />
                        {dest?.name?.split(' -')[0]}
                      </div>
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Leyenda */}
        <div className="bg-white rounded-xl border border-cream-dark p-3 space-y-1.5">
          {[
            { emoji: '🌿', label: 'Origen (productor)' },
            { emoji: '🏢', label: 'Destino (comprador)' },
            { emoji: '🚚', label: 'Camión en ruta' },
          ].map(({ emoji, label }) => (
            <div key={label} className="flex items-center gap-2 font-body text-earth-tan text-xs">
              <span>{emoji}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-cream-dark shadow-card" style={{ minHeight: 400 }}>
        <MapContainer
          center={[19.04, -98.2]}
          zoom={8}
          style={{ width: '100%', height: '100%', minHeight: 400 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapRecenterer center={mapCenter ? [mapCenter[0], mapCenter[1]] : null} />

          {activeOrders.map(order => (
            <RouteLayer
              key={order.id}
              order={order}
              progress={gpsPositions[order.id]?.progress ?? 0}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
