'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax sutil da imagem de fundo ao scroll — funciona em todos os
      // tamanhos de ecrã, incluindo mobile.
      if (imageRef.current) {
        gsap.to(imageRef.current, {
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
      <Image
        ref={imageRef}
        width={800}
        height={500}
        src="/hero-bg.jpeg"
        alt="Landscape picture"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 text-center lg:px-10">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-amber-50 sm:text-5xl lg:text-6xl">
          Imprimimos Qualidade,
          <br />
          Damos Vida às Suas Ideias
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-amber-50 sm:text-lg">
          Soluções gráficas completas com criatividade, precisão e compromisso.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#sobre"
            className="rounded-sm border border-amber-50 px-6 py-3 text-sm font-bold tracking-wide text-amber-50 transition-colors hover:bg-amber-50 hover:text-[#29292980]"
          >
            SAIBA MAIS
          </a>
          <a
            href="#servicos"
            className="rounded-sm bg-amber-50 px-6 py-3 text-sm font-bold tracking-wide text-[#292929c5] transition-colors hover:bg-white/90 hover:text-[#29292980]"
          >
            NOSSOS SERVIÇOS
          </a>
        </div>
      </div>
    </section>
  );
}
