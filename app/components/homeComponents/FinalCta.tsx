'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { WHATSAPP_LINK, ORCAMENTO_LINK } from '../../lib/constants';

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-final-cta-reveal]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <p data-final-cta-reveal className="text-xs font-semibold tracking-widest text-amber-50/50">
          [vamos falar]
        </p>

        <h2
          data-final-cta-reveal
          className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl"
        >
          tem uma ideia? vamos dar-lhe vida.
        </h2>

        <p data-final-cta-reveal className="mt-4 text-base text-black sm:text-lg">
          Fale connosco e descubra como podemos transformar a sua ideia numa solução gráfica profissional.
        </p>

        <div data-final-cta-reveal className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ORCAMENTO_LINK}
            className="rounded-sm bg-black px-6 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-white/90 hover:text-black"
          >
            PEDIR ORÇAMENTO
          </Link>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-black px-6 py-3 text-sm font-bold tracking-wide text-black transition-colors hover:bg-black hover:text-white"
          >
            FALAR PELO WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}