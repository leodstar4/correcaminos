import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, X, ChevronDown } from 'lucide-react'
import useSimulationStore from '../store/useSimulationStore'

const QUICK_REPLIES = [
  '¿Tienes disponible producto?',
  '¿Precio por bulk (>500 kg)?',
  '¿Cuándo puedes tener listo el pedido?',
  '¿Aceptan pago contra entrega?',
]

const PRODUCTOR_NAMES = {
  'don-aurelio':     'Don Aurelio Méndez',
  'fam-hernandez':   'Fam. Hernández',
  'rancho-esperanza':'Rancho La Esperanza',
}

function ConversationList({ conversations, selectedId, onSelect }) {
  return (
    <div className="divide-y divide-cream-dark">
      {Object.entries(conversations).map(([id, conv]) => {
        const lastMsg = conv.messages[conv.messages.length - 1]
        const unread = conv.messages.filter(m => !m.read && m.from === 'productor').length
        return (
          <button key={id} onClick={() => onSelect(id)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-cream/60 transition-colors ${
              selectedId === id ? 'bg-green-primary/6' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-primary to-teal-brand flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
              {PRODUCTOR_NAMES[id]?.charAt(0) || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-body font-semibold text-earth-dark text-xs truncate">{PRODUCTOR_NAMES[id]}</span>
                {unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-brand flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold" style={{ fontSize: 9 }}>{unread}</span>
                  </span>
                )}
              </div>
              <p className="font-body text-earth-tan text-xs truncate">{lastMsg?.text}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function ChatWindow({ productorId, conversation, onSend, role }) {
  const [text, setText] = useState('')
  const [showQuick, setShowQuick] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages?.length])

  const handleSend = (msg) => {
    const m = msg || text.trim()
    if (!m) return
    onSend(productorId, m, role)
    setText('')
    setShowQuick(false)
  }

  if (!conversation) return (
    <div className="flex-1 flex items-center justify-center text-center p-8">
      <div>
        <div className="text-4xl mb-3">💬</div>
        <p className="font-body text-earth-tan text-sm">Selecciona una conversación</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-cream-dark bg-cream/40 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-primary to-teal-brand flex items-center justify-center text-white font-display font-bold text-sm">
          {PRODUCTOR_NAMES[productorId]?.charAt(0)}
        </div>
        <div>
          <div className="font-body font-semibold text-earth-dark text-sm">{PRODUCTOR_NAMES[productorId]}</div>
          <div className="font-body text-earth-tan text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
            En línea
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {conversation.messages.map((msg, i) => {
          const isMe = (role === 'comprador' && msg.from === 'comprador') || (role === 'productor' && msg.from === 'productor')
          return (
            <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${
                isMe
                  ? 'bg-green-primary text-cream rounded-br-md'
                  : 'bg-cream border border-cream-dark text-earth-dark rounded-bl-md'
              }`}>
                <p className="font-body text-sm leading-snug">{msg.text}</p>
                <p className={`font-body text-xs mt-1 ${isMe ? 'text-cream/60' : 'text-earth-tan/70'}`}>{msg.time}</p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      <AnimatePresence>
        {showQuick && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-cream-dark flex-shrink-0"
          >
            <div className="p-2 flex flex-wrap gap-2">
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => handleSend(q)}
                  className="font-body text-xs text-teal-brand border border-teal-brand/30 bg-teal-brand/6 hover:bg-teal-brand/15 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="p-3 border-t border-cream-dark flex items-center gap-2 flex-shrink-0">
        <button onClick={() => setShowQuick(v => !v)}
          className="p-2 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors flex-shrink-0"
          title="Respuestas rápidas"
        >
          <ChevronDown size={15} className={`transition-transform ${showQuick ? 'rotate-180' : ''}`} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-cream rounded-xl px-3 py-2 font-body text-sm text-earth-dark focus:outline-none focus:ring-2 focus:ring-teal-brand placeholder:text-earth-tan/60 border border-cream-dark"
        />
        <button onClick={() => handleSend()}
          disabled={!text.trim()}
          className="w-8 h-8 rounded-xl bg-green-primary hover:bg-green-dark disabled:opacity-40 flex items-center justify-center text-white transition-colors flex-shrink-0"
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  )
}

export default function ChatPanel({ role = 'comprador', defaultProductorId }) {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(defaultProductorId || null)
  const { conversations, sendMessage, markRead } = useSimulationStore()

  const unreadTotal = Object.values(conversations).reduce((sum, conv) =>
    sum + conv.messages.filter(m => !m.read && m.from === 'productor').length, 0)

  const handleSelect = (id) => {
    setSelectedId(id)
    markRead(id)
  }

  const handleSend = (productorId, text, from) => {
    sendMessage(productorId, text, from)
    // Simular respuesta automática del productor
    if (from === 'comprador') {
      setTimeout(() => {
        const replies = [
          '¡Claro! Con gusto les ayudamos.',
          'Permítame verificar disponibilidad y le confirmo.',
          'Sí, tenemos producto disponible. ¿Cuándo lo necesitan?',
          'Gracias por su interés, le respondo en breve.',
        ]
        const reply = replies[Math.floor(Math.random() * replies.length)]
        sendMessage(productorId, reply, 'productor')
      }, 1500 + Math.random() * 1500)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-primary hover:bg-green-dark shadow-xl flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1"
      >
        <MessageCircle size={22} />
        {unreadTotal > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-brand border-2 border-white flex items-center justify-center">
            <span className="text-white font-bold" style={{ fontSize: 9 }}>{unreadTotal}</span>
          </span>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-cream-dark flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-primary to-teal-brand flex-shrink-0">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-cream" />
                <h4 className="font-display font-bold text-cream text-sm">Mensajes</h4>
                {unreadTotal > 0 && (
                  <span className="badge bg-orange-brand text-white text-xs">{unreadTotal}</span>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-cream transition-colors">
                <X size={12} />
              </button>
            </div>

            {selectedId ? (
              <>
                <button onClick={() => setSelectedId(null)}
                  className="flex items-center gap-1.5 px-4 py-2 font-body text-xs text-earth-tan hover:text-earth-dark transition-colors border-b border-cream-dark flex-shrink-0"
                >
                  ← Todas las conversaciones
                </button>
                <ChatWindow
                  productorId={selectedId}
                  conversation={conversations[selectedId]}
                  onSend={handleSend}
                  role={role}
                />
              </>
            ) : (
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                <ConversationList
                  conversations={conversations}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
