import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout, ShoppingCart, History, CreditCard, LifeBuoy,
  Upload, Plus, X, Image, Check, Clock, TrendingUp,
  Menu, ChevronRight, Bell, LogOut, Star, Truck, ArrowLeftRight, DollarSign
} from "lucide-react";
import { recentOrders, weeklyEarnings } from "../data/mockStats";
import { productorListings } from "../data/mockProducts";
import PreciosSNIIM from "../components/PreciosSNIIM";

const navItems = [
  { key: "cosecha", label: "Mi Cosecha", icon: Sprout },
  { key: "precios", label: "Precios Mercado", icon: DollarSign },
  { key: "pedidos", label: "Pedidos Activos", icon: ShoppingCart },
  { key: "historial", label: "Historial de Ventas", icon: History },
  { key: "pagos", label: "Mis Pagos", icon: CreditCard },
  { key: "soporte", label: "Soporte", icon: LifeBuoy },
];

const statusConfig = {
  Activo: { bg: "bg-green-primary/10", text: "text-green-primary", dot: "bg-green-primary" },
  "En revisión": { bg: "bg-orange-brand/10", text: "text-orange-brand", dot: "bg-orange-brand" },
  Vendido: { bg: "bg-gray-100", text: "text-gray-400", dot: "bg-gray-300" },
};

function UploadForm({ onClose }) {
  const [formData, setFormData] = useState({
    producto: "", cantidad: "", unidad: "kg", fechaCosecha: "", precio: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-primary to-teal-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-cream text-xl">Nueva Cosecha</h3>
              <p className="font-body text-cream/65 text-sm mt-0.5">Registra tu producto disponible</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-cream transition-colors"
            >
              <X size={15}/>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">
                Producto *
              </label>
              <input
                type="text"
                placeholder="Ej: Maíz criollo, Tomate saladette..."
                className="input-field"
                value={formData.producto}
                onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Cantidad *</label>
              <input type="number" placeholder="500" className="input-field"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Unidad</label>
              <select className="input-field" value={formData.unidad}
                onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}>
                <option value="kg">Kilogramos (kg)</option>
                <option value="ton">Toneladas</option>
                <option value="caja">Cajas</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Fecha cosecha *</label>
              <input type="date" className="input-field" value={formData.fechaCosecha}
                onChange={(e) => setFormData({ ...formData, fechaCosecha: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">Precio ($/kg)</label>
              <input type="number" placeholder="12.50" className="input-field" value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
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
        <div className="font-body text-cream/50 text-xs mb-4">
          +{pct}% vs semana pasada
        </div>
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

const sectionContent = {
  precios: {
    emoji: "📊",
    title: "Precios de Mercado",
    desc: "Consulta los precios oficiales del SNIIM para estabelecer tus precios competitivo.",
    action: null,
  },
  pedidos: {
    emoji: "📦",
    title: "Pedidos Activos",
    desc: "Aquí verás los pedidos que compradores hacen de tus cosechas en tiempo real.",
    action: "cosecha",
    actionLabel: "Ir a Mi Cosecha",
  },
  historial: {
    emoji: "📊",
    title: "Historial de Ventas",
    desc: "Consulta todas tus ventas pasadas, fechas, montos y compradores.",
    action: "cosecha",
    actionLabel: "Ir a Mi Cosecha",
  },
  pagos: {
    emoji: "💳",
    title: "Mis Pagos",
    desc: "Gestiona tus pagos recibidos, pendientes y configura tu cuenta bancaria.",
    action: "cosecha",
    actionLabel: "Ir a Mi Cosecha",
  },
  soporte: {
    emoji: "🎧",
    title: "Soporte",
    desc: "Nuestro equipo está disponible 7 días a la semana para ayudarte.",
    action: "cosecha",
    actionLabel: "Ir a Mi Cosecha",
  },
};

export default function DashboardProductor() {
  const [activeNav, setActiveNav] = useState("cosecha");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const section = sectionContent[activeNav];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-cream-dark transform transition-transform duration-300 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}
      >
        {/* Header */}
        <div className="p-5 border-b border-cream-dark">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Correcaminos" className="w-10 h-10 rounded-full object-cover ring-2 ring-cream-dark group-hover:ring-orange-brand/40 transition-all"/>
            <div>
              <div className="font-display font-bold text-green-primary text-sm tracking-widest leading-none">CORRECAMINOS</div>
              <div className="font-body text-earth-tan text-xs mt-0.5">Panel Productor</div>
            </div>
          </Link>
        </div>

        {/* User */}
        <div className="mx-3 mt-3 bg-gradient-to-br from-green-primary/8 to-teal-brand/6 rounded-2xl border border-green-primary/12 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-primary to-teal-brand flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
              ER
            </div>
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

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 mt-3">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveNav(key); setSidebarOpen(false); }}
              className={`sidebar-item w-full text-left ${activeNav === key ? "active" : ""}`}
            >
              <Icon size={17} strokeWidth={activeNav === key ? 2.2 : 1.8}/>
              <span>{label}</span>
              {activeNav === key && <ChevronRight size={13} className="ml-auto opacity-60"/>}
            </button>
          ))}
        </nav>

        {/* Role switcher */}
        <div className="mx-3 mb-3">
          <button
            onClick={() => navigate("/comprador")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-teal-brand/25 bg-teal-brand/6 hover:bg-teal-brand/12 transition-colors text-teal-brand text-sm font-medium font-body"
          >
            <ArrowLeftRight size={15}/>
            <span>Ir al Panel Comprador</span>
          </button>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-cream-dark">
          <Link to="/" className="sidebar-item w-full text-left text-earth-tan hover:text-red-500 hover:bg-red-50">
            <LogOut size={16}/>
            <span>Volver al inicio</span>
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}/>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/96 backdrop-blur-xl border-b border-cream-dark px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20}/>
            </button>
            <div>
              <h1 className="font-display font-bold text-earth-dark text-lg leading-none">
                {navItems.find(n => n.key === activeNav)?.label}
              </h1>
              <p className="font-body text-earth-tan text-xs mt-0.5">4 may 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors">
              <Bell size={18}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-brand ring-2 ring-white"/>
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-green-primary text-white font-body font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-green-dark transition-colors shadow-card active:scale-95"
            >
              <Plus size={15}/>
              <span className="hidden sm:inline">Nueva cosecha</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 space-y-5">
          <AnimatePresence mode="wait">
            {activeNav === "cosecha" ? (
              <motion.div
                key="cosecha"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <EarningsCard />
                  <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Cosechas activas", value: "2", color: "green", icon: Sprout },
                      { label: "En revisión", value: "1", color: "orange", icon: Clock },
                      { label: "Ventas totales", value: "14", color: "teal", icon: TrendingUp },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
                        <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${
                          stat.color === "green" ? "bg-green-primary/10" : stat.color === "orange" ? "bg-orange-brand/10" : "bg-teal-brand/10"
                        }`}>
                          <stat.icon size={16} className={
                            stat.color === "green" ? "text-green-primary" : stat.color === "orange" ? "text-orange-brand" : "text-teal-brand"
                          }/>
                        </div>
                        <div className="font-display font-bold text-earth-dark text-2xl">{stat.value}</div>
                        <div className="font-body text-earth-tan text-xs mt-0.5">{stat.label}</div>
                      </div>
                    ))}

                    {/* Recent order */}
                    <div className="col-span-2 sm:col-span-3 bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-body font-semibold text-earth-dark text-sm">Pedido reciente</span>
                        <span className="badge bg-teal-brand/10 text-teal-brand text-xs">
                          <Truck size={10}/>
                          En tránsito
                        </span>
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

                {/* Listings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-earth-dark text-lg">Mis publicaciones</h2>
                    <button
                      onClick={() => setShowForm(true)}
                      className="flex items-center gap-1.5 text-green-primary font-body text-sm font-semibold hover:text-green-dark transition-colors"
                    >
                      <Plus size={15}/>
                      Agregar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {productorListings.map((listing, i) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <ListingRow listing={listing}/>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Help banner */}
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
              <motion.div
                key="precios"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <PreciosSNIIM titulo="Precios de Mercado SNIIM" expandable />
              </motion.div>
            ) : (
              <motion.div
                key={activeNav}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="text-5xl mb-5">{section.emoji}</div>
                <h3 className="font-display font-bold text-earth-dark text-2xl mb-3">{section.title}</h3>
                <p className="font-body text-earth-tan text-sm max-w-xs mb-6 leading-relaxed">{section.desc}</p>
                {section.action ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-orange-brand/10 border border-orange-brand/20 rounded-2xl px-5 py-2.5 mb-6">
                      <span className="w-2 h-2 rounded-full bg-orange-brand animate-pulse"/>
                      <span className="font-body text-orange-brand text-xs font-semibold">Próximamente disponible</span>
                    </div>
                    <button
                      onClick={() => setActiveNav(section.action)}
                      className="btn-outline text-sm"
                    >
                      {section.actionLabel}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setActiveNav("cosecha")}
                    className="btn-outline text-sm"
                  >
                    Volver a Mi Cosecha
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showForm && <UploadForm onClose={() => setShowForm(false)}/>}
      </AnimatePresence>
    </div>
  );
}
