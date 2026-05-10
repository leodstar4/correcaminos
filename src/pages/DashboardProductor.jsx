import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout, ShoppingCart, History, CreditCard, LifeBuoy,
  Upload, Plus, X, Image, Check, Clock, TrendingUp,
  Menu, ChevronRight, Bell, LogOut, Star, Truck, ArrowLeftRight, DollarSign,
  ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Download, CheckCircle,
  AlertCircle, Package, XCircle, BarChart2, Calculator, Map
} from "lucide-react";
import { recentOrders, weeklyEarnings } from "../data/mockStats";
import { productorListings } from "../data/mockProducts";
import PreciosSNIIM from "../components/PreciosSNIIM";
import SimulationControls from "../components/SimulationControls";
import SimuladorPrecioJusto from "../components/SimuladorPrecioJusto";
import CalculadoraGanancia from "../components/CalculadoraGanancia";
import SimuladorCapacidad from "../components/SimuladorCapacidad";
import ChatPanel from "../components/ChatPanel";
import { WeeklyRevenueChart, MonthlyVolumeChart, HarvestProjectionChart, SalesDistributionChart } from "../components/charts/DashboardProductorCharts";
import OrderTrackerMap from "../components/OrderTrackerMap";

const navItems = [
  { key: "cosecha",  label: "Mi Cosecha",          icon: Sprout        },
  { key: "precios",  label: "Precios Mercado",      icon: DollarSign    },
  { key: "pedidos",  label: "Pedidos Activos",      icon: ShoppingCart  },
  { key: "historial",label: "Historial de Ventas",  icon: History       },
  { key: "pagos",    label: "Mis Pagos",            icon: CreditCard    },
  { key: "soporte",  label: "Soporte",              icon: LifeBuoy      },
  { key: "mensajes", label: "Mensajes",             icon: MessageCircle },
];

const statusConfig = {
  Activo:       { bg: "bg-green-primary/10", text: "text-green-primary", dot: "bg-green-primary" },
  "En revisión":{ bg: "bg-orange-brand/10",  text: "text-orange-brand",  dot: "bg-orange-brand"  },
  Vendido:      { bg: "bg-gray-100",          text: "text-gray-400",      dot: "bg-gray-300"      },
};

// ── Mock data ─────────────────────────────────────────────────────────────

const mockNotificaciones = [
  { id: 1, emoji: "🛒", title: "Nuevo pedido",          desc: "La Milpa Rest. quiere 500 kg de Maíz Criollo",   time: "hace 15 min", unread: true  },
  { id: 2, emoji: "✅", title: "Publicación aprobada",  desc: "Chile Poblano ya está visible en el catálogo",   time: "hace 2 h",    unread: true  },
  { id: 3, emoji: "💳", title: "Pago recibido",         desc: "$6,250 MXN depositados en tu cuenta BBVA",       time: "hace 3 días", unread: false },
];

const mockPedidosActivos = [
  { id: "CC-2026-005", buyer: "Hotel Boutique MX",   product: "Maíz Criollo",  qty: "200 kg",  total: 2500, date: "5 may 2026", status: "En tránsito",          emoji: "🌽" },
  { id: "CC-2026-004", buyer: "Cocina Central",       product: "Chile Poblano", qty: "50 kg",   total: 1600, date: "6 may 2026", status: "Preparando envío",      emoji: "🌶️" },
  { id: "CC-2026-003", buyer: "La Milpa Rest.",       product: "Maíz Criollo",  qty: "500 kg",  total: 6250, date: "6 may 2026", status: "Pendiente aceptación",  emoji: "🌽" },
];
const pedidoStatusCfg = {
  "En tránsito":          { bg: "bg-teal-brand/10",    text: "text-teal-brand",    icon: Truck         },
  "Preparando envío":     { bg: "bg-orange-brand/10",  text: "text-orange-brand",  icon: Package       },
  "Pendiente aceptación": { bg: "bg-yellow-50",        text: "text-yellow-700",    icon: AlertCircle   },
};

const mockHistorial = [
  { id: "CC-2026-002", buyer: "Restaurante Azul",  product: "Chile Poblano", qty: "150 kg",    total: 4800,  date: "20 abr 2026" },
  { id: "CC-2026-001", buyer: "La Milpa Rest.",    product: "Maíz Criollo",  qty: "1,000 kg",  total: 12500, date: "28 abr 2026" },
  { id: "CC-2026-000", buyer: "Bodega Express",    product: "Maíz Criollo",  qty: "500 kg",    total: 6250,  date: "10 abr 2026" },
];

const mockPagos = [
  { id: "PAG-004", concepto: "Maíz Criollo 200 kg",    buyer: "Hotel Boutique MX", amount: 2500,  date: "—",           status: "Por cobrar"  },
  { id: "PAG-003", concepto: "Maíz Criollo 500 kg",    buyer: "La Milpa Rest.",    amount: 6250,  date: "30 abr 2026", status: "Depositado"  },
  { id: "PAG-002", concepto: "Chile Poblano 150 kg",   buyer: "Restaurante Azul",  amount: 4800,  date: "22 abr 2026", status: "Depositado"  },
  { id: "PAG-001", concepto: "Maíz Criollo 1,000 kg",  buyer: "La Milpa Rest.",    amount: 12500, date: "12 abr 2026", status: "Depositado"  },
];
const pagoStatusCfg = {
  "Por cobrar": { bg: "bg-orange-brand/10", text: "text-orange-brand" },
  "Depositado": { bg: "bg-green-primary/10", text: "text-green-primary" },
};

const faqProductor = [
  { q: "¿Cómo registro una nueva cosecha?",       a: "Haz clic en 'Nueva cosecha' desde el panel principal. Completa los datos del producto, cantidad y precio, y sube fotos de tu cosecha." },
  { q: "¿Cuándo recibo mi pago?",                  a: "Los pagos se procesan dentro de las 48 horas después de que el comprador confirma la recepción satisfactoria del pedido." },
  { q: "¿Puedo modificar el precio publicado?",   a: "Sí, puedes editar el precio de tus publicaciones activas. Cambios de más del 20% requieren nueva revisión por nuestro equipo." },
  { q: "¿Qué pasa si no puedo cumplir un pedido?", a: "Notifica a soporte con al menos 12 horas de anticipación. Cancelaciones frecuentes afectan tu calificación como productor." },
  { q: "¿Cómo mejoro mi calificación?",           a: "Responde rápido a solicitudes, cumple fechas de entrega y sube fotos de calidad. Compradores satisfechos dejan mejores reseñas." },
];

// ── Sub-components ────────────────────────────────────────────────────────

function UploadForm({ onClose }) {
  const [formData, setFormData] = useState({ producto: "Cilantro", cantidad: "", unidad: "manojo", fechaCosecha: "", precio: "" });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-primary to-teal-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-cream text-xl">Nueva Cosecha</h3>
              <p className="font-body text-cream/65 text-sm mt-0.5">Registra tu producto disponible</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-cream transition-colors">
              <X size={15}/>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Producto *</label>
              <select className="input-field" value={formData.producto}
                onChange={(e) => setFormData({ ...formData, producto: e.target.value })}>
                <option value="Cilantro">Cilantro</option>
                <option value="Maíz Criollo">Maíz Criollo</option>
                <option value="Tomate Saladette">Tomate Saladette</option>
                <option value="Chile Poblano">Chile Poblano</option>
                <option value="Frijol Negro">Frijol Negro</option>
                <option value="Papa">Papa</option>
                <option value="Cebolla Blanca">Cebolla Blanca</option>
                <option value="Zanahoria">Zanahoria</option>
                <option value="Aguacate Hass">Aguacate Hass</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Cantidad *</label>
              <input type="number" placeholder="500" className="input-field" value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}/>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Unidad</label>
              <select className="input-field" value={formData.unidad} onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}>
                <option value="manojo">Manojos</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="ton">Toneladas</option>
                <option value="caja">Cajas</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Fecha cosecha *</label>
              <input type="date" className="input-field" value={formData.fechaCosecha}
                onChange={(e) => setFormData({ ...formData, fechaCosecha: e.target.value })}/>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Precio ($/kg)</label>
              <input type="number" placeholder="12.50" className="input-field" value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}/>
            </div>
          </div>

          <div>
            <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Fotos</label>
            <div className="border-2 border-dashed border-cream-darker rounded-xl p-6 text-center hover:border-teal-brand transition-colors cursor-pointer bg-cream/30 group">
              <Image size={26} className="text-earth-tan mx-auto mb-2 group-hover:text-teal-brand transition-colors"/>
              <p className="font-body text-earth-tan text-sm">Arrastra o <span className="text-teal-brand font-medium">selecciona fotos</span></p>
              <p className="font-body text-earth-tan/60 text-xs mt-1">JPG, PNG · Máx 5MB</p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 btn-outline text-sm">Cancelar</button>
            <button className="flex-1 bg-green-primary text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-green-dark transition-colors shadow-card active:scale-95">
              Publicar cosecha
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EarningsCard() {
  const pct = Math.round(((weeklyEarnings.current - weeklyEarnings.lastWeek) / weeklyEarnings.lastWeek) * 100);
  return (
    <div className="bg-gradient-to-br from-green-primary via-green-primary to-teal-brand rounded-2xl p-5 text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"/>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="font-body text-cream/65 text-xs font-medium tracking-wide uppercase">Esta semana</div>
          <TrendingUp size={16} className="text-teal-light"/>
        </div>
        <div className="font-display font-bold text-3xl mb-0.5">
          ${weeklyEarnings.current.toLocaleString("es-MX")}
          <span className="text-teal-light text-base ml-1">MXN</span>
        </div>
        <div className="font-body text-cream/50 text-xs mb-4">+{pct}% vs semana pasada</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="font-body text-cream/55 text-xs mb-0.5">Este mes</div>
            <div className="font-display font-bold text-cream text-base">${weeklyEarnings.month.toLocaleString("es-MX")}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="font-body text-cream/55 text-xs mb-0.5">Por cobrar</div>
            <div className="font-display font-bold text-orange-light text-base">${weeklyEarnings.pending.toLocaleString("es-MX")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingRow({ listing }) {
  const s = statusConfig[listing.status] || statusConfig["En revisión"];
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-cream-dark hover:border-green-primary/30 hover:shadow-card transition-all duration-200">
      <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
        <Sprout size={17} className="text-green-primary"/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-body font-semibold text-earth-dark text-sm">{listing.product}</div>
        <div className="font-body text-earth-tan text-xs">{listing.quantity} · Cosecha: {listing.harvestDate}</div>
      </div>
      <div className="text-right flex-shrink-0 hidden sm:block">
        <div className="font-body font-semibold text-earth-dark text-sm">${listing.priceKg}/kg</div>
        <div className="font-body text-earth-tan text-xs">{listing.photos} fotos</div>
      </div>
      <div className={`badge ${s.bg} ${s.text} flex-shrink-0`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>
        {listing.status}
      </div>
    </div>
  );
}

// ── Notification panel ────────────────────────────────────────────────────

function NotifPanel({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.18 }}
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

// ── Section: Pedidos Activos ──────────────────────────────────────────────

function PedidosActivosSection() {
  const [pedidos, setPedidos] = useState(mockPedidosActivos);

  const acceptPedido = (id) => setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: "Preparando envío" } : p));
  const rejectPedido = (id) => setPedidos(prev => prev.filter(p => p.id !== id));

  return (
    <motion.div key="pedidos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pendientes", value: pedidos.filter(p => p.status === "Pendiente aceptación").length, color: "bg-yellow-50 text-yellow-700" },
          { label: "Preparando", value: pedidos.filter(p => p.status === "Preparando envío").length,     color: "bg-orange-brand/10 text-orange-brand" },
          { label: "En tránsito", value: pedidos.filter(p => p.status === "En tránsito").length,          color: "bg-teal-brand/10 text-teal-brand" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 text-center">
            <div className={`font-display font-bold text-2xl mb-1 ${color.split(" ")[1]}`}>{value}</div>
            <div className="font-body text-earth-tan text-xs">{label}</div>
          </div>
        ))}
      </div>

      {pedidos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="font-display font-bold text-earth-dark text-lg mb-2">Sin pedidos activos</h3>
          <p className="font-body text-earth-tan text-sm">Cuando un comprador solicite tu cosecha, aparecerá aquí.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido, i) => {
            const cfg = pedidoStatusCfg[pedido.status] || pedidoStatusCfg["En tránsito"];
            const StatusIcon = cfg.icon;
            return (
              <motion.div key={pedido.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-cream-dark shadow-card p-5"
              >
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
                  <div className="font-body font-semibold text-earth-dark text-sm">{pedido.product} · {pedido.qty}</div>
                  <div className="font-body text-earth-tan text-xs mt-0.5">Comprador: {pedido.buyer}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-earth-dark text-lg">${pedido.total.toLocaleString("es-MX")}</span>
                    <span className="font-body text-earth-tan text-xs ml-1">MXN</span>
                  </div>
                  <div className="flex gap-2">
                    {pedido.status === "Pendiente aceptación" && (
                      <>
                        <button onClick={() => rejectPedido(pedido.id)} className="flex items-center gap-1.5 bg-red-50 text-red-500 font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                          <XCircle size={12}/>
                          Rechazar
                        </button>
                        <button onClick={() => acceptPedido(pedido.id)} className="flex items-center gap-1.5 bg-green-primary text-white font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-green-dark transition-colors">
                          <Check size={12}/>
                          Aceptar
                        </button>
                      </>
                    )}
                    {pedido.status === "Preparando envío" && (
                      <button className="flex items-center gap-1.5 bg-teal-brand/10 text-teal-brand font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-teal-brand/20 transition-colors">
                        <Truck size={12}/>
                        Marcar enviado
                      </button>
                    )}
                    {pedido.status === "En tránsito" && (
                      <button className="flex items-center gap-1.5 bg-cream text-earth-tan font-body font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-cream-dark transition-colors">
                        Rastrear envío
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

// ── Section: Historial de Ventas ──────────────────────────────────────────

function HistorialSection() {
  const totalVentas = mockHistorial.reduce((s, v) => s + v.total, 0);

  return (
    <motion.div key="historial" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total vendido",   value: `$${totalVentas.toLocaleString("es-MX")}`, sub: "MXN histórico" },
          { label: "Pedidos",         value: mockHistorial.length,                       sub: "completados" },
          { label: "Calificación",    value: "4.9 ⭐",                                  sub: "promedio" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 text-center">
            <div className="font-display font-bold text-earth-dark text-lg mb-0.5">{value}</div>
            <div className="font-body text-earth-tan text-xs">{label}</div>
            <div className="font-body text-earth-tan/60 text-xs">{sub}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-display font-bold text-earth-dark text-base mb-3">Ventas completadas</h3>
        <div className="space-y-3">
          {mockHistorial.map((venta, i) => (
            <motion.div key={venta.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={17} className="text-green-primary"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-body font-bold text-earth-dark text-sm">{venta.id}</span>
                  <span className="badge bg-green-primary/10 text-green-primary text-xs">Entregado</span>
                </div>
                <div className="font-body text-earth-tan text-xs">{venta.product} · {venta.qty}</div>
                <div className="font-body text-earth-tan text-xs">Comprador: {venta.buyer} · {venta.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-earth-dark text-base">${venta.total.toLocaleString("es-MX")}</div>
                <div className="font-body text-earth-tan text-xs">MXN</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section: Mis Pagos ────────────────────────────────────────────────────

function PagosSection() {
  const pendiente = mockPagos.filter(p => p.status === "Por cobrar").reduce((s, p) => s + p.amount, 0);
  const depositado = mockPagos.filter(p => p.status === "Depositado").reduce((s, p) => s + p.amount, 0);

  return (
    <motion.div key="pagos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
      {/* Resumen */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-primary to-teal-brand rounded-2xl p-5 text-cream">
          <div className="font-body text-cream/65 text-xs uppercase tracking-wide mb-2">Total depositado</div>
          <div className="font-display font-bold text-3xl">${depositado.toLocaleString("es-MX")}</div>
          <div className="font-body text-cream/50 text-xs mt-1">MXN · histórico</div>
        </div>
        <div className="bg-orange-brand/8 border border-orange-brand/20 rounded-2xl p-5">
          <div className="font-body text-orange-brand text-xs uppercase tracking-wide font-semibold mb-2">Por cobrar</div>
          <div className="font-display font-bold text-earth-dark text-3xl">${pendiente.toLocaleString("es-MX")}</div>
          <div className="font-body text-earth-tan text-xs mt-1">MXN · próximo depósito</div>
        </div>
      </div>

      {/* Cuenta bancaria */}
      <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard size={17} className="text-green-primary"/>
            <h3 className="font-display font-bold text-earth-dark text-base">Cuenta de depósito</h3>
          </div>
          <span className="badge bg-green-primary/10 text-green-primary text-xs">Verificada</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Banco",    value: "BBVA México" },
            { label: "CLABE",   value: "•••••••••••••••• 4521" },
            { label: "Titular", value: "Aurelio Méndez López" },
            { label: "Ciclo",   value: "Depósito cada 48h" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-body text-earth-tan text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
              <div className="font-body text-earth-dark text-sm font-medium">{value}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 font-body text-teal-brand text-sm font-semibold hover:text-green-primary transition-colors">
          Actualizar cuenta bancaria →
        </button>
      </div>

      {/* Movimientos */}
      <div>
        <h3 className="font-display font-bold text-earth-dark text-base mb-3">Movimientos</h3>
        <div className="space-y-3">
          {mockPagos.map((pago, i) => {
            const cfg = pagoStatusCfg[pago.status];
            return (
              <motion.div key={pago.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-cream-dark shadow-card p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <CreditCard size={17} className={cfg.text}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-semibold text-earth-dark text-sm truncate">{pago.concepto}</div>
                  <div className="font-body text-earth-tan text-xs">{pago.buyer} · {pago.date}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`font-display font-bold text-base ${pago.status === "Por cobrar" ? "text-orange-brand" : "text-green-primary"}`}>
                    ${pago.amount.toLocaleString("es-MX")}
                  </div>
                  <div className={`badge ${cfg.bg} ${cfg.text} text-xs mt-1`}>{pago.status}</div>
                </div>
              </motion.div>
            );
          })}
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
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: MessageCircle, label: "WhatsApp",  sub: "Respuesta en minutos",  color: "bg-green-primary/10 text-green-primary", action: "Abrir chat" },
          { icon: Mail,          label: "Email",     sub: "productores@correcaminos.mx", color: "bg-teal-brand/10 text-teal-brand", action: "Enviar correo" },
          { icon: Phone,         label: "Teléfono", sub: "Lun–Sáb 7am–9pm",       color: "bg-orange-brand/10 text-orange-brand",   action: "Llamar ahora" },
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

      <div className="bg-gradient-to-r from-teal-brand/8 to-green-primary/8 border border-teal-brand/18 rounded-2xl p-4 flex items-center gap-3">
        <Clock size={17} className="text-teal-brand flex-shrink-0"/>
        <div>
          <div className="font-body font-semibold text-earth-dark text-sm">Asesor disponible para productores</div>
          <div className="font-body text-earth-tan text-xs">Lunes a sábado 7am–9pm · Domingos 8am–2pm</div>
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-earth-dark text-base mb-3">Preguntas frecuentes</h3>
        <div className="space-y-2">
          {faqProductor.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-cream-dark shadow-card overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
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

export default function DashboardProductor() {
  const [activeNav, setActiveNav] = useState("cosecha");
  const [showForm, setShowForm] = useState(false);
  const [showPrecioJusto, setShowPrecioJusto] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
              <div className="font-body text-earth-tan text-xs mt-0.5">Panel Productor</div>
            </div>
          </Link>
        </div>

        <div className="mx-3 mt-3 bg-gradient-to-br from-green-primary/8 to-teal-brand/6 rounded-2xl border border-green-primary/12 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-primary to-teal-brand flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">ER</div>
            <div className="min-w-0">
              <div className="font-body font-semibold text-earth-dark text-sm truncate">Esteban Ramírez</div>
              <div className="font-body text-earth-tan text-xs">San Andrés Cholula</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2.5">
            <Star size={11} className="fill-orange-brand text-orange-brand"/>
            <span className="font-body text-earth-tan text-xs">4.9 · Productor verificado</span>
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
          <button onClick={() => navigate("/comprador")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-teal-brand/25 bg-teal-brand/6 hover:bg-teal-brand/12 transition-colors text-teal-brand text-sm font-medium font-body">
            <ArrowLeftRight size={15}/>
            <span>Ir al Panel Comprador</span>
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

      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="sticky top-0 z-20 bg-white/96 backdrop-blur-xl border-b border-cream-dark px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu size={20}/>
            </button>
            <div>
              <h1 className="font-display font-bold text-earth-dark text-lg leading-none">
                {navItems.find(n => n.key === activeNav)?.label}
              </h1>
              <p className="font-body text-earth-tan text-xs mt-0.5">6 may 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SimulationControls />
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(v => !v)} className="relative p-2.5 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors">
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
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-green-primary text-white font-body font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-green-dark transition-colors shadow-card active:scale-95">
              <Plus size={15}/>
              <span className="hidden sm:inline">Nueva cosecha</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 space-y-5">
          <AnimatePresence mode="wait">
            {activeNav === "cosecha" ? (
              <motion.div key="cosecha" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <EarningsCard/>
                  <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Cosechas activas", value: "2", color: "green", icon: Sprout },
                      { label: "En revisión",      value: "1", color: "orange", icon: Clock },
                      { label: "Ventas totales",   value: "14", color: "teal",  icon: TrendingUp },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
                        <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${stat.color === "green" ? "bg-green-primary/10" : stat.color === "orange" ? "bg-orange-brand/10" : "bg-teal-brand/10"}`}>
                          <stat.icon size={16} className={stat.color === "green" ? "text-green-primary" : stat.color === "orange" ? "text-orange-brand" : "text-teal-brand"}/>
                        </div>
                        <div className="font-display font-bold text-earth-dark text-2xl">{stat.value}</div>
                        <div className="font-body text-earth-tan text-xs mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                    <div className="col-span-2 sm:col-span-3 bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-body font-semibold text-earth-dark text-sm">Pedido reciente</span>
                        <span className="badge bg-teal-brand/10 text-teal-brand text-xs"><Truck size={10}/>En tránsito</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-brand/10 flex items-center justify-center flex-shrink-0">
                          <ShoppingCart size={14} className="text-teal-brand"/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-body font-medium text-earth-dark text-sm truncate">{recentOrders[0].product}</div>
                          <div className="font-body text-earth-tan text-xs">{recentOrders[0].buyer} · {recentOrders[0].quantity}</div>
                        </div>
                        <div className="font-display font-bold text-green-primary text-sm">${recentOrders[0].amount.toLocaleString("es-MX")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de simulación */}
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setShowPrecioJusto(true)}
                    className="flex items-center gap-2 bg-green-primary/8 border border-green-primary/20 text-green-primary font-body font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-green-primary/15 transition-colors"
                  >
                    <Calculator size={14}/>
                    Simulador Precio Justo
                  </button>
                </div>

                {/* Gráficos */}
                <div>
                  <h2 className="font-display font-bold text-earth-dark text-base mb-3 flex items-center gap-2">
                    <BarChart2 size={17} className="text-teal-brand"/>
                    Análisis de Rendimiento
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WeeklyRevenueChart />
                    <MonthlyVolumeChart />
                    <HarvestProjectionChart />
                    <SalesDistributionChart />
                  </div>
                </div>

                {/* Calculadoras inline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CalculadoraGanancia />
                  <SimuladorCapacidad />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-earth-dark text-lg">Mis publicaciones</h2>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 text-green-primary font-body text-sm font-semibold hover:text-green-dark transition-colors">
                      <Plus size={15}/>
                      Agregar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {productorListings.map((listing, i) => (
                      <motion.div key={listing.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                        <ListingRow listing={listing}/>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-brand/8 to-green-primary/8 border border-teal-brand/18 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-brand/15 flex items-center justify-center flex-shrink-0">
                    <LifeBuoy size={19} className="text-teal-brand"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-semibold text-earth-dark text-sm">¿Dudas para registrar tu cosecha?</div>
                    <div className="font-body text-earth-tan text-xs">Un asesor puede ayudarte hoy mismo.</div>
                  </div>
                  <button className="flex-shrink-0 font-body font-semibold text-teal-brand text-sm hover:text-green-primary transition-colors whitespace-nowrap">
                    Contactar →
                  </button>
                </div>
              </motion.div>

            ) : activeNav === "precios" ? (
              <motion.div key="precios" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <PreciosSNIIM titulo="Precios de Mercado SNIIM" expandable/>
              </motion.div>

            ) : activeNav === "pedidos" ? (
              <motion.div key="pedidos-wrap" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
                  <h3 className="font-display font-bold text-earth-dark text-base mb-4 flex items-center gap-2">
                    <Map size={16} className="text-teal-brand"/>
                    Rastreo de Envíos en Tiempo Real
                  </h3>
                  <div style={{ height: 420 }}>
                    <OrderTrackerMap/>
                  </div>
                </div>
                <PedidosActivosSection/>
              </motion.div>

            ) : activeNav === "historial" ? (
              <HistorialSection/>

            ) : activeNav === "pagos" ? (
              <PagosSection/>

            ) : activeNav === "soporte" ? (
              <SoporteSection/>

            ) : activeNav === "mensajes" ? (
              <motion.div key="mensajes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5 text-center py-16">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="font-display font-bold text-earth-dark text-lg mb-2">Centro de Mensajes</h3>
                  <p className="font-body text-earth-tan text-sm max-w-xs mx-auto mb-4">
                    Usa el chat en la esquina inferior derecha para comunicarte con compradores.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-green-primary/8 border border-green-primary/20 text-green-primary px-4 py-2 rounded-full font-body text-sm">
                    <MessageCircle size={14}/>
                    El chat está activo abajo a la derecha
                  </div>
                </div>
              </motion.div>

            ) : null}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showForm && <UploadForm onClose={() => setShowForm(false)}/>}
      </AnimatePresence>
      <AnimatePresence>
        {showPrecioJusto && <SimuladorPrecioJusto onClose={() => setShowPrecioJusto(false)}/>}
      </AnimatePresence>
      <ChatPanel role="productor" />
    </div>
  );
}
