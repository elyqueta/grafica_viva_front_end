'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_LINK = 'https://wa.me/244924666323';

export default function ServicosHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });

      tl.from('[data-servicos-hero-label]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
      })
        .from(
          '[data-servicos-hero-title]',
          { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' },
          '-=0.3',
        )
        .from(
          '[data-servicos-hero-text]',
          { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' },
          '-=0.4',
        )
        .from(
          '[data-servicos-hero-cta]',
          { opacity: 0, y: 14, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.3',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 pb-16 pt-36 lg:px-10 lg:pb-20 lg:pt-44"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p
          data-servicos-hero-label
          className="text-xs font-semibold tracking-widest text-black/40"
        >
          [serviços]
        </p>

        <h1
          data-servicos-hero-title
          className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl"
        >
          soluções para dar forma às suas ideias.
        </h1>

        <p
          data-servicos-hero-text
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg"
        >
          da identidade da sua marca à produção dos materiais que precisa, criamos
          soluções pensadas para comunicar, promover e valorizar o seu negócio.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            data-servicos-hero-cta
            href="/orcamento"
            className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            pedir orçamento
          </Link>

          <a
            data-servicos-hero-cta
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            falar pelo whatsapp
          </a>
        </div>
      </div>
    </section>
  );
}