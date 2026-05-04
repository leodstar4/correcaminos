import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, Heart, FileText, LifeBuoy,
  Menu, Bell, LogOut, Star, ChevronDown,
  Plus, Minus, X, ShoppingCart, MapPin, ChevronRight,
  Truck, Package, CheckCircle, ArrowLeftRight
} from "lucide-react";
import { products } from "../data/mockProducts";

const navItems = [
  { key: "explorar", label: "Explorar Productos", icon: Search },
  { key: "pedidos", label: "Mis Pedidos", icon: ShoppingBag },
  { key: "favoritos", label: "Favoritos", icon: Heart },
  { key: "facturacion", label: "Facturación", icon: FileText },
  { key: "soporte", label: "Soporte", icon: LifeBuoy },
];

const categories = ["Todas", "Verduras", "Granos", "Frutas"];
const states = ["Todo México", "Puebla", "Oaxaca", "Michoacán", "Chiapas", "Veracruz"];

const categoryColors = {
  Verduras: { bg: "bg-green-primary/10", text: "text-green-primary" },
  Granos: { bg: "bg-orange-brand/10", text: "text-orange-brand" },
  Frutas: { bg: "bg-teal-brand/10", text: "text-teal-brand" },
};

const emojiMap = { Verduras: "🥬", Granos: "🌽", Frutas: "🍋" };

const sectionContent = {
  pedidos: { emoji: "📦", title: "Mis Pedidos", desc: "Aquí verás el estado de todos tus pedidos, desde confirmado hasta entregado." },
  favoritos: { emoji: "❤️", title: "Favoritos", desc: "Guarda tus productores y productos preferidos para encontrarlos fácilmente." },
  facturacion: { emoji: "🧾", title: "Facturación", desc: "Descarga facturas, configura tus datos fiscales y gestiona tus pagos." },
  soporte: { emoji: "🎧", title: "Soporte", desc: "Nuestro equipo está disponible 7 días a la semana para ayudarte." },
};

function ProductCard({ product, onAddToCart, cartCount }) {
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
      {/* Image area */}
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

      {/* Content */}
      <div className="p-4">
        <div className={`badge ${c.bg} ${c.text} mb-2 text-xs`}>{product.category}</div>

        <h3 className="font-body font-semibold text-earth-dark text-sm leading-snug mb-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-earth-tan flex-shrink-0"/>
          <span className="font-body text-earth-tan text-xs">{product.origin}</span>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="font-display font-bold text-earth-dark text-lg">${product.pricePerKg.toFixed(2)}</span>
            <span className="font-body text-earth-tan text-xs ml-1">/kg</span>
          </div>
          <div className="text-right">
            <div className="font-body text-earth-tan text-xs">{product.available.toLocaleString("es-MX")} kg disp.</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cream-dark">
          <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {product.producer.charAt(0)}
          </div>
          <span className="font-body text-earth-tan text-xs truncate flex-1">{product.producer}</span>
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
                  <div className="font-body text-earth-tan text-xs">${item.pricePerKg}/kg</div>
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

export default function DashboardComprador() {
  const [activeNav, setActiveNav] = useState("explorar");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeState, setActiveState] = useState("Todo México");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((p) => {
    const matchCat = activeCategory === "Todas" || p.category === activeCategory;
    const matchState = activeState === "Todo México" || p.state === activeState;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchState && matchSearch;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      if (newQty === 0) { const next = { ...prev }; delete next[id]; return next; }
      return { ...prev, [id]: newQty };
    });
  };

  const section = sectionContent[activeNav];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-cream-dark transform transition-transform duration-300 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="p-5 border-b border-cream-dark">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Correcaminos" className="w-10 h-10 rounded-full object-cover ring-2 ring-cream-dark group-hover:ring-orange-brand/40 transition-all"/>
            <div>
              <div className="font-display font-bold text-green-primary text-sm tracking-widest leading-none">CORRECAMINOS</div>
              <div className="font-body text-earth-tan text-xs mt-0.5">Panel Comprador</div>
            </div>
          </Link>
        </div>

        {/* User */}
        <div className="mx-3 mt-3 bg-gradient-to-br from-teal-brand/8 to-green-primary/6 rounded-2xl border border-teal-brand/12 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-brand to-green-primary flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
              MV
            </div>
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
            onClick={() => navigate("/productor")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-green-primary/25 bg-green-primary/6 hover:bg-green-primary/12 transition-colors text-green-primary text-sm font-medium font-body"
          >
            <ArrowLeftRight size={15}/>
            <span>Ir al Panel Productor</span>
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
                {activeNav === "explorar" ? `${filteredProducts.length} productos disponibles` : "4 may 2026"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors">
              <Bell size={18}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-brand ring-2 ring-white"/>
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-orange-brand text-white font-body font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-orange-dark transition-colors shadow-orange active:scale-95"
            >
              <ShoppingCart size={16}/>
              <span className="hidden sm:inline">Mi pedido</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-white text-orange-brand text-xs font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeNav === "explorar" ? (
              <motion.div
                key="explorar"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Search & filters */}
                <div className="mb-6 space-y-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-tan pointer-events-none"/>
                    <input
                      type="text"
                      placeholder="Buscar productos, productores, regiones..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-cream-darker rounded-2xl pl-11 pr-4 py-3 font-body text-sm text-earth-dark focus:outline-none focus:ring-2 focus:ring-teal-brand focus:border-transparent placeholder:text-earth-tan/60 shadow-card"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* Category filter */}
                    <div className="flex items-center gap-1 bg-white rounded-xl px-1 py-1 shadow-sm border border-cream-dark">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                            activeCategory === cat
                              ? "bg-green-primary text-white shadow-sm"
                              : "text-earth-tan hover:bg-cream hover:text-earth-dark"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* State filter */}
                    <div className="relative">
                      <select
                        value={activeState}
                        onChange={(e) => setActiveState(e.target.value)}
                        className="appearance-none bg-white border border-cream-dark rounded-xl px-4 py-2 font-body text-xs text-earth-dark font-medium focus:outline-none focus:ring-2 focus:ring-teal-brand shadow-sm pr-7 cursor-pointer"
                      >
                        {states.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-earth-tan pointer-events-none"/>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="flex items-center gap-2 mb-5">
                  <Package size={15} className="text-earth-tan"/>
                  <span className="font-body text-earth-tan text-sm">
                    <strong className="text-earth-dark font-semibold">{filteredProducts.length}</strong> productos encontrados
                  </span>
                  {(activeCategory !== "Todas" || activeState !== "Todo México" || searchQuery) && (
                    <button
                      onClick={() => { setActiveCategory("Todas"); setActiveState("Todo México"); setSearchQuery(""); }}
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
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        cartCount={cart[product.id] || 0}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="font-display font-bold text-earth-dark text-xl mb-2">Sin resultados</h3>
                    <p className="font-body text-earth-tan text-sm max-w-xs">
                      No encontramos productos con esos filtros.
                    </p>
                  </div>
                )}
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
                <div className="text-5xl mb-5">{section?.emoji}</div>
                <h3 className="font-display font-bold text-earth-dark text-2xl mb-3">{section?.title}</h3>
                <p className="font-body text-earth-tan text-sm max-w-xs mb-6 leading-relaxed">{section?.desc}</p>
                <div className="inline-flex items-center gap-2 bg-orange-brand/10 border border-orange-brand/20 rounded-2xl px-5 py-2.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-orange-brand animate-pulse"/>
                  <span className="font-body text-orange-brand text-xs font-semibold">Próximamente disponible</span>
                </div>
                <button onClick={() => setActiveNav("explorar")} className="btn-outline text-sm">
                  Explorar productos
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer cart={cart} products={products} onClose={() => setCartOpen(false)} onUpdateQty={updateQty}/>
        )}
      </AnimatePresence>
    </div>
  );
}
