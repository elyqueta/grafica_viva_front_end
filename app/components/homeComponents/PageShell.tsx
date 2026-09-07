"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type PageShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export default function PageShell({ children, footer }: PageShellProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const update = () => {
      setFooterHeight(el.offsetHeight);
      // O espaçador só fica com a altura correta depois deste re-render.
      // Os ScrollTriggers de outros componentes (ex. Footer) que usam o
      // espaçador como trigger precisam de recalcular as posições depois
      // de a altura mudar — um resize da janela não é suficiente porque
      // esta mudança vem de React, não do browser.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const scrollToTarget = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element instanceof HTMLElement) {
          requestAnimationFrame(() => {
            lenis.scrollTo(element, { offset: 0, immediate: true });
            ScrollTrigger.refresh();
          });
        }
      } else {
        requestAnimationFrame(() => {
          lenis.scrollTo(0, { immediate: true });
          ScrollTrigger.refresh();
        });
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTarget);
    });
  }, [pathname]);

  return (
    <>
      <div className="relative z-10">
        {/*
          O fundo (bg-amber-50), cantos arredondados e sombra ficam SÓ
          nesta div, que envolve exclusivamente o conteúdo real. Se esta
          div também envolvesse o espaçador, a sua cor de fundo (opaca)
          cobriria a área reservada para o footer — e o footer, mesmo
          estando lá, ficaria tapado por uma camada da mesma cor da página,
          parecendo "vazio" ou em branco.
        */}
        <div className="rounded-b-3xl bg-amber-50 shadow-sm">{children}</div>

        {/*
          Espaçador: reserva no fluxo do documento um espaço com a altura
          exata do footer. Fica FORA da div com fundo, portanto é
          transparente — deixa o footer fixo por baixo tornar-se visível
          assim que o scroll o atravessa, sem depender de margens negativas
          nem de `position: sticky`.
        */}
        <div
          id="page-footer-spacer"
          style={{ height: footerHeight }}
          aria-hidden="true"
          className="pointer-events-none"
        />
      </div>

      {/*
        Footer fixo ao fundo do ecrã. Fica sempre à espera no fundo; só se
        torna visível quando o conteúdo acima termina e o espaçador
        (transparente) liberta espaço de scroll. Precisa de estar acima do
        conteúdo principal para receber cliques, mas abaixo da navbar e do
        menu mobile.
      */}
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-20">
        {footer}
      </div>
    </>
  );
}
