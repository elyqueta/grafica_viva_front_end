// components/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { X, MessageCircle } from "lucide-react";

gsap.registerPlugin(Flip);

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Produtos", href: "/produtos" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contactos", href: "/contactos" },
];

const WHATSAPP_LINK = "https://wa.me/244924666323";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const animRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const button = buttonRef.current;
    if (!overlay || !panel || !button) return;

    // Initial mount — menu closed, no animation
    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel, { autoAlpha: 0 });
      return;
    }

    // Kill previous animation WITHOUT reverting styles
    // (ctx.revert() was the cause of the abrupt close)
    animRef.current?.kill();

    const links = linksRef.current?.querySelectorAll("li") ?? [];
    const footer = footerRef.current;

    if (menuOpen) {
      document.body.style.overflow = "hidden";

      const btnRect = button.getBoundingClientRect();
      const finalLeft = 16;
      const finalTop = window.innerWidth >= 640 ? 80 : 64;
      const finalWidth = window.innerWidth - 32;
      const finalMaxHeight = window.innerHeight - finalTop - 16;

      // Origin: panel sits exactly on top of the button
      gsap.set(panel, {
        position: "fixed",
        top: btnRect.top,
        left: btnRect.left,
        width: btnRect.width,
        height: btnRect.height,
        borderRadius: 9999,
        padding: 0,
        margin: 0,
        overflow: "hidden",
        autoAlpha: 1,
        zIndex: 45,
      });
      gsap.set(links, { autoAlpha: 0, y: 10 });
      if (footer) gsap.set(footer, { autoAlpha: 0, y: 8 });
      gsap.set(overlay, { autoAlpha: 0 });

      const state = Flip.getState(panel);

      // Target layout
      gsap.set(panel, {
        top: finalTop,
        left: finalLeft,
        width: finalWidth,
        height: "auto",
        maxHeight: finalMaxHeight,
        borderRadius: 24,
        padding: 32,
      });
      const finalHeight = Math.min(panel.scrollHeight, finalMaxHeight);
      gsap.set(panel, { height: finalHeight });

      const tl = gsap.timeline();
      animRef.current = tl;

      tl.to(overlay, {
        autoAlpha: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      // Flip morph button → panel
      const flip = Flip.from(state, {
        duration: 0.65,
        ease: "power3.out",
        absolute: true,
        scale: false,
        onComplete: () => {
          gsap.set(panel, { overflow: "auto" });
        },
      });
      tl.add(flip, 0.1);

      // Content after expansion
      tl.to(
        links,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.15",
      );

      if (footer) {
        tl.to(
          footer,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25",
        );
      }
    } else {
      // ── CLOSE ──────────────────────────────────────────────
      // Never use ctx.revert() here — it snaps styles and kills
      // the close animation. Kill tweens only; animate out fully.
      const closeRect = button.getBoundingClientRect();

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          gsap.set(panel, { autoAlpha: 0 });
        },
      });
      animRef.current = tl;

      // 1. Fade content out first
      tl.to(links, {
        autoAlpha: 0,
        y: 8,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
      });

      if (footer) {
        tl.to(
          footer,
          {
            autoAlpha: 0,
            y: 6,
            duration: 0.2,
            ease: "power2.in",
          },
          "<",
        );
      }

      // 2. Flip panel back to button geometry
      tl.add(() => {
        const state = Flip.getState(panel);

        gsap.set(panel, {
          top: closeRect.top,
          left: closeRect.left,
          width: closeRect.width,
          height: closeRect.height,
          borderRadius: 9999,
          padding: 0,
          maxHeight: "none",
          overflow: "hidden",
        });

        Flip.from(state, {
          duration: 0.55,
          ease: "power2.inOut",
          absolute: true,
          scale: false,
        });
      });

      // Hold timeline for the Flip duration (callback doesn't block)
      tl.to({}, { duration: 0.55 });

      // 3. Overlay fades in the second half of the shrink
      tl.to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.35",
      );
    }

    // Cleanup: only kill the tween, never revert styles mid-animation
    return () => {
      animRef.current?.kill();
    };
  }, [menuOpen]);

  // Restore body scroll if component unmounts while open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-500`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-4">
          <Link
            href="/"
            id="nav-logo-target"
            className="hidden shrink-0 lg:block"
          >
            <img src="/logo.png" alt="Gráfica Viva" className="h-20 w-auto" />
          </Link>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[60] flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-black lg:hidden"
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
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`text-regular font-semibold tracking-wide transition-colors hover:text-black ${
                      isActive ? "text-[#000]" : "text-black/60"
                    }`}
                  >
                    {link.label.toUpperCase()}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-rose-600" />
                    )}
                  </Link>
                </li>
              );
            })}
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

      {/* Dim overlay */}
      <div
        ref={overlayRef}
        className="invisible fixed inset-0 z-40 bg-black/20 lg:hidden"
        onClick={() => setMenuOpen(false)}
      />

      {/* Panel — Flip morphs from the menu button */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="invisible fixed z-[45] flex flex-col justify-between overflow-hidden bg-amber-50 opacity-0 lg:hidden"
      >
        <ul ref={linksRef} className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl text-black font-semibold transition-colors hover:text-black/70 ${
                    isActive ? "text-black/80" : "text-black/35"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          ref={footerRef}
          className="mt-10 flex items-center justify-between"
        >
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
    </>
  );
}