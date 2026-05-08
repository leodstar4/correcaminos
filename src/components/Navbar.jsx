import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Problemática", href: "#problematica" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Impacto", href: "#impacto" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileLink = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-xl shadow-sm border-b border-cream-dark/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpeg"
              alt="Correcaminos"
              className="h-9 w-9 md:h-11 md:w-11 rounded-full object-cover shadow-sm ring-2 ring-white/30 group-hover:ring-orange-brand/40 transition-all duration-300"
            />
            <div className="hidden sm:block">
              <div className={`font-display font-bold text-base leading-none tracking-widest transition-colors duration-300 ${scrolled ? "text-green-primary" : "text-cream"}`}>
                CORRECAMINOS
              </div>
              <div className={`font-body text-xs mt-0.5 transition-colors duration-300 ${scrolled ? "text-earth-tan" : "text-cream/60"}`}>
                Logística Sostenible
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`font-body text-sm font-medium transition-colors duration-200 hover:text-orange-brand relative group ${
                  scrolled ? "text-earth-dark" : "text-cream/85"
                }`}
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-brand transition-all duration-300 group-hover:w-full"/>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => navigate("/productor")}
              className={`font-body text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 border-2 ${
                scrolled
                  ? "border-green-primary text-green-primary hover:bg-green-primary hover:text-white"
                  : "border-cream/50 text-cream hover:bg-white/10 hover:border-cream"
              }`}
            >
              Soy Productor
            </button>
            <button
              onClick={() => navigate("/comprador")}
              className="bg-orange-brand text-white font-body text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-dark hover:shadow-orange transition-all duration-200"
            >
              Soy Comprador
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              scrolled ? "text-green-primary hover:bg-cream-dark" : "text-cream hover:bg-white/10"
            }`}
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-cream-dark overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleMobileLink(href)}
                  className="w-full text-left font-body text-sm text-earth-dark py-3 px-3 rounded-xl hover:bg-cream hover:text-green-primary transition-colors font-medium"
                >
                  {label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-cream-dark">
                <button
                  onClick={() => { navigate("/productor"); setMenuOpen(false); }}
                  className="btn-outline text-sm w-full"
                >
                  Soy Productor
                </button>
                <button
                  onClick={() => { navigate("/comprador"); setMenuOpen(false); }}
                  className="btn-primary text-sm w-full"
                >
                  Soy Comprador
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
