import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const COORDINATES = {
  "don-aurelio":         { name: "Don Aurelio Méndez",              lat: 19.0359, lng: -98.0458 },
  "fam-hernandez":       { name: "Fam. Hernández",                  lat: 19.1620, lng: -98.1489 },
  "rancho-esperanza":    { name: "Rancho La Esperanza",             lat: 19.0584, lng: -98.3010 },
  "cooperativa-cuenca":  { name: "Cooperativa Cuenca Norte",        lat: 19.4430, lng: -97.8920 },
  "ejido-san-jose":      { name: "Ejido San José",                  lat: 19.2200, lng: -97.8500 },
  "productores-valle":   { name: "Productores del Valle",           lat: 18.9100, lng: -98.4500 },
  "cooperativa-el-seco": { name: "Cooperativa El Seco",             lat: 19.2300, lng: -97.6500 },
  "cdmx-juarez":         { name: "La Milpa Rest. - Col. Juárez",    lat: 19.4295, lng: -99.1745 },
  "cdmx-angelopolis":    { name: "Hotel Boutique MX - Angelópolis", lat: 19.0469, lng: -99.2085 },
  "cdmx-puebla":         { name: "Superama Puebla Norte",           lat: 19.0500, lng: -98.2800 },
}

const INITIAL_ORDERS = [
  { id: "CC-2026-005", product: "Maíz Criollo",      qty: "200 kg", total: 2500, buyer: "Hotel Boutique MX", date: "5 may 2026", status: "En tránsito",         emoji: "🌽", originId: "don-aurelio",     destId: "cdmx-angelopolis" },
  { id: "CC-2026-004", product: "Chile Poblano",      qty: "50 kg",  total: 1600, buyer: "La Milpa Rest.",    date: "6 may 2026", status: "Preparando envío",    emoji: "🌶️", originId: "rancho-esperanza", destId: "cdmx-juarez" },
  { id: "CC-2026-003", product: "Tomate Saladette",   qty: "200 kg", total: 3700, buyer: "La Milpa Rest.",    date: "6 may 2026", status: "En tránsito",         emoji: "🍅", originId: "fam-hernandez",   destId: "cdmx-juarez" },
]

const INITIAL_CONVERSATIONS = {
  'don-aurelio': {
    buyerName: "La Milpa Rest.",
    producerName: "Don Aurelio Méndez",
    messages: [
      { from: "comprador", text: "¡Hola Don Aurelio! ¿Tiene disponible maíz criollo para la próxima semana?", time: "10:30", read: true },
      { from: "productor", text: "¡Buenos días! Sí, tenemos 2,000 kg listos. ¿Cuánto necesitan?", time: "10:35", read: true },
      { from: "comprador", text: "Necesitamos 500 kg. ¿A qué precio manejan hoy?", time: "10:37", read: true },
      { from: "productor", text: "Para ustedes $12.50/kg, mejor que el SNIIM. Incluye flete hasta CDMX.", time: "10:42", read: false },
    ]
  },
  'fam-hernandez': {
    buyerName: "La Milpa Rest.",
    producerName: "Fam. Hernández",
    messages: [
      { from: "comprador", text: "Buenas tardes, ¿tienen tomate saladette disponible?", time: "09:15", read: true },
      { from: "productor", text: "Sí, tenemos producción fresca de hoy. ¿Cuántos kilos necesitan?", time: "09:20", read: true },
    ]
  },
  'rancho-esperanza': {
    buyerName: "La Milpa Rest.",
    producerName: "Rancho La Esperanza",
    messages: [
      { from: "productor", text: "Buenos días, tenemos aguacate Hass de primera calidad. ¿Les interesa?", time: "08:00", read: false },
    ]
  },
}

function makeWeeklyRevenue() {
  const bases = [7200, 7800, 8100, 7500, 8400, 9100, 8700, 9300]
  return bases.map(b => b + Math.round((Math.random() - 0.5) * 600))
}

const useSimulationStore = create(
  persist(
    (set) => ({
      simulationSpeed: 'normal',

      activeOrders: INITIAL_ORDERS,
      gpsPositions: {
        'CC-2026-005': { progress: 0.28 },
        'CC-2026-003': { progress: 0.12 },
      },

      conversations: INITIAL_CONVERSATIONS,

      weeklyRevenueData: makeWeeklyRevenue(),
      monthlyVolumeData: [8.2, 9.1, 10.5, 9.8, 11.3, 12.1],
      buyerSpendingData: [18500, 22000, 19800, 25400, 23100, 28600],
      cumulativeSavings: 15800,

      setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),

      updateGpsProgress: (orderId, progress) =>
        set((state) => ({
          gpsPositions: {
            ...state.gpsPositions,
            [orderId]: { progress: Math.min(1, progress) },
          },
        })),

      sendMessage: (productorId, text, from) =>
        set((state) => {
          const conv = state.conversations[productorId] || { buyerName: "Comprador", producerName: "Productor", messages: [] }
          const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
          return {
            conversations: {
              ...state.conversations,
              [productorId]: {
                ...conv,
                messages: [...conv.messages, { from, text, time, read: from === 'comprador' }],
              },
            },
          }
        }),

      markRead: (productorId) =>
        set((state) => {
          const conv = state.conversations[productorId]
          if (!conv) return {}
          return {
            conversations: {
              ...state.conversations,
              [productorId]: { ...conv, messages: conv.messages.map(m => ({ ...m, read: true })) },
            },
          }
        }),
    }),
    {
      name: 'correcaminos-sim',
      partialize: (state) => ({
        simulationSpeed: state.simulationSpeed,
        conversations: state.conversations,
        cumulativeSavings: state.cumulativeSavings,
      }),
    }
  )
)

export default useSimulationStore
