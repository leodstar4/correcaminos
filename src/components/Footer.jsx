import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Share2, AtSign, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-earth-dark text-cream/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpeg" alt="Correcaminos" className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <div className="font-display font-bold text-cream text-sm tracking-wide">CORRECAMINOS</div>
                <div className="font-body text-cream/50 text-xs">Logística Sostenible</div>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed mb-5 text-cream/60">
              Conectando productores del campo con compradores directamente. Sin intermediarios. Desde Puebla para México.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: AtSign, label: "Instagram" },
                { icon: Share2, label: "Twitter/X" },
                { icon: Globe, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center hover:bg-teal-brand/40 transition-colors duration-200"
                >
                  <Icon size={14} className="text-cream/70"/>
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-body font-semibold text-cream text-sm mb-4">Plataforma</h4>
            <ul className="space-y-2.5">
              {["Cómo funciona", "Para productores", "Para compradores", "Trazabilidad", "Logística"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-cream/55 hover:text-orange-light transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-semibold text-cream text-sm mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {["Nosotros", "Impacto social", "Blog del campo", "Prensa", "Trabaja con nosotros"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-cream/55 hover:text-orange-light transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-cream text-sm mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-teal-brand flex-shrink-0 mt-0.5"/>
                <span className="font-body text-sm text-cream/55">
                  Puebla de Zaragoza, Puebla, México
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-teal-brand flex-shrink-0"/>
                <a href="mailto:hola@correcaminos.mx" className="font-body text-sm text-cream/55 hover:text-orange-light transition-colors">
                  hola@correcaminos.mx
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-teal-brand flex-shrink-0"/>
                <span className="font-body text-sm text-cream/55">+52 222 000 0000</span>
              </li>
            </ul>

            {/* Impact badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-green-primary/20 border border-green-primary/30 rounded-xl px-3 py-2">
              <span className="text-sm">🌱</span>
              <span className="font-body text-green-light text-xs font-medium">Impact Lab · Puebla 2024</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/35">
          <span className="font-body">© 2026 Correcaminos Humanitarian & Logistics S.A. de C.V. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            {["Privacidad", "Términos", "Cookies"].map((item) => (
              <a key={item} href="#" className="hover:text-cream/60 transition-colors font-body">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
