import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const BirdSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Body */}
    <ellipse cx="95" cy="52" rx="48" ry="22" fill="#2A6B4F" opacity="0.9"/>
    {/* Wing upper */}
    <path d="M60 42 C50 28, 30 22, 10 30 C25 34, 42 38, 55 48Z" fill="#1A8A7B"/>
    {/* Wing lower */}
    <path d="M68 56 C55 68, 38 72, 18 65 C32 60, 50 58, 65 52Z" fill="#3D8B65"/>
    {/* Tail feathers */}
    <path d="M47 50 C30 46, 12 40, 0 44 C10 50, 28 50, 46 54Z" fill="#2A6B4F"/>
    <path d="M47 53 C28 52, 10 48, 0 54 C12 58, 30 56, 46 56Z" fill="#1A8A7B" opacity="0.8"/>
    {/* Head */}
    <circle cx="134" cy="42" r="18" fill="#1A8A7B"/>
    {/* Crest feathers */}
    <path d="M130 26 C132 18, 136 12, 138 8" stroke="#3D8B65" strokeWidth="3" strokeLinecap="round"/>
    <path d="M135 24 C138 16, 143 10, 146 6" stroke="#E07B20" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M127 28 C128 20, 130 14, 130 10" stroke="#2A6B4F" strokeWidth="2" strokeLinecap="round"/>
    {/* Eye */}
    <circle cx="140" cy="40" r="5" fill="white"/>
    <circle cx="141" cy="40" r="3" fill="#1C1C1C"/>
    <circle cx="142" cy="39" r="1" fill="white"/>
    {/* Beak */}
    <path d="M148 44 L168 42 L152 48Z" fill="#E07B20"/>
    {/* Legs running */}
    <path d="M100 72 L92 88 L86 88" stroke="#E07B20" strokeWidth="3" strokeLinecap="round"/>
    <path d="M108 70 L110 90 L104 90 M110 90 L116 90" stroke="#E07B20" strokeWidth="3" strokeLinecap="round"/>
    {/* Speed lines */}
    <path d="M10 38 L30 38" stroke="rgba(224,123,32,0.5)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 50 L22 50" stroke="rgba(224,123,32,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 62 L20 62" stroke="rgba(224,123,32,0.3)" strokeWidth="1" strokeLinecap="round"/>
    {/* Orange chest accent */}
    <ellipse cx="118" cy="54" rx="14" ry="10" fill="#E07B20" opacity="0.7"/>
    {/* Arrow on body */}
    <path d="M80 52 L105 48 L100 44 M105 48 L100 52" stroke="rgba(224,123,32,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FieldSVG = () => (
  <svg viewBox="0 0 1440 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
    {/* Sky gradient layer */}
    <rect width="1440" height="280" fill="url(#skyGrad)"/>
    {/* Mountain ranges */}
    <path d="M0 200 L120 120 L240 170 L380 90 L520 150 L650 80 L780 130 L900 70 L1040 130 L1160 100 L1300 140 L1440 110 L1440 280 L0 280Z"
      fill="rgba(255,255,255,0.05)"/>
    <path d="M0 220 L180 150 L320 190 L480 130 L620 170 L760 110 L900 150 L1060 120 L1200 160 L1350 130 L1440 150 L1440 280 L0 280Z"
      fill="rgba(255,255,255,0.06)"/>
    {/* Fields - rolling hills */}
    <path d="M0 240 C200 210, 400 250, 600 225 C800 200, 1000 240, 1200 218 C1320 210, 1380 230, 1440 220 L1440 280 L0 280Z"
      fill="#1E4F3A" opacity="0.9"/>
    <path d="M0 255 C150 235, 350 265, 550 245 C750 225, 950 260, 1150 240 C1300 228, 1380 248, 1440 238 L1440 280 L0 280Z"
      fill="#2A6B4F" opacity="0.8"/>
    <path d="M0 268 C250 252, 500 272, 750 260 C1000 248, 1250 268, 1440 256 L1440 280 L0 280Z"
      fill="#3D8B65" opacity="0.7"/>
    {/* Field rows */}
    {[0,1,2,3,4,5,6,7,8].map((i) => (
      <line key={i}
        x1={i * 180} y1="280"
        x2={i * 180 + 80} y2="245"
        stroke="rgba(255,255,255,0.06)" strokeWidth="60"/>
    ))}
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A8A7B" stopOpacity="0"/>
        <stop offset="100%" stopColor="#1E4F3A" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg">
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-teal-brand/10 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-orange-brand/8 blur-3xl pointer-events-none"/>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-orange-brand animate-pulse"/>
              <span className="font-body text-cream/90 text-xs font-medium tracking-wide">
                Puebla, México · Impact Lab
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[1.05] tracking-tight mb-6"
            >
              Del campo a
              <br />
              <span className="text-orange-brand italic">tu mesa,</span>
              <br />
              <span className="text-teal-light">sin intermediarios</span>
              <br />
              abusivos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-cream/80 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Conectamos productores del campo con compradores directamente.{" "}
              <strong className="text-orange-light font-semibold">
                Más dinero para el que trabaja la tierra.
              </strong>{" "}
              Producto más fresco para quien lo compra.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/productor")}
                className="group flex items-center justify-center gap-2 bg-orange-brand hover:bg-orange-dark text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-orange hover:-translate-y-0.5 text-base"
              >
                Soy Productor
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </button>
              <button
                onClick={() => navigate("/comprador")}
                className="group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-cream/40 text-cream hover:bg-white/20 font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 text-base"
              >
                Soy Comprador
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-8 justify-center lg:justify-start"
            >
              {[
                "142 productores activos",
                "6 estados de México",
                "Sin comisiones ocultas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-light"/>
                  <span className="font-body text-cream/70 text-xs">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Animated Bird */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Glow behind bird */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-teal-brand/20 blur-3xl"/>
            </div>

            {/* Logo Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto"
            >
              <img
                src="/logo.jpeg"
                alt="Correcaminos Logo"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-card px-4 py-2.5 text-center"
              >
                <div className="font-display font-bold text-green-primary text-xl">+40%</div>
                <div className="font-body text-earth-brown text-xs">más ganancias</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -bottom-4 -right-4 bg-orange-brand rounded-2xl shadow-orange px-4 py-2.5 text-center"
              >
                <div className="font-display font-bold text-white text-xl">24h</div>
                <div className="font-body text-white/80 text-xs">entrega garantizada</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Field landscape at bottom */}
      <div className="relative z-10 w-full -mb-1" style={{ height: "140px" }}>
        <FieldSVG />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="font-body text-cream/50 text-xs">Descubre más</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-cream/40"/>
        </motion.div>
      </motion.div>
    </section>
  );
}
