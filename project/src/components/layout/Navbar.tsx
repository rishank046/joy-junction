import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/real/logo-transparent.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/attractions", label: "Attractions" },
    { href: "/birthday", label: "Birthday & Events" },
    { href: "/offers", label: "Offers" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <img
                src={logo}
                alt="Joy Junction"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className={`font-extrabold text-xl md:text-2xl tracking-tight ${scrolled ? 'text-foreground' : 'text-white drop-shadow-sm md:text-foreground'}`}>
                Joy Junction
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : scrolled 
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                        : "text-white/90 hover:text-white hover:bg-white/10 md:text-muted-foreground md:hover:text-foreground md:hover:bg-muted"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 font-bold">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-foreground' : 'text-white md:text-foreground'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden absolute top-full left-0 right-0"
          >
            <nav className="flex flex-col py-4 px-4 gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`px-4 py-3 rounded-xl text-base font-medium ${
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
              <div className="pt-4 pb-2">
                <Link href="/contact">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full py-6 text-lg font-bold">
                    Book Now
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
