import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, Heart, FileText, LifeBuoy,
  Menu, Bell, LogOut, Star, ChevronDown, ChevronUp,
  Plus, Minus, X, ShoppingCart, MapPin, ChevronRight,
  Truck, Package, CheckCircle, ArrowLeftRight, DollarSign, Users,
  Download, Mail, MessageCircle, Phone, Trash2, Clock, Building
} from "lucide-react";
import { products, productorProfiles } from "../data/mockProducts";
import PreciosSNIIM from "../components/PreciosSNIIM";

const navItems = [
  { key: "explorar",    label: "Explorar Productos", icon: Search },
  { key: "productores", label: "Productores",         icon: Users },
  { key: "precios",     label: "Precios SNIIM",       icon: DollarSign },
  { key: "pedidos",     label: "Mis Pedidos",         icon: ShoppingBag },
  { key: "favoritos",   label: "Favoritos",           icon: Heart },
  { key: "facturacion", label: "Facturación",         icon: FileText },
  { key: "soporte",     label: "Soporte",             icon: LifeBuoy },
];

const categories = ["Todas", "Verduras", "Granos", "Frutas"];
const states = ["Todo México", "Puebla", "Oaxaca", "Michoacán", "Chiapas", "Veracruz"];

const categoryColors = {
  Verduras: { bg: "bg-green-primary/10", text: "text-green-primary" },
  Granos:   { bg: "bg-orange-brand/10",  text: "text-orange-brand" },
  Frutas:   { bg: "bg-teal-brand/10",    text: "text-teal-brand" },
};
const emojiMap = { Verduras: "🥬", Granos: "🌽", Frutas: "🍋" };

// ── Mock data ─────────────────────────────────────────────────────────────
const mockNotificaciones = [
  { id: 1, emoji: "📦", title: "Pedido en camino",            desc: "Tu Aguacate Hass sale hoy de Cholula",          time: "hace 10 min", unread: true  },
  { id: 2, emoji: "🌽", title: "Nueva cosecha disponible",    desc: "Don Aurelio publicó 3,200 kg de Maíz Criollo",  time: "hace 1 h",    unread: true  },
  { id: 3, emoji: "✅", title: "Pedido CC-2026-001 entregado",desc: "Recibido con éxito en Col. Juárez, CDMX",       time: "hace 2 días", unread: false },
];

const mockPedidos = [
  { id: "CC-2026-003", date: "6 may 2026",  items: "Tomate Saladette · 200 kg",               producer: "Fam. Hernández García", total: 3700,  status: "Confirmado",  emoji: "🍅" },
  { id: "CC-2026-002", date: "5 may 2026",  items: "Aguacate Hass · 100 kg",                   producer: "Rancho La Esperanza",   total: 4500,  status: "En tránsito", emoji: "🥑" },
  { id: "CC-2026-001", date: "28 abr 2026", items: "Maíz Criollo 500 kg + Chile Poblano 50 kg",producer: "Don Aurelio Méndez",    total: 7850,  status: "Entregado",   emoji: "🌽" },
];
const pedidoStatusCfg = {
  "Confirmado":  { bg: "bg-teal-brand/10",    text: "text-teal-brand",    icon: CheckCircle },
  "En tránsito": { bg: "bg-orange-brand/10",  text: "text-orange-brand",  icon: Truck       },
  "Entregado":   { bg: "bg-green-primary/10", text: "text-green-primary", icon: CheckCircle },
};

const mockFavoritos = [
  { type: "producer", id: "don-aurelio",      name: "Don Aurelio Méndez",  sub: "Maíz criollo · Tepeaca, Puebla",   rating: 4.9, color: "#2A6B4F", initials: "AM" },
  { type: "producer", id: "rancho-esperanza", name: "Rancho La Esperanza", sub: "Aguacate Hass · Cholula, Puebla",  rating: 5.0, color: "#3A7D44", initials: "RE" },
  { type: "product",  id: 1, name: "Maíz Criollo",  sub: "Don Aurelio Méndez · $12.50/kg",   emoji: "🌽", color: "#E8B84B" },
  { type: "product",  id: 6, name: "Aguacate Hass", sub: "Rancho La Esperanza · $45.00/kg",  emoji: "🥑", color: "#3A7D44" },
];

const mockFacturas = [
  { id: "CFDI-2026-003", pedido: "CC-2026-003", date: "6 may 2026",  concepto: "Tomate Saladette 200 kg",       total: 3700 },
  { id: "CFDI-2026-002", pedido: "CC-2026-002", date: "5 may 2026",  concepto: "Aguacate Hass 100 kg",          total: 4500 },
  { id: "CFDI-2026-001", pedido: "CC-2026-001", date: "28 abr 2026", concepto: "Maíz Criollo + Chile Poblano",  total: 7850 },
];

const faqComprador = [
  { q: "¿Cómo realizo un pedido?",                      a: "Explora el catálogo, agrega productos al carrito y confírmalo. Recibirás confirmación del productor en menos de 2 horas." },
  { q: "¿Cuáles son los tiempos de entrega?",           a: "Garantizamos entrega en 24 horas con cadena de frío para Puebla y CDMX. Para otras regiones, 48 horas hábiles." },
  { q: "¿Puedo cancelar un pedido?",                    a: "Puedes cancelar dentro de las primeras 4 horas de confirmado. Después contacta a soporte para gestionar la cancelación." },
  { q: "¿Cómo descargo mi factura?",                    a: "En la sección Facturación encontrarás todas tus facturas. Haz clic en 'Descargar' para obtener el PDF y el XML." },
  { q: "¿Qué pasa si el producto llega en mal estado?", a: "Contamos con garantía de calidad. Repórtalo en las primeras 12 horas y hacemos reposición o devolución sin costo." },
];

// ── Sub-components ────────────────────────────────────────────────────────

function ProductCard({ product, onAddToCart, cartCount }) {
  const navigate = useNavigate();
  const c = categoryColors[product.category] || categoryColors.Verduras;
  const emoji = emojiMap[product.category] || "🌿";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="product-card"
    >
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.color + "20" }}
      >
        <div className="text-6xl select-none" style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.12))" }}>
          {emoji}
        </div>
        <div className="absolute top-3 left-3 bg-white/95 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary"/>
          <span className="font-body text-green-primary text-xs font-medium">{product.freshnessBadge}</span>
        </div>
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-orange-brand flex items-center justify-center shadow-orange"
          >
            <span className="font-body font-bold text-white text-xs">{cartCount}</span>
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <div className={`badge ${c.bg} ${c.text} mb-2 text-xs`}>{product.category}</div>
        <h3 className="font-body font-semibold text-earth-dark text-sm leading-snug mb-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-earth-tan flex-shrink-0"/>
          <span className="font-body text-earth-tan text-xs">{product.origin}</span>
        </div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="font-display font-bold text-earth-dark text-lg">${product.pricePerKg.toFixed(2)}</span>
            <span className="font-body text-earth-tan text-xs ml-1">/{product.unit}</span>
          </div>
          <div className="font-body text-earth-tan text-xs">{product.available.toLocaleString("es-MX")} {product.unit} disp.</div>
        </div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cream-dark">
          <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {product.producer.charAt(0)}
          </div>
          <button
            onClick={() => navigate(`/productor-profile/${product.producerId}`)}
            className="font-body text-earth-tan text-xs truncate flex-1 text-left hover:text-green-primary transition-colors underline underline-offset-2 decoration-transparent hover:decoration-green-primary/40"
          >
            {product.producer}
          </button>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={11} className="fill-orange-brand text-orange-brand"/>
            <span className="font-body text-earth-dark text-xs font-medium">{product.producerRating}</span>
          </div>
        </div>
        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full flex items-center justify-center gap-2 bg-green-primary text-white font-body font-semibold text-sm py-2.5 rounded-xl hover:bg-green-dark transition-all duration-200 hover:-translate-y-0.5 shadow-card active:scale-95"
        >
          <Plus size={14}/>
          Agregar al pedido
        </button>
      </div>
    </motion.div>
  );
}

function CartDrawer({ cart, products, onClose, onUpdateQty }) {
  const cartItems = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...products.find(p => p.id === parseInt(id)), qty }));
  const total = cartItems.reduce((sum, item) => sum + item.pricePerKg * item.qty * 50, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-5 border-b border-cream-dark">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-green-primary"/>
            <h3 className="font-display font-bold text-earth-dark text-lg">Mi Pedido</h3>
            <span className="badge bg-orange-brand/10 text-orange-brand">{cartItems.length}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors">
            <X size={17}/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-4xl mb-3">🛒</div>
              <p className="font-body text-earth-tan text-sm font-medium">Tu pedido está vacío</p>
              <p className="font-body text-earth-tan/70 text-xs mt-1">Agrega productos desde el catálogo</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-cream/60 rounded-2xl p-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: item.color + "20" }}>
                  {emojiMap[item.category] || "🌿"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-semibold text-earth-dark text-sm truncate">{item.name}</div>
                  <div className="font-body text-earth-tan text-xs">${item.pricePerKg}/{item.unit}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-cream-dark hover:bg-cream-darker flex items-center justify-center text-earth-dark transition-colors">
                    <Minus size={12}/>
                  </button>
                  <span className="font-body font-bold text-earth-dark text-sm w-5 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-green-primary/10 hover:bg-green-primary/20 flex items-center justify-center text-green-primary transition-colors">
                    <Plus size={12}/>
                  </button>
                </div>
                <div className="font-body font-semibold text-green-primary text-sm w-16 text-right">
                  ${(item.pricePerKg * item.qty * 50).toLocaleString("es-MX")}
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-cream-dark space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-earth-tan text-sm">Subtotal estimado</span>
              <span className="font-display font-bold text-earth-dark">${total.toLocaleString("es-MX")} MXN</span>
            </div>
            <div className="flex items-center gap-2 bg-green-primary/8 rounded-xl p-3">
              <Truck size={15} className="text-green-primary flex-shrink-0"/>
              <span className="font-body text-green-primary text-xs font-medium">Entrega garantizada en 24h con cadena de frío</span>
            </div>
            <button className="w-full bg-orange-brand text-white font-body font-semibold py-3.5 rounded-xl hover:bg-orange-dark transition-colors shadow-orange text-sm active:scale-95">
              Confirmar pedido →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Notification panel ────────────────────────────────────────────────────

function NotifPanel({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-cream-dark shadow-xl z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-cream-dark">
        <h4 className="font-display font-bold text-earth-dark text-sm">Notificaciones</h4>
        <span className="badge bg-orange-brand/10 text-orange-brand text-xs">
          {mockNotificaciones.filter(n => n.unread).length} nuevas
        </span>
      </div>
      <div className="divide-y divide-cream-dark max-h-72 overflow-y-auto">
        {mockNotificaciones.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-cream/50 transition-colors ${n.unread ? "bg-teal-brand/4" : ""}`}>
            <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center text-lg flex-shrink-0">{n.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-body font-semibold text-earth-dark text-xs truncate">{n.title}</p>
                {n.unread && <span className="w-2 h-2 rounded-full bg-orange-brand flex-shrink-0"/>}
              </div>
              <p className="font-body text-earth-tan text-xs mt-0.5 leading-snug">{n.desc}</p>
              <p className="font-body text-earth-tan/60 text-xs mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-cream-dark">
        <button onClick={onClose} className="w-full text-center font-body text-teal-brand text-xs font-semibold hover:text-green-primary transition-colors">
          Marcar todas como leídas
        </button>
      </div>
    </motion.div>
  );
}

// ── Section: Pedidos ──────────────────────────────────────────────────────

function PedidosSection() {
  const [filter, setFilter] = useState("Todos");
  const statuses = ["Todos", "Confirmado", "En tránsito", "Entregado"];
  const filtered = filter === "Todos" ? mockPedidos : mockPedidos.filter(p => p.status === filter);

  return (
    <motion.div key="pedidos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1 bg-white rounded-xl px-1 py-1 shadow-sm border border-cream-dark flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${filter === s ? "bg-green-primary text-white shadow-sm" : "text-earth-tan hover:bg-cream hover:text-earth-dark"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((pedido, i) => {
          const cfg = pedidoStatusCfg[pedido.status] || pedidoStatusCfg["Confirmado"];
          const StatusIcon = cfg.icon;
          return (
            <motion.div key={pedido.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-cream-dark shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{pedido.emoji}</div>
                    <div>
                      <div className="font-body font-bold text-earth-dark text-sm">{pedido.id}</div>
                      <div className="font-body text-earth-tan text-xs">{pedido.date}</div>
                    </div>
                  </div>
                  <div className={`badge ${cfg.bg} ${cfg.text} flex items-center gap-1.5`}>
                    <StatusIcon size={11}/>
                    {pedido.status}
                  </div>
                </div>

                <div className="bg-cream/60 rounded-xl p-3 mb-3">
                  <div className="font-body font-medium text-earth-dark text-sm mb-1">{pedido.items}</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-green-primary flex items-center justify-center text-white text-xs font-bold">{pedido.producer.charAt(0)}</div>
                    <span className="font-body text-earth-tan text-xs">{pedido.producer}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-earth-dark text-lg">${pedido.total.toLocaleString("es-MX")}</span>
                    <span className="font-body text-earth-tan text-xs ml-1">MXN</span>
                  </div>
                  <div className="flex gap-2">
                    {pedido.status === "En tránsito" && (
                      <button className="flex items-center gap-1.5 bg-orange-brand/10 text-orange-brand font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-orange-brand/20 transition-colors">
                        <Truck size={12}/>
                        Rastrear
                      </button>
                    )}
                    {pedido.status === "Entregado" && (
                      <button className="flex items-center gap-1.5 bg-green-primary/10 text-green-primary font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-green-primary/20 transition-colors">
                        <Star size={12}/>
                        Calificar
                      </button>
                    )}
                    <button className="flex items-center gap-1.5 bg-cream text-earth-tan font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-cream-dark transition-colors">
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>

              {pedido.status === "En tránsito" && (
                <div className="px-5 pb-4">
                  <div className="flex items-center gap-2">
                    {["Confirmado", "Preparando", "En camino", "Entregado"].map((step, idx) => (
                      <div key={step} className="flex items-center gap-1 flex-1">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${idx <= 2 ? "bg-orange-brand" : "bg-cream-dark"}`}/>
                        <div className={`flex-1 h-0.5 ${idx < 2 ? "bg-orange-brand" : "bg-cream-dark"} ${idx === 3 ? "hidden" : ""}`}/>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {["Confirmado", "Preparando", "En camino", "Entregado"].map((step, idx) => (
                      <span key={step} className={`font-body text-xs ${idx <= 2 ? "text-orange-brand font-medium" : "text-earth-tan"}`} style={{ fontSize: "10px" }}>{step}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="font-display font-bold text-earth-dark text-lg mb-2">Sin pedidos</h3>
          <p className="font-body text-earth-tan text-sm">No tienes pedidos con ese estado actualmente.</p>
        </div>
      )}
    </motion.div>
  );
}

// ── Section: Favoritos ────────────────────────────────────────────────────

function FavoritosSection({ onNavigate }) {
  const navigate = useNavigate();
  const [favs, setFavs] = useState(mockFavoritos);
  const removeFav = (id) => setFavs(prev => prev.filter(f => f.id !== id));

  return (
    <motion.div key="favoritos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
      {favs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-5">❤️</div>
          <h3 className="font-display font-bold text-earth-dark text-2xl mb-3">Sin favoritos</h3>
          <p className="font-body text-earth-tan text-sm max-w-xs mb-6">Guarda productores y productos que te interesen para encontrarlos fácilmente.</p>
          <button onClick={() => onNavigate("explorar")} className="btn-outline text-sm">Explorar productos</button>
        </div>
      ) : (
        <>
          <div>
            <h3 className="font-display font-bold text-earth-dark text-base mb-3">Productores favoritos</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {favs.filter(f => f.type === "producer").map((fav, i) => (
                <motion.div key={fav.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-display font-bold text-base flex-shrink-0" style={{ backgroundColor: fav.color }}>
                    {fav.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-semibold text-earth-dark text-sm group-hover:text-green-primary transition-colors truncate">{fav.name}</div>
                    <div className="font-body text-earth-tan text-xs mt-0.5 truncate">{fav.sub}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} className="fill-orange-brand text-orange-brand"/>
                      <span className="font-body text-earth-dark text-xs font-semibold">{fav.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => navigate(`/productor-profile/${fav.id}`)} className="text-xs font-body font-semibold text-teal-brand hover:text-green-primary transition-colors whitespace-nowrap">
                      Ver perfil
                    </button>
                    <button onClick={() => removeFav(fav.id)} className="flex items-center gap-1 text-xs font-body text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={11}/>
                      Quitar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-earth-dark text-base mb-3">Productos favoritos</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {favs.filter(f => f.type === "product").map((fav, i) => (
                <motion.div key={fav.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: fav.color + "20" }}>
                    {fav.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-semibold text-earth-dark text-sm truncate">{fav.name}</div>
                    <div className="font-body text-earth-tan text-xs mt-0.5 truncate">{fav.sub}</div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => onNavigate("explorar")} className="text-xs font-body font-semibold text-teal-brand hover:text-green-primary transition-colors whitespace-nowrap">
                      Agregar
                    </button>
                    <button onClick={() => removeFav(fav.id)} className="flex items-center gap-1 text-xs font-body text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={11}/>
                      Quitar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ── Section: Facturación ──────────────────────────────────────────────────

function FacturacionSection() {
  return (
    <motion.div key="facturacion" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
      {/* Datos fiscales */}
      <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building size={17} className="text-green-primary"/>
          <h3 className="font-display font-bold text-earth-dark text-base">Datos Fiscales</h3>
          <span className="badge bg-green-primary/10 text-green-primary text-xs ml-auto">Verificado</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Razón Social",     value: "La Milpa Rest., S.A. de C.V." },
            { label: "RFC",              value: "LMR240501AB3" },
            { label: "Régimen Fiscal",   value: "601 – General de Ley Personas Morales" },
            { label: "Uso de CFDI",      value: "G03 – Gastos en general" },
            { label: "Código Postal",    value: "06600 – Col. Juárez, CDMX" },
            { label: "Email de Factura", value: "facturas@lamilpa.mx" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-body text-earth-tan text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
              <div className="font-body text-earth-dark text-sm font-medium">{value}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 font-body text-teal-brand text-sm font-semibold hover:text-green-primary transition-colors">
          Editar datos fiscales →
        </button>
      </div>

      {/* Historial de facturas */}
      <div>
        <h3 className="font-display font-bold text-earth-dark text-base mb-3">Facturas emitidas</h3>
        <div className="space-y-3">
          {mockFacturas.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText size={17} className="text-green-primary"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-body font-bold text-earth-dark text-sm">{f.id}</span>
                  <span className="badge bg-green-primary/10 text-green-primary text-xs">Vigente</span>
                </div>
                <div className="font-body text-earth-tan text-xs">{f.concepto} · {f.date}</div>
                <div className="font-body text-earth-tan text-xs">Pedido: {f.pedido}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-earth-dark text-base">${f.total.toLocaleString("es-MX")}</div>
                <div className="font-body text-earth-tan text-xs">MXN</div>
              </div>
              <button className="flex items-center gap-1.5 bg-teal-brand/10 text-teal-brand font-body font-semibold text-xs px-3 py-2 rounded-lg hover:bg-teal-brand/20 transition-colors flex-shrink-0">
                <Download size={12}/>
                PDF
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section: Soporte ──────────────────────────────────────────────────────

function SoporteSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <motion.div key="soporte" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
      {/* Canales de contacto */}
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: MessageCircle, label: "WhatsApp",    sub: "Respuesta en minutos",     color: "bg-green-primary/10 text-green-primary",  action: "Abrir chat" },
          { icon: Mail,          label: "Email",       sub: "hola@correcaminos.mx",     color: "bg-teal-brand/10 text-teal-brand",         action: "Enviar correo" },
          { icon: Phone,         label: "Teléfono",   sub: "Lun–Sáb 8am–8pm",         color: "bg-orange-brand/10 text-orange-brand",     action: "Llamar ahora" },
        ].map(({ icon: Icon, label, sub, color, action }) => (
          <button key={label} className="bg-white rounded-2xl border border-cream-dark shadow-card p-5 text-center hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mx-auto mb-3`}>
              <Icon size={20}/>
            </div>
            <div className="font-body font-bold text-earth-dark text-sm mb-1">{label}</div>
            <div className="font-body text-earth-tan text-xs mb-3">{sub}</div>
            <div className="font-body font-semibold text-teal-brand text-xs group-hover:text-green-primary transition-colors">{action} →</div>
          </button>
        ))}
      </div>

      {/* Horario */}
      <div className="bg-gradient-to-r from-teal-brand/8 to-green-primary/8 border border-teal-brand/18 rounded-2xl p-4 flex items-center gap-3">
        <Clock size={17} className="text-teal-brand flex-shrink-0"/>
        <div>
          <div className="font-body font-semibold text-earth-dark text-sm">Soporte disponible 7 días a la semana</div>
          <div className="font-body text-earth-tan text-xs">Lunes a sábado 8am–8pm · Domingos 9am–3pm</div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="font-display font-bold text-earth-dark text-base mb-3">Preguntas frecuentes</h3>
        <div className="space-y-2">
          {faqComprador.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-cream-dark shadow-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-cream/50 transition-colors"
              >
                <span className="font-body font-semibold text-earth-dark text-sm pr-4">{item.q}</span>
                {openFaq === i ? <ChevronUp size={15} className="text-earth-tan flex-shrink-0"/> : <ChevronDown size={15} className="text-earth-tan flex-shrink-0"/>}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="px-4 pb-4 font-body text-earth-tan text-sm leading-relaxed border-t border-cream-dark pt-3">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function DashboardComprador() {
  const [activeNav, setActiveNav] = useState("explorar");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeState, setActiveState] = useState("Todo México");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCat    = activeCategory === "Todas" || p.category === activeCategory;
    const matchState  = activeState === "Todo México" || p.state === activeState;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchState && matchSearch;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const addToCart   = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const updateQty   = (id, delta) => setCart((prev) => {
    const newQty = Math.max(0, (prev[id] || 0) + delta);
    if (newQty === 0) { const next = { ...prev }; delete next[id]; return next; }
    return { ...prev, [id]: newQty };
  });

  const unreadCount = mockNotificaciones.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-cream-dark transform transition-transform duration-300 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>
        <div className="p-5 border-b border-cream-dark">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Correcaminos" className="w-10 h-10 rounded-full object-cover ring-2 ring-cream-dark group-hover:ring-orange-brand/40 transition-all"/>
            <div>
              <div className="font-display font-bold text-green-primary text-sm tracking-widest leading-none">CORRECAMINOS</div>
              <div className="font-body text-earth-tan text-xs mt-0.5">Panel Comprador</div>
            </div>
          </Link>
        </div>

        <div className="mx-3 mt-3 bg-gradient-to-br from-teal-brand/8 to-green-primary/6 rounded-2xl border border-teal-brand/12 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-brand to-green-primary flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">MV</div>
            <div className="min-w-0">
              <div className="font-body font-semibold text-earth-dark text-sm truncate">La Milpa Rest.</div>
              <div className="font-body text-earth-tan text-xs">Col. Juárez, CDMX</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2.5">
            <CheckCircle size={11} className="text-teal-brand fill-teal-brand/20"/>
            <span className="font-body text-earth-tan text-xs">Comprador verificado</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 mt-3">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => { setActiveNav(key); setSidebarOpen(false); }}
              className={`sidebar-item w-full text-left ${activeNav === key ? "active" : ""}`}
            >
              <Icon size={17} strokeWidth={activeNav === key ? 2.2 : 1.8}/>
              <span>{label}</span>
              {activeNav === key && <ChevronRight size={13} className="ml-auto opacity-60"/>}
            </button>
          ))}
        </nav>

        <div className="mx-3 mb-3">
          <button onClick={() => navigate("/productor")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-green-primary/25 bg-green-primary/6 hover:bg-green-primary/12 transition-colors text-green-primary text-sm font-medium font-body">
            <ArrowLeftRight size={15}/>
            <span>Ir al Panel Productor</span>
          </button>
        </div>

        <div className="p-3 border-t border-cream-dark">
          <Link to="/" className="sidebar-item w-full text-left text-earth-tan hover:text-red-500 hover:bg-red-50">
            <LogOut size={16}/>
            <span>Volver al inicio</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white/96 backdrop-blur-xl border-b border-cream-dark px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-xl text-earth-tan hover:bg-cream-dark" onClick={() => setSidebarOpen(true)}>
              <Menu size={20}/>
            </button>
            <div>
              <h1 className="font-display font-bold text-earth-dark text-lg leading-none">
                {navItems.find(n => n.key === activeNav)?.label}
              </h1>
              <p className="font-body text-earth-tan text-xs mt-0.5">
                {activeNav === "explorar"
                  ? `${filteredProducts.length} productos disponibles`
                  : activeNav === "productores"
                  ? `${productorProfiles.length} productores verificados`
                  : "6 may 2026"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(v => !v)}
                className="relative p-2.5 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors"
              >
                <Bell size={18}/>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-orange-brand ring-2 ring-white flex items-center justify-center">
                    <span className="text-white font-bold" style={{ fontSize: "9px" }}>{unreadCount}</span>
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && <NotifPanel onClose={() => setNotifOpen(false)}/>}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-orange-brand text-white font-body font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-orange-dark transition-colors shadow-orange active:scale-95"
            >
              <ShoppingCart size={16}/>
              <span className="hidden sm:inline">Mi pedido</span>
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-white text-orange-brand text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeNav === "explorar" ? (
              <motion.div key="explorar" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <div className="mb-6 space-y-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-tan pointer-events-none"/>
                    <input type="text" placeholder="Buscar productos, productores, regiones..." value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-cream-darker rounded-2xl pl-11 pr-4 py-3 font-body text-sm text-earth-dark focus:outline-none focus:ring-2 focus:ring-teal-brand focus:border-transparent placeholder:text-earth-tan/60 shadow-card"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-white rounded-xl px-1 py-1 shadow-sm border border-cream-dark">
                      {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                          className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${activeCategory === cat ? "bg-green-primary text-white shadow-sm" : "text-earth-tan hover:bg-cream hover:text-earth-dark"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <select value={activeState} onChange={(e) => setActiveState(e.target.value)}
                        className="appearance-none bg-white border border-cream-dark rounded-xl px-4 py-2 font-body text-xs text-earth-dark font-medium focus:outline-none focus:ring-2 focus:ring-teal-brand shadow-sm pr-7 cursor-pointer"
                      >
                        {states.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-earth-tan pointer-events-none"/>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <Package size={15} className="text-earth-tan"/>
                  <span className="font-body text-earth-tan text-sm">
                    <strong className="text-earth-dark font-semibold">{filteredProducts.length}</strong> productos encontrados
                  </span>
                  {(activeCategory !== "Todas" || activeState !== "Todo México" || searchQuery) && (
                    <button onClick={() => { setActiveCategory("Todas"); setActiveState("Todo México"); setSearchQuery(""); }}
                      className="ml-1 text-xs text-teal-brand font-medium hover:text-teal-light transition-colors flex items-center gap-1"
                    >
                      <X size={11}/>
                      Limpiar
                    </button>
                  )}
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} cartCount={cart[product.id] || 0}/>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="font-display font-bold text-earth-dark text-xl mb-2">Sin resultados</h3>
                    <p className="font-body text-earth-tan text-sm max-w-xs">No encontramos productos con esos filtros.</p>
                  </div>
                )}
              </motion.div>

            ) : activeNav === "productores" ? (
              <motion.div key="productores" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productorProfiles.map((profile, i) => (
                    <motion.div key={profile.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      onClick={() => navigate(`/productor-profile/${profile.id}`)}
                      className="bg-white rounded-2xl overflow-hidden border border-cream-dark shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="h-20 relative" style={{ backgroundColor: profile.color + "25" }}>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${profile.color} 1px, transparent 1px)`, backgroundSize: "16px 16px" }}/>
                      </div>
                      <div className="p-4 -mt-10 relative z-10">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg ring-3 ring-white mx-auto mb-3" style={{ backgroundColor: profile.color }}>
                          {profile.initials}
                        </div>
                        <div className="text-center">
                          <h4 className="font-body font-semibold text-earth-dark text-sm mb-1 group-hover:text-green-primary transition-colors">{profile.name}</h4>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <MapPin size={11} className="text-earth-tan flex-shrink-0"/>
                            <span className="font-body text-earth-tan text-xs">{profile.location}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-3">
                            <Star size={12} className="fill-orange-brand text-orange-brand"/>
                            <span className="font-body font-semibold text-earth-dark text-xs">{profile.rating}</span>
                            <span className="font-body text-earth-tan text-xs">({profile.reviews})</span>
                          </div>
                          <div className="bg-green-primary/8 rounded-xl px-3 py-2 mb-3">
                            <span className="font-body text-green-primary text-xs font-medium">{profile.specialty}</span>
                          </div>
                          <div className="flex items-center justify-center gap-3 text-xs font-body text-earth-tan">
                            <span>{profile.totalSales} ventas</span>
                            <span className="w-1 h-1 rounded-full bg-earth-tan/40"/>
                            <span>{profile.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            ) : activeNav === "precios" ? (
              <motion.div key="precios" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <PreciosSNIIM titulo="Precios Oficiales SNIIM" expandable/>
              </motion.div>

            ) : activeNav === "pedidos" ? (
              <PedidosSection/>

            ) : activeNav === "favoritos" ? (
              <FavoritosSection onNavigate={setActiveNav}/>

            ) : activeNav === "facturacion" ? (
              <FacturacionSection/>

            ) : activeNav === "soporte" ? (
              <SoporteSection/>

            ) : null}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {cartOpen && <CartDrawer cart={cart} products={products} onClose={() => setCartOpen(false)} onUpdateQty={updateQty}/>}
      </AnimatePresence>
    </div>
  );
}
