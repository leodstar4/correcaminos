import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Shield, TrendingUp } from "lucide-react";

const floatingStats = [
  { value: "+40%", label: "más ganancias", color: "bg-white", textColor: "text-green-primary", delay: 0 },
  { value: "24h", label: "entrega garantizada", color: "bg-orange-brand", textColor: "text-white", delay: 0.6 },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg"/>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-24 right-8 w-72 h-72 rounded-full bg-teal-brand/15 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-36 left-8 w-96 h-96 rounded-full bg-orange-brand/10 blur-3xl pointer-events-none"/>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-orange-brand animate-pulse"/>
              <span className="font-body text-cream/85 text-xs font-medium tracking-wider">
                PUEBLA, MÉXICO · IMPACT LAB
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-cream leading-[1.04] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              Del campo a
              <br />
              <em className="text-orange-brand not-italic">tu mesa,</em>
              <br />
              <span className="text-teal-light">sin intermediarios</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="font-body text-cream/75 text-lg leading-relaxed mb-9 max-w-md"
            >
              Conectamos productores del campo con compradores directamente.{" "}
              <strong className="text-orange-light font-semibold">
                Más dinero para quien trabaja la tierra.
              </strong>{" "}
              Producto más fresco para quien lo compra.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/productor")}
                className="group flex items-center justify-center gap-2 bg-orange-brand hover:bg-orange-dark text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-orange hover:-translate-y-0.5 active:scale-95 text-base"
              >
                Soy Productor
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
              </button>
              <button
                onClick={() => navigate("/comprador")}
                className="group flex items-center justify-center gap-2 glass text-cream hover:bg-white/20 font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-base"
              >
                Soy Comprador
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-8 justify-center lg:justify-start"
            >
              {[
                { icon: TrendingUp, text: "142 productores activos" },
                { icon: Shield, text: "Sin comisiones ocultas" },
                { icon: Zap, text: "6 estados de México" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon size={12} className="text-teal-light opacity-80"/>
                  <span className="font-body text-cream/60 text-xs">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative flex items-center justify-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-teal-brand/20 blur-3xl"/>
            </div>

            {/* Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 glass rounded-3xl p-5 shadow-2xl max-w-xs w-full mx-auto"
            >
              <img
                src="/logo.jpeg"
                alt="Correcaminos"
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="eager"
              />

              {/* Floating chips */}
              {floatingStats.map(({ value, label, color, textColor, delay }, i) => (
                <motion.div
                  key={value}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
                  className={`absolute ${i === 0 ? "-top-4 -left-5" : "-bottom-4 -right-5"} ${color} rounded-2xl shadow-lg px-4 py-2.5 text-center min-w-[90px]`}
                >
                  <div className={`font-display font-bold text-xl ${textColor} leading-none`}>{value}</div>
                  <div className={`font-body text-xs mt-0.5 ${textColor === "text-white" ? "text-white/75" : "text-earth-tan"}`}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Field landscape */}
      <div className="relative z-10 w-full -mb-px" style={{ height: "130px" }}>
        <svg viewBox="0 0 1440 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 100 C200 75, 400 110, 600 88 C800 66, 1000 100, 1200 80 C1320 68, 1380 90, 1440 80 L1440 130 L0 130Z" fill="#1E4F3A" opacity="0.9"/>
          <path d="M0 112 C150 94, 350 118, 550 100 C750 82, 950 115, 1150 95 C1300 82, 1380 105, 1440 95 L1440 130 L0 130Z" fill="#2A6B4F" opacity="0.85"/>
          <path d="M0 122 C250 108, 500 126, 750 115 C1000 104, 1250 122, 1440 112 L1440 130 L0 130Z" fill="#F5F0E8"/>
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#como-funciona"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer"
      >
        <span className="font-body text-cream/40 text-xs tracking-wider">DESCUBRE MÁS</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={16} className="text-cream/30"/>
        </motion.div>
      </motion.a>
    </section>
  );
}
