// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Produtos", href: "#produtos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contactos", href: "#contactos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-500 ${
        scrolled
          ? "bg-black/70 shadow-lg shadow-black/30 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" id="nav-logo-target" className="shrink-0">
          <img src="/logo.png" alt="Gráfica Viva" className="h-10 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-white ${
                  index === 0 ? "text-white" : "text-white/80"
                }`}
              >
                {link.label.toUpperCase()}
                {index === 0 && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-rose-600" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex items-center cursor-pointer gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
        >
          <span className="h-2 w-2 rounded-full bg-white" />
          en
        </button>
      </nav>
    </header>
  );
}
