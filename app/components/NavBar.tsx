// components/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Produtos", href: "#produtos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contactos", href: "#contactos" },
];

const WHATSAPP_LINK = "https://wa.me/244924666323";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      const links = linksRef.current?.querySelectorAll("li") ?? [];
      const tl = gsap.timeline();

      if (menuOpen) {
        document.body.style.overflow = "hidden";
        tl.to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          ease: "power2.out",
        })
          .fromTo(
            panelRef.current,
            { y: -24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
            "-=0.15",
          )
          .fromTo(
            links,
            { y: 16, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.25",
          );
      } else {
        document.body.style.overflow = "";
        tl.to(panelRef.current, {
          y: -16,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
        }).to(
          overlayRef.current,
          { autoAlpha: 0, duration: 0.25, ease: "power2.in" },
          "-=0.15",
        );
      }
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full bg-transparent transition-colors duration-500 ${
          scrolled
            ? "lg:bg-amber-50 lg:shadow-sm lg:shadow-black/20 lg:backdrop-blur-md"
            : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-4">
          <a
            href="#inicio"
            id="nav-logo-target"
            className="hidden shrink-0 lg:block"
          >
            <img src="/logo.png" alt="Gráfica Viva" className="h-20 w-auto" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-black lg:hidden"
          >
            {menuOpen ? (
              <>
                <X className="h-4 w-4" />
                close
              </>
            ) : (
              <>
                <span className="font-mono text-xs tracking-widest">[ ]</span>
                menu
              </>
            )}
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`text-regular font-semibold tracking-wide transition-colors hover:text-black ${
                    index === 0 ? "text-[#000]" : "text-black/60"
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
            className="flex shrink-0 items-center cursor-pointer gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            en
          </button>
        </nav>
      </header>

      {/* Mobile / tablet menu overlay */}
      <div
        ref={overlayRef}
        className="invisible fixed inset-x-0 top-0 z-40 flex flex-col opacity-0 lg:hidden"
        onClick={() => setMenuOpen(false)}
      >
        <div className="h-16 sm:h-20" />

        <div
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className="mx-4 flex max-h-[calc(100vh-6rem)] flex-col justify-between overflow-y-auto rounded-3xl bg-amber-50 p-8"
        >
          <ul ref={linksRef} className="flex flex-col gap-5">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl text-black font-semibold transition-colors hover:text-black/70 ${
                    index === 0 ? "text-black/80" : "text-black/35"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center justify-between">
            <img src="/logo.png" alt="Gráfica Viva" className="h-10 w-auto" />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black/70 transition-colors hover:text-black/45"
            >
              WhatsApp
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
