'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.from('[data-about-label]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
      })
        .from(
          '[data-about-image]',
          {
            opacity: 0,
            y: 40,
            rotate: 0,
            scale: 0.94,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        .from(
          '[data-about-text]',
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.6',
        )
        .from(
          '[data-about-quote]',
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .from(
          '[data-about-cta]',
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div data-about-label className="w-full text-center lg:w-1/4 lg:text-left">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [sobre nós]
          </p>
          <p className="mt-1 text-sm font-semibold text-black/70">
            [gráfica viva]
          </p>
        </div>

        <div
          data-about-image
          className="relative w-56 shrink-0 -rotate-3 sm:w-64 lg:w-72"
        >
          <div className="overflow-hidden rounded-sm border-4 border-white bg-white shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80"
              alt="Processo de impressão na Gráfica Viva"
              width={600}
              height={750}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div data-about-text className="w-full lg:w-1/3">
          <p className="text-base leading-relaxed text-black/70 sm:text-lg">
            Desenhamos e imprimimos. O que nos importa é transformar ideias em
            suportes físicos de qualidade — do conceito à impressão final.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl text-center">
        <p data-about-quote className="text-lg text-black/60 sm:text-xl">
          Não há atalhos na qualidade. Cada impressão é tratada como se fosse
          a primeira e a última.
        </p>

        <Link
          data-about-cta
          href="/sobre"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-black/5 px-5 py-2.5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
        >
          a nossa história
        </Link>
      </div>
    </section>
  );
}
