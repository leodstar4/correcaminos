import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp, ShieldCheck, CreditCard, Truck,
  Leaf, Search, Tag, Clock, ArrowRight
} from "lucide-react";

const productorProps = [
  { icon: TrendingUp, text: "Gana hasta 40% más por tu cosecha, directo al bolsillo" },
  { icon: ShieldCheck, text: "Sin coyotes ni regateo. Precios justos garantizados siempre" },
  { icon: CreditCard, text: "Pago seguro y puntual, sin esperar meses por tu dinero" },
  { icon: Truck, text: "Acompañamiento logístico completo, de inicio a fin" },
];

const compradorProps = [
  { icon: Leaf, text: "Producto más fresco que en cualquier mercado intermediario" },
  { icon: Search, text: "Trazabilidad completa: sabes exactamente quién lo cultivó" },
  { icon: Tag, text: "Precios justos y transparentes, sin sorpresas en la factura" },
  { icon: Clock, text: "Entrega garantizada y puntual con cadena de frío certificada" },
];

function PropItem({ item, index, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dark ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-start gap-4"
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
        dark ? "bg-white/12" : "bg-orange-brand/12"
      }`}>
        <item.icon size={18} className={dark ? "text-cream" : "text-orange-brand"} strokeWidth={1.8}/>
      </div>
      <p className={`font-body text-sm leading-relaxed pt-2 ${dark ? "text-cream/85" : "text-earth-dark"}`}>
        {item.text}
      </p>
    </motion.div>
  );
}

export default function ValueProps() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-primary/4 blur-3xl pointer-events-none"/>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-brand/4 blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-primary/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-primary"/>
            <span className="font-body text-green-primary text-xs font-semibold tracking-widest uppercase">
              Win-Win
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-4"
          >
            Beneficios para todos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Una plataforma justa que redistribuye el valor a quienes más lo merecen
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Productores */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-br from-green-dark via-green-primary to-teal-brand rounded-3xl p-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3"/>
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-teal-brand/25 translate-y-1/3 -translate-x-1/3 blur-xl"/>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">🌾</div>
                <div>
                  <div className="font-body text-cream/60 text-xs font-medium tracking-widest uppercase">Para</div>
                  <div className="font-display font-bold text-cream text-xl">Productores</div>
                </div>
              </div>

              <div className="space-y-5">
                {productorProps.map((item, i) => (
                  <PropItem key={i} item={item} index={i} dark/>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/12">
                <button
                  onClick={() => navigate("/productor")}
                  className="group inline-flex items-center gap-2 bg-white text-green-primary font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-cream transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  Registrar mi cosecha
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1"/>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Compradores */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-8 overflow-hidden border border-cream-darker"
          >
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-orange-brand/8 -translate-y-1/3 translate-x-1/3"/>
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-teal-brand/8 translate-y-1/3 -translate-x-1/3 blur-xl"/>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-brand/14 flex items-center justify-center text-2xl">🛒</div>
                <div>
                  <div className="font-body text-earth-tan text-xs font-medium tracking-widest uppercase">Para</div>
                  <div className="font-display font-bold text-earth-dark text-xl">Compradores</div>
                </div>
              </div>

              <div className="space-y-5">
                {compradorProps.map((item, i) => (
                  <PropItem key={i} item={item} index={i} dark={false}/>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-cream-darker">
                <button
                  onClick={() => navigate("/comprador")}
                  className="group inline-flex items-center gap-2 bg-orange-brand text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-orange-dark transition-all duration-200 shadow-orange hover:-translate-y-0.5 active:scale-95"
                >
                  Explorar productos
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1"/>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
