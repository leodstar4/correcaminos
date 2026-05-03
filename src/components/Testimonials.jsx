import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "../data/mockStats";

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isProductor = t.type === "productor";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-3xl p-8 overflow-hidden ${
        isProductor
          ? "bg-gradient-to-br from-green-primary/8 to-teal-brand/8 border border-green-primary/15"
          : "bg-gradient-to-br from-orange-brand/6 to-orange-light/6 border border-orange-brand/15"
      }`}
    >
      {/* Large quote mark */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote size={64} className={isProductor ? "text-green-primary" : "text-orange-brand"}/>
      </div>

      {/* Type badge */}
      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-5 ${
        isProductor ? "bg-green-primary/12 text-green-primary" : "bg-orange-brand/12 text-orange-brand"
      }`}>
        <span>{isProductor ? "🌾 Productor" : "🏪 Comprador"}</span>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map((s) => (
          <Star key={s} size={14} className="fill-orange-brand text-orange-brand"/>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-body text-earth-dark text-base leading-relaxed mb-6 relative z-10">
        "{t.quote}"
      </blockquote>

      {/* Person */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-body font-semibold text-earth-dark text-sm">{t.name}</div>
          <div className="font-body text-earth-tan text-xs">{t.role}</div>
          <div className="font-body text-earth-tan text-xs">{t.location}</div>
        </div>
        <div className="ml-auto flex-shrink-0">
          <div className={`text-xs font-medium font-body px-2.5 py-1 rounded-full ${
            isProductor ? "bg-green-primary/10 text-green-primary" : "bg-teal-brand/10 text-teal-brand"
          }`}>
            {t.years}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-brand/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-orange-brand"/>
            <span className="font-body text-orange-brand text-xs font-semibold tracking-wide uppercase">
              Voces reales
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-4"
          >
            Lo que dice nuestra comunidad
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Detrás de cada número hay una historia de dignidad y trabajo honesto
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i}/>
          ))}
        </div>

        {/* Logo watermark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-3 opacity-50">
            <img src="/logo.jpeg" alt="" className="w-8 h-8 rounded-full object-cover"/>
            <span className="font-display font-bold text-green-primary text-sm">CORRECAMINOS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
