import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp, ShieldCheck, CreditCard, Truck,
  Leaf, Search, Tag, Clock
} from "lucide-react";

const productorProps = [
  { icon: TrendingUp, text: "Gana hasta 40% más por tu cosecha", highlight: "40% más" },
  { icon: ShieldCheck, text: "Sin coyotes, sin regateo. Precios justos garantizados", highlight: "Sin coyotes" },
  { icon: CreditCard, text: "Pago seguro y puntual, sin esperar meses", highlight: "Pago seguro" },
  { icon: Truck, text: "Acompañamiento logístico completo de inicio a fin", highlight: "Logística completa" },
];

const compradorProps = [
  { icon: Leaf, text: "Producto más fresco que en cualquier mercado intermediario", highlight: "Más fresco" },
  { icon: Search, text: "Trazabilidad completa: sabes exactamente quién lo cultivó", highlight: "Trazabilidad" },
  { icon: Tag, text: "Precios justos y transparentes. Sin sorpresas en la factura", highlight: "Precios justos" },
  { icon: Clock, text: "Entrega garantizada y puntual con cadena de frío", highlight: "Entrega garantizada" },
];

function PropCard({ item, index, color }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const colorMap = {
    green: {
      iconBg: "bg-green-primary/10",
      iconColor: "text-green-primary",
      dot: "bg-green-primary",
    },
    orange: {
      iconBg: "bg-orange-brand/10",
      iconColor: "text-orange-brand",
      dot: "bg-orange-brand",
    },
  };

  const c = colorMap[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: color === "green" ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 group"
    >
      <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
        <item.icon size={20} className={c.iconColor} strokeWidth={1.8}/>
      </div>
      <div className="pt-0.5">
        <p className="font-body text-earth-dark text-sm leading-relaxed">
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ValueProps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-green-primary/4 blur-3xl pointer-events-none"/>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-brand/4 blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title mb-4"
          >
            Beneficios para todos en la cadena
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Una plataforma justa que redistribuye el valor a quienes más lo merecen
          </motion.p>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Productores card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gradient-to-br from-green-primary to-green-dark rounded-3xl p-8 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"/>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-teal-brand/20 translate-y-1/2 -translate-x-1/2"/>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <div className="font-body text-cream/70 text-xs font-medium tracking-wider uppercase">Para</div>
                  <div className="font-display font-bold text-cream text-xl">Productores</div>
                </div>
              </div>

              {/* Props list */}
              <div className="space-y-5">
                {productorProps.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
                      <item.icon size={18} className="text-cream" strokeWidth={1.8}/>
                    </div>
                    <p className="font-body text-cream/90 text-sm leading-relaxed pt-1.5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/15">
                <button className="font-body font-semibold text-sm bg-white text-green-primary px-6 py-3 rounded-full hover:bg-cream transition-colors duration-200 hover:-translate-y-0.5 transform">
                  Registrar mi cosecha →
                </button>
              </div>
            </div>
          </motion.div>

          {/* Compradores card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-8 overflow-hidden border border-cream-darker"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-brand/8 -translate-y-1/2 translate-x-1/2"/>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-teal-brand/8 translate-y-1/2 -translate-x-1/2"/>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-brand/15 flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <div className="font-body text-earth-tan text-xs font-medium tracking-wider uppercase">Para</div>
                  <div className="font-display font-bold text-earth-dark text-xl">Compradores</div>
                </div>
              </div>

              {/* Props list */}
              <div className="space-y-5">
                {compradorProps.map((item, i) => (
                  <PropCard key={i} item={item} index={i} color="orange"/>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-cream-darker">
                <button className="font-body font-semibold text-sm bg-orange-brand text-white px-6 py-3 rounded-full hover:bg-orange-dark transition-colors duration-200 shadow-orange hover:-translate-y-0.5 transform">
                  Explorar productos →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
