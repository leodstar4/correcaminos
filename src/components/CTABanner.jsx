import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1E4F3A 0%, #2A6B4F 35%, #1A8A7B 70%, #E07B20 100%)",
          }}
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none"/>
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-orange-brand/20 pointer-events-none blur-2xl"/>

          {/* Bird silhouette */}
          <motion.div
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block"
            style={{ width: 200, height: 100 }}
          >
            <svg viewBox="0 0 200 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="95" cy="52" rx="48" ry="22"/>
              <path d="M60 42 C50 28, 30 22, 10 30 C25 34, 42 38, 55 48Z"/>
              <circle cx="134" cy="42" r="18"/>
              <path d="M148 44 L168 42 L152 48Z"/>
              <path d="M100 72 L92 88 L86 88" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M108 70 L110 90 L104 90 M110 90 L116 90" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-14 md:py-16 text-center">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
              <Sprout size={28} className="text-cream"/>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cream mb-5 leading-tight">
              Únete a la red que le devuelve
              <br />
              <span className="text-orange-light italic">el poder al campo</span>
            </h2>

            <p className="font-body text-cream/75 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Más de 142 productores y 38 compradores ya forman parte de la revolución
              logística del campo mexicano. Sin costos de entrada.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/productor")}
                className="group flex items-center justify-center gap-2 bg-white text-green-primary font-body font-semibold px-8 py-4 rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-base"
              >
                <span>Registrarse gratis</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </button>
              <button
                onClick={() => navigate("/comprador")}
                className="group flex items-center justify-center gap-2 bg-orange-brand text-white font-body font-semibold px-8 py-4 rounded-full hover:bg-orange-dark transition-all duration-300 hover:-translate-y-0.5 shadow-orange text-base"
              >
                Explorar productos
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </button>
            </div>

            {/* Fine print */}
            <p className="font-body text-cream/40 text-xs mt-6">
              Sin comisiones ocultas · Sin contratos a largo plazo · Soporte en español
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
