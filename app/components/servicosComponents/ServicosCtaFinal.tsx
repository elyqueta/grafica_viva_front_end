'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFillHeading from './ScrollFillHeading';

gsap.registerPlugin(ScrollTrigger);

import { WHATSAPP_LINK, ORCAMENTO_LINK } from '../../lib/constants';

export default function ServicosCtaFinal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-cta-final-reveal]', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        <ScrollFillHeading
          text="          Já sabe do que precisa?"
          className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
        />

        <p data-cta-final-reveal className="mt-6 text-base text-black/60 sm:text-lg">
          Fale connosco e peça um orçamento para o seu próximo projecto.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            data-cta-final-reveal
            href={ORCAMENTO_LINK}
            className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Pedir orçamento
          </Link>

          <a
            data-cta-final-reveal
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}