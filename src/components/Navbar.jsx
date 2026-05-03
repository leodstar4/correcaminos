import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-cream-dark"
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
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            <div className="hidden sm:block">
              <div
                className={`font-display font-bold text-lg leading-none tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-green-primary" : "text-cream"
                }`}
              >
                CORRECAMINOS
              </div>
              <div
                className={`font-body text-xs transition-colors duration-300 ${
                  scrolled ? "text-earth-tan" : "text-cream/70"
                }`}
              >
                Logística Sostenible para el Campo
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Cómo funciona", "Impacto", "Contacto"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-").replace("ó", "o")}`}
                className={`font-body text-sm font-medium transition-colors duration-200 hover:text-orange-brand ${
                  scrolled ? "text-earth-dark" : "text-cream/90"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/productor")}
              className={`font-body text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 border-2 ${
                scrolled
                  ? "border-green-primary text-green-primary hover:bg-green-primary hover:text-cream"
                  : "border-cream/60 text-cream hover:bg-cream/10"
              }`}
            >
              Soy Productor
            </button>
            <button
              onClick={() => navigate("/comprador")}
              className="btn-primary text-sm"
            >
              Soy Comprador
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-green-primary" : "text-cream"
            }`}
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-cream-dark overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {["Cómo funciona", "Impacto", "Contacto"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body text-sm text-earth-dark py-2 hover:text-green-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-cream-dark">
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
