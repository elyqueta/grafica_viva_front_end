'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type PageShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export default function PageShell({ children, footer }: PageShellProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    // Lenis substitui o scroll nativo (que é "on/off", sem inércia) por um
    // scroll com easing — cada "tick" do scroll aproxima-se suavemente do
    // valor alvo em vez de saltar logo para lá. Por padrão o Lenis anima o
    // scroll nativo da janela (sem envolver a página numa div com
    // transform), por isso continua compatível com o footer `fixed`.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    // O ScrollTrigger normalmente ouve o evento nativo `scroll`; como o
    // Lenis passa a controlar o scroll, é preciso dizer explicitamente ao
    // ScrollTrigger para recalcular sempre que o Lenis emitir um "tick".
    lenis.on('scroll', ScrollTrigger.update);

    // Liga o próprio relógio do GSAP ao Lenis, para os dois ficarem no
    // mesmo frame e não perderem sincronia com as animações existentes.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
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
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <div className="relative z-10">
        {/*
          O fundo (bg-amber-50), cantos arredondados e sombra ficam SÓ
          nesta div, que envolve exclusivamente o conteúdo real. Se esta
          div também envolvesse o espaçador, a sua cor de fundo (opaca)
          cobriria a área reservada para o footer — e o footer, mesmo
          estando lá (z-0, por baixo), ficaria tapado por uma camada da
          mesma cor da página, parecendo "vazio" ou em branco.
        */}
        <div className="rounded-b-3xl bg-amber-50 shadow-sm">
          {children}
        </div>

        {/*
          Espaçador: reserva no fluxo do documento um espaço com a altura
          exata do footer. Fica FORA da div com fundo, portanto é
          transparente — deixa o footer fixo por baixo (z-0) tornar-se
          visível assim que o scroll o atravessa, sem depender de
          margens negativas nem de `position: sticky` (que se comporta de
          forma inconsistente entre browsers quando combinado com flex).
        */}
        <div id="page-footer-spacer" style={{ height: footerHeight }} aria-hidden="true" />
      </div>

      {/*
        Footer fixo ao fundo do ecrã, atrás do conteúdo (z-0 < z-10).
        Fica sempre "à espera" no fundo; só se torna visível quando o
        conteúdo acima termina e o espaçador (transparente) liberta
        espaço de scroll.
      */}
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        {footer}
      </div>
    </>
  );
}