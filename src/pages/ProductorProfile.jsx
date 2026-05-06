import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Star, Clock, Award, ShoppingBag,
  MessageCircle, Phone, ChevronRight, Package, Leaf, Truck,
  Camera, Upload, X, Image as ImageIcon, Users
} from "lucide-react";
import { productorProfiles, products } from "../data/mockProducts";

const emojiMap = { Verduras: "🥬", Granos: "🌽", Frutas: "🍋" };
const categoryColors = {
  Verduras: { bg: "bg-green-primary/10", text: "text-green-primary" },
  Granos:   { bg: "bg-orange-brand/10",  text: "text-orange-brand" },
  Frutas:   { bg: "bg-teal-brand/10",    text: "text-teal-brand" },
};

// ── Photo upload modal ────────────────────────────────────────────────────

function PhotoUploadModal({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-primary to-teal-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-cream text-xl">Subir fotos</h3>
              <p className="font-body text-cream/65 text-sm mt-0.5">Muestra tu familia, campo y proceso</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-cream transition-colors">
              <X size={15}/>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {["Familia", "Campo", "Cosecha", "Proceso", "Empaque", "Más..."].map((label) => (
              <button key={label} className="aspect-square rounded-2xl border-2 border-dashed border-cream-darker bg-cream/40 flex flex-col items-center justify-center gap-1.5 hover:border-teal-brand hover:bg-teal-brand/5 transition-colors group">
                <ImageIcon size={20} className="text-earth-tan group-hover:text-teal-brand transition-colors"/>
                <span className="font-body text-earth-tan text-xs group-hover:text-teal-brand transition-colors">{label}</span>
              </button>
            ))}
          </div>

          <div className="border-2 border-dashed border-cream-darker rounded-2xl p-6 text-center hover:border-teal-brand transition-colors cursor-pointer bg-cream/30 group">
            <Upload size={26} className="text-earth-tan mx-auto mb-2 group-hover:text-teal-brand transition-colors"/>
            <p className="font-body text-earth-tan text-sm">Arrastra o <span className="text-teal-brand font-medium">selecciona fotos</span></p>
            <p className="font-body text-earth-tan/60 text-xs mt-1">JPG, PNG · Máx 10MB por foto</p>
          </div>

          <div className="bg-green-primary/8 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Users size={16} className="text-green-primary flex-shrink-0 mt-0.5"/>
              <div>
                <p className="font-body font-semibold text-earth-dark text-sm">¿Por qué subir fotos?</p>
                <p className="font-body text-earth-tan text-xs mt-1 leading-relaxed">Los productores con fotos de su familia y campo reciben <strong className="text-green-primary">3x más pedidos</strong>. La transparencia genera confianza con los compradores.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 btn-outline text-sm">Cancelar</button>
            <button onClick={onClose} className="flex-1 bg-green-primary text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-green-dark transition-colors shadow-card active:scale-95">
              Guardar fotos
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Gallery section ───────────────────────────────────────────────────────

function GallerySection({ profile }) {
  const [showUpload, setShowUpload] = useState(false);
  const gallery = profile.gallery || [];

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera size={17} className="text-green-primary"/>
            <h3 className="font-display font-bold text-earth-dark text-lg">Nuestra familia y campo</h3>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-1.5 text-teal-brand font-body text-sm font-semibold hover:text-green-primary transition-colors"
          >
            <Upload size={14}/>
            Subir fotos
          </button>
        </div>

        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {gallery.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-cream-dark shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: photo.color + "30" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                  <div className="text-4xl">{photo.emoji}</div>
                  <span className="font-body text-earth-dark text-xs font-medium text-center leading-tight">{photo.label}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl"/>
              </motion.div>
            ))}

            {/* Add photo CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: gallery.length * 0.06 }}
              onClick={() => setShowUpload(true)}
              className="aspect-square rounded-2xl border-2 border-dashed border-cream-darker bg-cream/40 flex flex-col items-center justify-center gap-2 hover:border-teal-brand hover:bg-teal-brand/5 transition-all duration-200 group"
            >
              <Upload size={20} className="text-earth-tan group-hover:text-teal-brand transition-colors"/>
              <span className="font-body text-earth-tan text-xs group-hover:text-teal-brand transition-colors text-center px-2">Agregar foto</span>
            </motion.button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-8 text-center">
            <div className="w-16 h-16 bg-green-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera size={28} className="text-green-primary"/>
            </div>
            <h4 className="font-display font-bold text-earth-dark text-lg mb-2">Sube fotos de tu familia y campo</h4>
            <p className="font-body text-earth-tan text-sm max-w-sm mx-auto mb-4 leading-relaxed">
              Los compradores confían más en productores que muestran su historia. Sube fotos de tu familia, campo, cosecha y proceso.
            </p>
            <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-green-primary text-white font-body font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-green-dark transition-colors shadow-card mx-auto">
              <Upload size={14}/>
              Subir primeras fotos
            </button>
          </div>
        )}

        {/* Trust banner */}
        <div className="mt-4 bg-gradient-to-r from-orange-brand/8 to-orange-brand/4 border border-orange-brand/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="text-2xl">🌟</div>
          <div>
            <div className="font-body font-semibold text-earth-dark text-sm">Genera confianza con transparencia</div>
            <div className="font-body text-earth-tan text-xs">Productores con fotos de familia reciben 3x más pedidos y mejores calificaciones.</div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showUpload && <PhotoUploadModal onClose={() => setShowUpload(false)}/>}
      </AnimatePresence>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function ProductorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const profile = productorProfiles.find((p) => p.id === id);
  const producerProducts = products.filter((p) => p.producerId === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="font-display font-bold text-earth-dark text-2xl mb-3">Productor no encontrado</h2>
          <button onClick={() => navigate("/comprador")} className="btn-outline text-sm">Volver al panel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/96 backdrop-blur-xl border-b border-cream-dark px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/comprador")} className="p-2 rounded-xl text-earth-tan hover:bg-cream-dark transition-colors">
            <ArrowLeft size={20}/>
          </button>
          <div>
            <h1 className="font-display font-bold text-earth-dark text-lg leading-none">Perfil del Productor</h1>
            <p className="font-body text-earth-tan text-xs mt-0.5">Conoce a quien cultiva tus alimentos</p>
          </div>
        </div>
        <Link to="/comprador" className="flex items-center gap-1 text-green-primary font-body text-sm font-semibold hover:text-green-dark transition-colors">
          <span>Explorar productos</span>
          <ChevronRight size={14}/>
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl overflow-hidden shadow-card border border-cream-dark"
        >
          {/* Banner */}
          <div className="h-32 md:h-40 relative" style={{ background: `linear-gradient(135deg, ${profile.color}, ${profile.color}cc, #1A8A7B)` }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px)`, backgroundSize: "24px 24px" }}/>
          </div>

          {/* Avatar + Info */}
          <div className="px-6 md:px-8 pb-8 -mt-14 relative z-10">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Avatar — spans banner into white area */}
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center text-white font-display font-bold text-3xl shadow-xl ring-4 ring-white flex-shrink-0"
                style={{ backgroundColor: profile.color }}
              >
                {profile.initials}
              </div>

              {/* Name + meta — positioned in white area */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start gap-4 sm:mt-14">
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-earth-dark text-2xl md:text-3xl">{profile.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-earth-tan"/>
                      <span className="font-body text-earth-tan text-sm">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-orange-brand text-orange-brand"/>
                      <span className="font-body font-semibold text-earth-dark text-sm">{profile.rating}</span>
                      <span className="font-body text-earth-tan text-xs">({profile.reviews} reseñas)</span>
                    </div>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button className="flex items-center gap-2 bg-green-primary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-dark transition-colors shadow-card">
                    <MessageCircle size={15}/>
                    <span className="hidden sm:inline">Mensaje</span>
                  </button>
                  <button className="flex items-center gap-2 border-2 border-green-primary text-green-primary font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-primary hover:text-white transition-colors">
                    <Phone size={15}/>
                    <span className="hidden sm:inline">Llamar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { icon: ShoppingBag, label: "Ventas totales",    value: profile.totalSales,             color: "green"  },
            { icon: Clock,       label: "Tiempo respuesta",  value: profile.responseTime,            color: "teal"   },
            { icon: Award,       label: "Miembro desde",     value: profile.memberSince,             color: "orange" },
            { icon: Leaf,        label: "Certificaciones",   value: profile.certifications.length,   color: "green"  },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-cream-dark shadow-card">
              <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${stat.color === "green" ? "bg-green-primary/10" : stat.color === "orange" ? "bg-orange-brand/10" : "bg-teal-brand/10"}`}>
                <stat.icon size={16} className={stat.color === "green" ? "text-green-primary" : stat.color === "orange" ? "text-orange-brand" : "text-teal-brand"}/>
              </div>
              <div className="font-display font-bold text-earth-dark text-lg">{stat.value}</div>
              <div className="font-body text-earth-tan text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Description + Specialty */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-cream-dark shadow-card">
            <h3 className="font-display font-bold text-earth-dark text-lg mb-3">Sobre este productor</h3>
            <p className="font-body text-earth-tan text-sm leading-relaxed">{profile.description}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-cream-dark shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-green-primary"/>
                <span className="font-body text-earth-tan text-xs font-semibold uppercase tracking-wider">Especialidad</span>
              </div>
              <p className="font-body font-semibold text-earth-dark text-sm">{profile.specialty}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-cream-dark shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-orange-brand"/>
                <span className="font-body text-earth-tan text-xs font-semibold uppercase tracking-wider">Certificaciones</span>
              </div>
              <div className="space-y-2">
                {profile.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 bg-green-primary/8 rounded-xl px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-primary flex-shrink-0"/>
                    <span className="font-body text-green-primary text-xs font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Family & farm photo gallery */}
        <GallerySection profile={profile}/>

        {/* Products */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.28 }}>
          <div className="flex items-center gap-2 mb-4">
            <Truck size={17} className="text-green-primary"/>
            <h3 className="font-display font-bold text-earth-dark text-lg">Productos disponibles</h3>
            <span className="badge bg-green-primary/10 text-green-primary text-xs">{producerProducts.length}</span>
          </div>

          {producerProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {producerProducts.map((product, i) => {
                const c = categoryColors[product.category] || categoryColors.Verduras;
                const emoji = emojiMap[product.category] || "🌿";
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl overflow-hidden border border-cream-dark shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-32 flex items-center justify-center" style={{ backgroundColor: product.color + "18" }}>
                      <div className="text-5xl select-none" style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.12))" }}>{emoji}</div>
                      <div className="absolute top-2 left-2 bg-white/95 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-primary"/>
                        <span className="font-body text-green-primary text-xs font-medium">{product.freshnessBadge}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className={`badge ${c.bg} ${c.text} mb-2 text-xs`}>{product.category}</div>
                      <h4 className="font-body font-semibold text-earth-dark text-sm mb-1">{product.name}</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin size={11} className="text-earth-tan flex-shrink-0"/>
                        <span className="font-body text-earth-tan text-xs">{product.origin}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="font-display font-bold text-earth-dark text-lg">${product.pricePerKg.toFixed(2)}</span>
                          <span className="font-body text-earth-tan text-xs ml-1">/kg</span>
                        </div>
                        <div className="font-body text-earth-tan text-xs">{product.available.toLocaleString("es-MX")} kg</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-cream-dark">
              <div className="text-4xl mb-3">🌱</div>
              <p className="font-body text-earth-tan text-sm">No hay productos disponibles actualmente</p>
            </div>
          )}
        </motion.div>

        {/* Delivery info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.33 }}
          className="bg-gradient-to-r from-teal-brand/8 to-green-primary/8 border border-teal-brand/18 rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-brand/15 flex items-center justify-center flex-shrink-0">
            <Truck size={19} className="text-teal-brand"/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-body font-semibold text-earth-dark text-sm">Entrega con Correcaminos</div>
            <div className="font-body text-earth-tan text-xs">Logística optimizada con cadena de frío. Entrega en 24h para Puebla y CDMX.</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
