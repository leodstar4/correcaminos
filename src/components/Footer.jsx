import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, AtSign, Share2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-earth-dark text-cream/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-14 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.jpeg" alt="Correcaminos" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"/>
              <div>
                <div className="font-display font-bold text-cream text-sm tracking-widest">CORRECAMINOS</div>
                <div className="font-body text-cream/40 text-xs mt-0.5">Logística Sostenible</div>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed mb-5 text-cream/50">
              Conectando productores del campo con compradores directamente. Sin intermediarios. Desde Puebla para México.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: AtSign, label: "Instagram" },
                { Icon: Share2, label: "Twitter/X" },
                { Icon: Globe, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center hover:bg-teal-brand/50 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} className="text-cream/60"/>
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-body font-semibold text-cream text-sm mb-4 tracking-wide">Plataforma</h4>
            <ul className="space-y-2.5">
              {["Cómo funciona", "Para productores", "Para compradores", "Trazabilidad", "Logística"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-cream/45 hover:text-orange-light transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-semibold text-cream text-sm mb-4 tracking-wide">Empresa</h4>
            <ul className="space-y-2.5">
              {["Nosotros", "Impacto social", "Blog del campo", "Prensa", "Trabaja con nosotros"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-cream/45 hover:text-orange-light transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-cream text-sm mb-4 tracking-wide">Contacto</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-teal-brand flex-shrink-0 mt-0.5"/>
                <span className="font-body text-sm text-cream/50">
                  Puebla de Zaragoza, Puebla, México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-teal-brand flex-shrink-0"/>
                <a href="mailto:hola@correcaminos.mx" className="font-body text-sm text-cream/50 hover:text-orange-light transition-colors">
                  hola@correcaminos.mx
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-teal-brand flex-shrink-0"/>
                <span className="font-body text-sm text-cream/50">+52 222 000 0000</span>
              </li>
            </ul>

            <div className="mt-5 inline-flex items-center gap-2 bg-green-primary/15 border border-green-primary/25 rounded-xl px-3.5 py-2">
              <span className="text-sm">🌱</span>
              <span className="font-body text-green-light text-xs font-medium">Impact Lab · Puebla 2024</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body text-xs text-cream/30">
            © 2026 Correcaminos Humanitarian & Logistics S.A. de C.V.
          </span>
          <div className="flex gap-5">
            {["Privacidad", "Términos", "Cookies"].map((item) => (
              <a key={item} href="#" className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
