'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Reason = {
  title: string;
  description: string;
  image: string;
};

const REASONS: Reason[] = [
  {
    title: 'Qualidade',
    description: 'Atenção ao detalhe em cada projecto.',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80',
  },
  {
    title: 'Criatividade',
    description: 'Soluções pensadas para valorizar a sua marca.',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80',
  },
  {
    title: 'Acompanhamento',
    description: 'Estamos consigo desde a ideia até ao resultado final.',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
  },
  {
    title: 'Soluções personalizadas',
    description: 'Cada projecto é tratado de acordo com as suas necessidades.',
    image:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80',
  },
  {
    title: 'Compromisso',
    description: 'Trabalhamos para entregar resultados consistentes e profissionais.',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-why-us-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('[data-why-us-card]', {
        opacity: 0,
        scale: 1.04,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-why-us-grid]', start: 'top 85%' },
      });

      gsap.from('[data-why-us-caption]', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-why-us-grid]', start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p data-why-us-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [porquê a gráfica viva]
        </p>
        <h2 data-why-us-reveal className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
          Mais do que imprimir. Criamos impacto.
        </h2>
      </div>

      <div
        data-why-us-grid
        className="mt-14 grid max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      >
        {REASONS.map((reason) => (
          <div key={reason.title} data-why-us-card>
            <div className="group relative h-64 w-full overflow-hidden sm:h-72 lg:h-150">
              <Image
                src={reason.image}
                alt={reason.title}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
            </div>

            <div data-why-us-caption className="px-1 py-4">
              <p className="text-base font-semibold text-black">{reason.title}</p>
              <p className="mt-1 text-sm text-black/45">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}