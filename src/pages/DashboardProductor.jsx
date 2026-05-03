import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout, ShoppingCart, History, CreditCard, LifeBuoy,
  Upload, Plus, X, Image, Check, Clock, TrendingUp,
  Menu, ChevronRight, Bell, LogOut, Star, Truck
} from "lucide-react";
import { recentOrders, weeklyEarnings } from "../data/mockStats";
import { productorListings } from "../data/mockProducts";

const navItems = [
  { key: "cosecha", label: "Mi Cosecha", icon: Sprout },
  { key: "pedidos", label: "Pedidos Activos", icon: ShoppingCart },
  { key: "historial", label: "Historial de Ventas", icon: History },
  { key: "pagos", label: "Mis Pagos", icon: CreditCard },
  { key: "soporte", label: "Soporte", icon: LifeBuoy },
];

const statusConfig = {
  Activo: { bg: "bg-green-primary/12", text: "text-green-primary", dot: "bg-green-primary", icon: Check },
  "En revisión": { bg: "bg-orange-brand/12", text: "text-orange-brand", dot: "bg-orange-brand", icon: Clock },
  Vendido: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400", icon: Check },
};

function UploadForm({ onClose }) {
  const [formData, setFormData] = useState({
    producto: "", cantidad: "", unidad: "kg", fechaCosecha: "", precio: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-primary to-teal-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-cream text-xl">Nueva Cosecha</h3>
              <p className="font-body text-cream/70 text-sm">Registra tu producto disponible</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-cream hover:bg-white/30 transition-colors">
              <X size={16}/>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-wide mb-1.5 block">
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
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-wide mb-1.5 block">
                Cantidad *
              </label>
              <input
                type="number"
                placeholder="500"
                className="input-field"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-wide mb-1.5 block">
                Unidad
              </label>
              <select
                className="input-field"
                value={formData.unidad}
                onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
              >
                <option value="kg">Kilogramos (kg)</option>
                <option value="ton">Toneladas (ton)</option>
                <option value="caja">Cajas</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-wide mb-1.5 block">
                Fecha de cosecha *
              </label>
              <input
                type="date"
                className="input-field"
                value={formData.fechaCosecha}
                onChange={(e) => setFormData({ ...formData, fechaCosecha: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-wide mb-1.5 block">
                Precio sugerido ($/kg)
              </label>
              <input
                type="number"
                placeholder="12.50"
                className="input-field"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-wide mb-1.5 block">
              Fotos del producto
            </label>
            <div className="border-2 border-dashed border-cream-darker rounded-xl p-6 text-center hover:border-teal-brand transition-colors cursor-pointer bg-cream/40">
              <Image size={28} className="text-earth-tan mx-auto mb-2"/>
              <p className="font-body text-earth-tan text-sm">Arrastra fotos aquí o</p>
              <p className="font-body text-teal-brand text-sm font-medium">haz clic para seleccionar</p>
              <p className="font-body text-earth-tan text-xs mt-1">JPG, PNG · Máx 5MB</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 btn-outline text-sm">
              Cancelar
            </button>
            <button className="flex-1 bg-green-primary text-cream font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-green-dark transition-colors shadow-card">
              Publicar cosecha
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EarningsCard() {
  return (
    <div className="bg-gradient-to-br from-green-primary to-teal-brand rounded-2xl p-5 text-cream">
      <div className="flex items-center justify-between mb-4">
        <div className="font-body text-cream/70 text-sm font-medium">Esta semana</div>
        <TrendingUp size={18} className="text-teal-light"/>
      </div>
      <div className="font-display font-bold text-3xl mb-1">
        ${weeklyEarnings.current.toLocaleString("es-MX")}
        <span className="text-teal-light text-lg ml-1">MXN</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-cream/60 mb-4">
        <span>+{Math.round(((weeklyEarnings.current - weeklyEarnings.lastWeek) / weeklyEarnings.lastWeek) * 100)}% vs semana pasada</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-xl p-3">
          <div className="font-body text-cream/60 text-xs mb-0.5">Este mes</div>
          <div className="font-display font-bold text-cream">${weeklyEarnings.month.toLocaleString("es-MX")}</div>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <div className="font-body text-cream/60 text-xs mb-0.5">Por cobrar</div>
          <div className="font-display font-bold text-orange-light">${weeklyEarnings.pending.toLocaleString("es-MX")}</div>
        </div>
      </div>
    </div>
  );
}

function ListingRow({ listing }) {
  const s = statusConfig[listing.status] || statusConfig["En revisión"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-cream-dark hover:border-teal-brand/30 hover:shadow-card transition-all duration-200"
    >
      {/* Product icon */}
      <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
        <Sprout size={18} className="text-green-primary"/>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-body font-semibold text-earth-dark text-sm">{listing.product}</div>
        <div className="font-body text-earth-tan text-xs">
          {listing.quantity} · Cosecha: {listing.harvestDate}
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0 hidden sm:block">
        <div className="font-body font-semibold text-earth-dark text-sm">${listing.priceKg}/kg</div>
        <div className="font-body text-earth-tan text-xs">{listing.photos} fotos</div>
      </div>

      {/* Status */}
      <div className={`badge ${s.bg} ${s.text} flex-shrink-0`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>
        {listing.status}
      </div>
    </motion.div>
  );
}

export default function DashboardProductor() {
  const [activeNav, setActiveNav] = useState("cosecha");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-cream-dark transform transition-transform duration-300 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-cream-dark">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Correcaminos" className="w-10 h-10 rounded-full object-cover"/>
            <div>
              <div className="font-display font-bold text-green-primary text-sm leading-tight">CORRECAMINOS</div>
              <div className="font-body text-earth-tan text-xs">Panel Productor</div>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 mx-3 mt-3 bg-green-primary/8 rounded-2xl border border-green-primary/15">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-primary flex items-center justify-center text-cream font-display font-bold text-sm">
              ER
            </div>
            <div>
              <div className="font-body font-semibold text-earth-dark text-sm">Esteban Ramírez</div>
              <div className="font-body text-earth-tan text-xs">San Andrés Cholula</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Star size={11} className="fill-orange-brand text-orange-brand"/>
            <span className="font-body text-earth-tan text-xs">4.9 · Productor verificado</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveNav(key); setSidebarOpen(false); }}
              className={`sidebar-item w-full text-left ${activeNav === key ? "active" : ""}`}
            >
              <Icon size={17} strokeWidth={activeNav === key ? 2 : 1.8}/>
              <span>{label}</span>
              {activeNav === key && (
                <ChevronRight size={14} className="ml-auto"/>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-cream-dark">
          <Link
            to="/"
            className="sidebar-item w-full text-left text-earth-brown hover:text-red-500 hover:bg-red-50"
          >
            <LogOut size={17}/>
            <span>Cerrar sesión</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-cream-dark px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg text-earth-brown hover:bg-cream-dark transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20}/>
            </button>
            <div>
              <h1 className="font-display font-bold text-earth-dark text-lg leading-none">
                {activeNav === "cosecha" && "Mi Cosecha"}
                {activeNav === "pedidos" && "Pedidos Activos"}
                {activeNav === "historial" && "Historial de Ventas"}
                {activeNav === "pagos" && "Mis Pagos"}
                {activeNav === "soporte" && "Soporte"}
              </h1>
              <p className="font-body text-earth-tan text-xs">3 May 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-earth-brown hover:bg-cream-dark transition-colors">
              <Bell size={18}/>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-brand"/>
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-green-primary text-cream font-body font-semibold text-sm px-4 py-2 rounded-full hover:bg-green-dark transition-colors shadow-card"
            >
              <Plus size={16}/>
              <span className="hidden sm:inline">Nueva cosecha</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          {activeNav === "cosecha" && (
            <>
              {/* Summary row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <EarningsCard />

                {/* Quick stats */}
                <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Cosechas activas", value: "2", color: "green", icon: Sprout },
                    { label: "En revisión", value: "1", color: "orange", icon: Clock },
                    { label: "Ventas totales", value: "14", color: "teal", icon: TrendingUp },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
                      <div className={`w-8 h-8 rounded-xl mb-3 flex items-center justify-center ${
                        stat.color === "green" ? "bg-green-primary/10" : stat.color === "orange" ? "bg-orange-brand/10" : "bg-teal-brand/10"
                      }`}>
                        <stat.icon size={16} className={
                          stat.color === "green" ? "text-green-primary" : stat.color === "orange" ? "text-orange-brand" : "text-teal-brand"
                        }/>
                      </div>
                      <div className="font-display font-bold text-earth-dark text-2xl">{stat.value}</div>
                      <div className="font-body text-earth-tan text-xs">{stat.label}</div>
                    </div>
                  ))}

                  {/* Recent order */}
                  <div className="col-span-2 sm:col-span-3 bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body font-semibold text-earth-dark text-sm">Pedido reciente</span>
                      <span className="badge bg-teal-brand/10 text-teal-brand">
                        <Truck size={11}/>
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
                      <div className="font-display font-bold text-green-primary text-sm">
                        ${recentOrders[0].amount.toLocaleString("es-MX")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active listings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-earth-dark text-lg">Mis publicaciones</h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-1.5 text-green-primary font-body text-sm font-medium hover:text-green-dark transition-colors"
                  >
                    <Plus size={16}/>
                    Agregar
                  </button>
                </div>

                <div className="space-y-3">
                  {productorListings.map((listing, i) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <ListingRow listing={listing}/>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Help banner */}
              <div className="bg-gradient-to-r from-teal-brand/10 to-green-primary/10 border border-teal-brand/20 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-brand/20 flex items-center justify-center flex-shrink-0">
                  <LifeBuoy size={20} className="text-teal-brand"/>
                </div>
                <div className="flex-1">
                  <div className="font-body font-semibold text-earth-dark text-sm">¿Tienes dudas para registrar tu cosecha?</div>
                  <div className="font-body text-earth-tan text-xs">Un asesor de Correcaminos puede ayudarte hoy mismo.</div>
                </div>
                <button className="flex-shrink-0 font-body font-semibold text-teal-brand text-sm hover:text-green-primary transition-colors whitespace-nowrap">
                  Contactar →
                </button>
              </div>
            </>
          )}

          {/* Other sections placeholder */}
          {activeNav !== "cosecha" && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cream-dark flex items-center justify-center mb-4">
                {(() => {
                  const item = navItems.find(n => n.key === activeNav);
                  const Icon = item?.icon || Sprout;
                  return <Icon size={28} className="text-earth-tan"/>;
                })()}
              </div>
              <h3 className="font-display font-bold text-earth-dark text-xl mb-2">
                {navItems.find(n => n.key === activeNav)?.label}
              </h3>
              <p className="font-body text-earth-tan text-sm max-w-xs">
                Esta sección estará disponible próximamente. Mientras tanto, registra tu cosecha desde Mi Cosecha.
              </p>
              <button
                onClick={() => setActiveNav("cosecha")}
                className="mt-4 btn-outline text-sm"
              >
                Ir a Mi Cosecha
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Upload form modal */}
      <AnimatePresence>
        {showForm && <UploadForm onClose={() => setShowForm(false)}/>}
      </AnimatePresence>
    </div>
  );
}
