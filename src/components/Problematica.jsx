import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const dolores = [
  {
    roman: "I",
    title: "Asimetría de poder",
    stat: "64%",
    statLabel: "del valor capturado por el coyote",
    body: "El intermediario no transforma el producto. Su poder es estructural: compra a $20/manojo y revende a $55 al mayorista porque es el único actor con camioneta y red de contactos.",
    borderColor: "border-green-primary/40",
    romanColor: "text-green-primary",
    statColor: "text-green-primary",
  },
  {
    roman: "II",
    title: "Atomización productiva",
    stat: "56.2%",
    statLabel: "de productores con parcelas menores a 0.5 ha",
    body: "Cosechas familiares de ~570 manojos/ciclo. El flete individual (~$1,400 por viaje) elimina el margen por completo. Sin coordinación no hay escala viable.",
    borderColor: "border-teal-brand/40",
    romanColor: "text-teal-brand",
    statColor: "text-teal-brand",
  },
  {
    roman: "III",
    title: "Desconexión con demanda premium",
    stat: "$130",
    statLabel: "máximo por manojo en temporada baja (SNIIM)",
    body: "Restaurantes en Cholula y Angelópolis pagan entre $55 y $130/manojo y necesitan suministro estable, trazable y de calidad consistente. El coyote no puede garantizarlo.",
    borderColor: "border-orange-brand/40",
    romanColor: "text-orange-brand",
    statColor: "text-orange-brand",
  },
];

export default function Problematica() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section
      id="problematica"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full bg-green-primary/4 blur-3xl pointer-events-none -translate-y-1/3 -translate-x-1/4" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal-brand/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Eyebrow + Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-body text-xs font-semibold tracking-[0.18em] uppercase text-earth-tan">
              00 · Problemática
            </span>
            <span className="w-8 h-px bg-earth-tan/35" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="section-title mb-5"
          >
            Una falla de mercado,
            <br />
            <em className="not-italic text-teal-brand">no una falla del productor</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="section-subtitle"
          >
            Puebla produce el{" "}
            <strong className="text-earth-dark font-semibold">41% del cilantro nacional</strong>,
            pero la cadena de valor está capturada por un cuello de botella logístico.
            Los ~60 km entre parcela y restaurante valen más, en márgenes capturados, que la cosecha misma.
          </motion.p>
        </div>

        {/* Three pain points */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {dolores.map((d, i) => (
            <motion.div
              key={d.roman}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-cream rounded-3xl p-7 border-l-4 ${d.borderColor} shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Roman numeral watermark */}
              <div
                className={`font-display font-bold text-5xl ${d.romanColor} opacity-25 leading-none mb-4 select-none`}
              >
                {d.roman}
              </div>

              {/* Stat */}
              <div
                className={`font-display font-bold ${d.statColor} mb-1`}
                style={{ fontSize: "clamp(1.9rem, 3vw, 2.4rem)", lineHeight: 1 }}
              >
                {d.stat}
              </div>
              <div className="font-body text-earth-tan text-xs font-medium tracking-wide uppercase mb-4">
                {d.statLabel}
              </div>

              <h3 className="font-display font-bold text-earth-dark text-lg mb-3 leading-tight">
                {d.title}
              </h3>
              <p className="font-body text-earth-tan text-sm leading-relaxed">
                {d.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl border-l-4 border-green-primary pl-8 py-2 mb-16"
        >
          <blockquote>
            <p className="font-display italic text-earth-dark text-xl md:text-2xl leading-relaxed mb-4">
              "El 56.2% de las unidades productivas en Los Reyes de Juárez tienen superficies
              menores a media hectárea, con base laboral familiar y sin infraestructura de
              transporte propia."
            </p>
          </blockquote>
          <figcaption>
            <cite className="font-body text-earth-tan text-sm not-italic">
              Estudio UNAM / Scielo · n=73 · Los Reyes de Juárez, Puebla, 2018
            </cite>
          </figcaption>
        </motion.figure>

        {/* Transition to next section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-5"
        >
          <p className="font-body text-earth-tan text-sm">
            Esta brecha estructural define una tesis clara
          </p>
          <span className="flex-1 h-px bg-earth-tan/20 max-w-xs" />
          <a
            href="#como-funciona"
            className="group inline-flex items-center gap-2 font-body text-green-primary text-sm font-semibold hover:text-teal-brand transition-colors duration-200"
          >
            01 · Ver la tesis
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
