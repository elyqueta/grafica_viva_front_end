'use client';

import { useEffect, useRef } from 'react';
import MediaReveal from '../MediaReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORCAMENTO_LINK, SERVICOS_LINK } from '../../lib/constants';

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const HERO_VIDEO = '/videos/hero.mp4';


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax sutil da imagem de fundo ao scroll — funciona em todos os
      // tamanhos de ecrã, incluindo mobile.
      if (mediaRef.current) {
        gsap.to(mediaRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      data-hero-fade
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black opacity-0"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <MediaReveal
          poster="/hero-bg.jpeg"
          videoSrc={HERO_VIDEO}
          alt="Landscape picture"
        />
      </div>
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 text-center lg:px-10">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-amber-50 sm:text-5xl lg:text-6xl">
          A sua ideia merece ser vista.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-amber-50 sm:text-lg">
          Transformamos ideias em soluções gráficas que dão força à sua marca, do design à impressão final.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
           <a
             href={ORCAMENTO_LINK}
             className="rounded-sm cursor-pointer bg-amber-50 px-6 py-3 text-sm font-bold tracking-wide text-[#292929c5] transition-colors hover:bg-white/90 hover:text-[#29292980]"
           >
             <span className="hidden sm:inline">PEDIR ORÇAMENTO</span>
              <span className="sm:hidden">Orçamento</span>
           </a>
           
           <a          
             href={SERVICOS_LINK}
             className="rounded-sm border border-amber-50 px-6 py-3 text-sm font-bold tracking-wide text-amber-50 transition-colors hover:bg-amber-50 hover:text-[#29292980]">
             <span className="hidden sm:inline">VER SERVIÇOS</span>
              <span className="sm:hidden">Serviço</span>
           </a>
        </div>
      </div>
    </section>
  );
}
