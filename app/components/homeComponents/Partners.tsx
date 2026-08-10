'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARTNERS } from '../../data/partners';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!sectionRef.current || PARTNERS.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-partners-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      if (trackRef.current) {
        // A faixa renderiza a lista duplicada (ver `loopItems`), por isso
        // basta animar metade da largura total para o loop ficar contínuo,
        // sem "salto" visível quando reinicia.
        const halfWidth = trackRef.current.scrollWidth / 2;

        loopTweenRef.current = gsap.to(trackRef.current, {
          x: -halfWidth,
          duration: halfWidth / 40, // velocidade constante, independente do nº de logos
          ease: 'none',
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (PARTNERS.length === 0) return null;

  const loopItems = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="parceiros"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p data-partners-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [parceiros]
        </p>
        <h2 data-partners-reveal className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
          marcas que confiam na gráfica viva.
        </h2>
        <p data-partners-reveal className="mt-4 text-base text-black/60 sm:text-lg">
          Temos orgulho em contribuir para projectos de empresas e marcas que procuram qualidade, criatividade e profissionalismo.
        </p>
      </div>

      <div
        className="relative mt-14"
        onMouseEnter={() => loopTweenRef.current?.pause()}
        onMouseLeave={() => loopTweenRef.current?.play()}
      >
        {/* Desvanecimento nas margens, para o loop não cortar bruscamente */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-amber-50 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-amber-50 to-transparent sm:w-32" />

        <div ref={trackRef} className="flex w-max items-center gap-12 sm:gap-16">
          {loopItems.map((partner, i) => {
            const isDuplicate = i >= PARTNERS.length;
            return (
              <a
                key={`${partner.name}-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={isDuplicate}
                tabIndex={isDuplicate ? -1 : 0}
                className="group flex shrink-0 items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className="h-10 w-auto object-contain opacity-50 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 sm:h-12"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}