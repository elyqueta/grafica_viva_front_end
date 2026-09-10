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
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:items-center lg:justify-between lg:gap-8">
        <div data-about-label className="w-full text-center lg:w-1/4 lg:text-left">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [sobre nós]
          </p>
          <p className="mt-1 text-sm font-semibold text-black/70">
            [gráfica viva]
          </p>
        </div>

        <div className='flex flex-col gap-10 lg:items-center lg:flex-row lg:justify-between lg:gap-10'>

        <div
          data-about-image
          className="w-full shrink-0 sm:w-64 lg:w-110"
          >
          <div className="overflow-hidden">
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
          <h2 className="text-2xl font-extrabold leading-tight text-black sm:text-3xl">
            Mais do que uma gráfica. Somos parceiros das suas ideias.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
            Acompanhamos cada projecto do primeiro rascunho à entrega final, com atenção ao detalhe e compromisso com a qualidade.
          </p>
        </div>  
      </div>
    </div>

     <div className="mx-auto mt-16 max-w-2xl text-center">
        <Link
          data-about-cta
          href="/sobre"
          className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-5 py-2.5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            Conhecer a Gráfica Viva
        </Link>
      </div>
    </section>
  );
}
