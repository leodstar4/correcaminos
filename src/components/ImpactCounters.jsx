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
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = iconMap[stat.icon];
  const count = useCounter(stat.value, 2000, stat.decimals, isInView);

  const colorMap = {
    teal: { bg: "bg-teal-brand/10", icon: "text-teal-brand", border: "border-teal-brand/20" },
    orange: { bg: "bg-orange-brand/10", icon: "text-orange-brand", border: "border-orange-brand/20" },
    green: { bg: "bg-green-primary/10", icon: "text-green-primary", border: "border-green-primary/20" },
  };

  const c = colorMap[stat.color] || colorMap.teal;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-white rounded-3xl p-6 md:p-8 border ${c.border} shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4`}>
        <Icon size={22} className={c.icon} strokeWidth={1.8}/>
      </div>

      {/* Number */}
      <div className="font-display font-bold text-earth-dark mb-1" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1 }}>
        {stat.prefix || ""}
        {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count).toLocaleString("es-MX")}
        {stat.suffix && (
          <span className="text-teal-brand ml-1 text-2xl">{stat.suffix}</span>
        )}
      </div>

      {/* Label */}
      <p className="font-body text-earth-brown text-sm font-medium">
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
      style={{ background: "linear-gradient(160deg, #1E4F3A 0%, #2A6B4F 40%, #1A8A7B 100%)" }}
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none"/>
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-orange-brand/10 blur-2xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-orange-brand animate-pulse"/>
            <span className="font-body text-cream/90 text-xs font-semibold tracking-wide uppercase">
              Impacto real
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl text-cream mb-4 leading-tight"
          >
            Números que transforman
            <br />
            <span className="text-teal-light italic">el campo mexicano</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-cream/70 text-lg max-w-xl mx-auto"
          >
            Cada número representa una familia que recibe un precio justo por su trabajo
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i}/>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-display italic text-cream/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            "El campo mexicano alimenta al país. Es hora de que el país le devuelva la dignidad al campo."
          </p>
          <p className="font-body text-cream/50 text-sm mt-3">— Fundadores de Correcaminos</p>
        </motion.div>
      </div>
    </section>
  );
}
