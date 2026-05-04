import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Truck, ShoppingBasket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Registra tu cosecha",
    description: "El productor sube su cosecha: tipo de producto, cantidad, fecha y precio sugerido. Todo desde el celular en minutos.",
    who: "Productor",
    accent: "green",
    bg: "bg-green-primary/10",
    iconColor: "text-green-primary",
    pillBg: "bg-green-primary/10",
    pillText: "text-green-primary",
    borderColor: "border-green-primary/20",
  },
  {
    number: "02",
    icon: Truck,
    title: "Nosotros coordinamos",
    description: "Correcaminos verifica calidad, coordina logística con cadena de frío y garantiza la frescura del producto.",
    who: "Correcaminos",
    accent: "teal",
    bg: "bg-teal-brand/10",
    iconColor: "text-teal-brand",
    pillBg: "bg-teal-brand/10",
    pillText: "text-teal-brand",
    borderColor: "border-teal-brand/20",
  },
  {
    number: "03",
    icon: ShoppingBasket,
    title: "Recibe producto fresco",
    description: "El comprador recibe su producto verificado, con trazabilidad completa y garantía de frescura certificada.",
    who: "Comprador",
    accent: "orange",
    bg: "bg-orange-brand/10",
    iconColor: "text-orange-brand",
    pillBg: "bg-orange-brand/10",
    pillText: "text-orange-brand",
    borderColor: "border-orange-brand/20",
  },
];

export default function HowItWorks() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-brand/5 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-primary/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-primary"/>
            <span className="font-body text-green-primary text-xs font-semibold tracking-widest uppercase">
              3 pasos simples
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-4"
          >
            Así funciona Correcaminos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="section-subtitle max-w-2xl mx-auto"
          >
            Tres pasos simples eliminan décadas de abusos en la cadena de suministro agrícola
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`relative bg-white rounded-3xl p-7 border ${step.borderColor} shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Step number */}
              <div className="absolute top-6 right-6 font-display font-bold text-5xl text-gray-100 leading-none select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-5`}>
                <step.icon size={26} className={step.iconColor} strokeWidth={1.8}/>
              </div>

              {/* Who */}
              <span className={`badge ${step.pillBg} ${step.pillText} mb-3`}>
                {step.who}
              </span>

              <h3 className="font-display font-bold text-earth-dark text-xl mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="font-body text-earth-tan text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-green-primary/8 border border-green-primary/20 rounded-2xl px-8 py-4">
            <span className="w-2 h-2 rounded-full bg-teal-brand flex-shrink-0"/>
            <p className="font-body text-green-primary text-sm font-medium">
              Cadena de frío garantizada · Pago seguro · Soporte 7 días
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
