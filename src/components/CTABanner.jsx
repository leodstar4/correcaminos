import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sprout, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(140deg, #1E4F3A 0%, #2A6B4F 30%, #1A8A7B 65%, #c0661a 100%)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none"/>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-orange-brand/20 blur-2xl pointer-events-none"/>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-14 md:py-16 text-center">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
              <Sprout size={26} className="text-cream"/>
            </div>

            <h2 className="font-display font-bold text-cream mb-5 leading-tight" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
              Únete a la red que le devuelve
              <br />
              <em className="text-orange-light not-italic">el poder al campo</em>
            </h2>

            <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Más de 142 productores y 38 compradores ya forman parte de la revolución
              logística del campo mexicano. Sin costos de entrada.
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-1.5 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-orange-brand text-orange-brand"/>
              ))}
              <span className="font-body text-cream/60 text-sm ml-2">4.9 de 5 promedio</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/productor")}
                className="group flex items-center justify-center gap-2 bg-white text-green-primary font-body font-semibold px-8 py-4 rounded-full hover:bg-cream transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 text-base"
              >
                Registrarse gratis
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
              </button>
              <button
                onClick={() => navigate("/comprador")}
                className="group flex items-center justify-center gap-2 bg-orange-brand text-white font-body font-semibold px-8 py-4 rounded-full hover:bg-orange-dark transition-all duration-200 hover:-translate-y-0.5 shadow-orange active:scale-95 text-base"
              >
                Explorar productos
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
              </button>
            </div>

            <p className="font-body text-cream/35 text-xs mt-6 tracking-wide">
              Sin comisiones ocultas · Sin contratos a largo plazo · Soporte en español
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
