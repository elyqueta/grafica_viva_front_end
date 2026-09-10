'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { WHATSAPP_LINK, ORCAMENTO_LINK } from '../../lib/constants';

export default function ServicosGuia() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-guia-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2
          data-guia-reveal
          className="text-2xl font-extrabold leading-tight text-black sm:text-3xl"
        >
          Não sabe por onde começar?
        </h2>

        <p data-guia-reveal className="mt-4 text-base text-black/60 sm:text-lg">
          conte-nos o que precisa e ajudamos a encontrar a solução mais adequada
          para o seu projecto.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            data-guia-reveal
            href={ORCAMENTO_LINK}
            className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Pedir orçamento
          </Link>

          <a
            data-guia-reveal
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