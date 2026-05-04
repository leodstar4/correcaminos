import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, DollarSign, ShoppingBag, MapPin } from "lucide-react";
import { impactStats } from "../data/mockStats";

const iconMap = { Users, DollarSign, ShoppingBag, MapPin };

function useCounter(target, duration, decimals, shouldStart) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(decimals || 0)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [shouldStart, target, duration, decimals]);

  return count;
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = iconMap[stat.icon];
  const count = useCounter(stat.value, 1800, stat.decimals, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-6 md:p-8 text-center hover:bg-white/15 transition-colors duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5">
        <Icon size={22} className="text-cream" strokeWidth={1.6}/>
      </div>

      <div className="font-display font-bold text-cream mb-2" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1 }}>
        {stat.prefix || ""}
        {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count).toLocaleString("es-MX")}
        {stat.suffix && <span className="text-teal-light ml-1" style={{ fontSize: "60%" }}>{stat.suffix}</span>}
      </div>

      <p className="font-body text-cream/65 text-sm font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function ImpactCounters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="impacto" className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #1E4F3A 0%, #2A6B4F 45%, #1A8A7B 100%)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/4 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-orange-brand/12 blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-orange-brand animate-pulse"/>
            <span className="font-body text-cream/85 text-xs font-semibold tracking-widest uppercase">
              Impacto real
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cream mb-4 leading-tight"
          >
            Números que transforman
            <br />
            <em className="text-teal-light not-italic">el campo mexicano</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-body text-cream/60 text-lg max-w-xl mx-auto"
          >
            Cada número representa una familia que recibe un precio justo por su trabajo
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i}/>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center border-t border-white/10 pt-12"
        >
          <p className="font-display italic text-cream/75 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            "El campo mexicano alimenta al país. Es hora de que el país le devuelva la dignidad al campo."
          </p>
          <p className="font-body text-cream/40 text-sm mt-4">— Fundadores de Correcaminos</p>
        </motion.div>
      </div>
    </section>
  );
}
