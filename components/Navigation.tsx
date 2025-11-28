"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "AI Wingman", href: "#ai" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const navStateClasses = scrolled || isOpen
    ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-black/30"
    : "bg-transparent py-6";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${navStateClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
          >
            MK<span className="text-cyan-400">.</span>
          </a>

          {/* desktop nav */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-cyan-500 hover:bg-clip-text transition-all font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white transition hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-black"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* mobile menu */}
        {isOpen && (
          <div
            id="mobile-nav"
            className="md:hidden mt-4 rounded-2xl border border-white/10 bg-black/90 px-4 py-6 shadow-2xl shadow-black/40"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-xl px-3 py-2 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

