'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  'criatividade com estratégia',
  'design profissional e moderno',
  'produção com qualidade garantida',
  'cumprimento de prazos',
  'soluções completas num só lugar',
];

const WHATSAPP_LINK = 'https://wa.me/244924666323';

export default function ServicosWhy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-why-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('[data-why-item]', {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-why-list]', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p data-why-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [porquê escolher a gráfica viva]
        </p>

        <ul data-why-list className="mx-auto mt-10 max-w-sm space-y-4 text-left">
          {REASONS.map((reason) => (
            <li key={reason} data-why-item className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-rose-600">
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              </span>
              <span className="text-base text-black/70 sm:text-lg">{reason}</span>
            </li>
          ))}
        </ul>

        <a
          data-why-reveal
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          fala connosco
        </a>
      </div>
    </section>
  );
}
