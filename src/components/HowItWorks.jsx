import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Truck, ShoppingBasket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Registra tu cosecha",
    description:
      "El productor sube su cosecha disponible: tipo de producto, cantidad, fecha de cosecha y precio sugerido. Todo desde el celular.",
    color: "green-primary",
    bgColor: "bg-green-primary",
    lightBg: "bg-green-primary/10",
    who: "Productor",
    whoColor: "text-green-primary",
  },
  {
    number: "02",
    icon: Truck,
    title: "Nosotros nos encargamos",
    description:
      "Correcaminos verifica la calidad, coordina la logística de transporte en frío y garantiza la frescura del producto.",
    color: "teal-brand",
    bgColor: "bg-teal-brand",
    lightBg: "bg-teal-brand/10",
    who: "Correcaminos",
    whoColor: "text-teal-brand",
  },
  {
    number: "03",
    icon: ShoppingBasket,
    title: "Recibe producto fresco",
    description:
      "El comprador recibe el producto verificado, con trazabilidad completa y la garantía de frescura de Correcaminos.",
    color: "orange-brand",
    bgColor: "bg-orange-brand",
    lightBg: "bg-orange-brand/10",
    who: "Comprador",
    whoColor: "text-orange-brand",
  },
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Step number accent */}
      <div className={`absolute -top-3 -left-3 font-display font-bold text-6xl text-gray-100 leading-none select-none pointer-events-none`}>
        {step.number}
      </div>

      {/* Icon container */}
      <div className={`relative z-10 w-20 h-20 rounded-2xl ${step.lightBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        <step.icon size={34} className={`${step.whoColor}`} strokeWidth={1.8}/>
      </div>

      {/* Who label */}
      <span className={`badge ${step.lightBg} ${step.whoColor} mb-3 font-semibold`}>
        {step.who}
      </span>

      <h3 className="font-display font-bold text-xl text-earth-dark mb-3 leading-tight">
        {step.title}
      </h3>
      <p className="font-body text-earth-brown text-sm leading-relaxed max-w-xs">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-brand/5 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-primary/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-primary"/>
            <span className="font-body text-green-primary text-xs font-semibold tracking-wide uppercase">
              Sin complicaciones
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-4"
          >
            Así funciona Correcaminos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle max-w-2xl mx-auto"
          >
            Tres pasos simples eliminan décadas de abusos en la cadena de suministro agrícola
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-primary via-teal-brand to-orange-brand opacity-20"/>

          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <StepCard step={step} index={i}/>
              {/* Arrow between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-6 top-10 items-center justify-center z-20">
                  <ArrowRight size={20} className="text-cream-darker"/>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-green-primary/8 border border-green-primary/20 rounded-2xl px-8 py-4">
            <div className="w-2 h-2 rounded-full bg-teal-brand"/>
            <p className="font-body text-green-primary text-sm font-medium">
              Cadena de frío garantizada · Pago seguro · Soporte 7 días a la semana
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
