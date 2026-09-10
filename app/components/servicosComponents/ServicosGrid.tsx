'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../../data/servicos';
import { PROJECTS } from '../../data/portfolio';
import RelatedProjects from './RelatedProjects';

gsap.registerPlugin(ScrollTrigger);

// Ritmo editorial: grande + compacto, depois um bloco largo, repetindo-se
// indefinidamente. Nunca depende de SERVICES.length ser um número fixo.
const SPAN_PATTERN = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-12'];
const HEIGHT_PATTERN = [
  'h-[62vh] lg:h-[74vh]',
  'h-[62vh] lg:h-[74vh]',
  'h-[55vh] lg:h-[58vh]',
];

export default function ServicosGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-servicos-reveal]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('[data-servicos-card]', {
        opacity: 0,
        scale: 1.04,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-servicos-list]',
          start: 'top 85%',
        },
      });

      gsap.from('[data-servicos-caption]', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-servicos-list]',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-amber-50 pt-4 lg:pt-6">
      <div className="mx-auto px-6 lg:px-10">
        <p data-servicos-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [o que fazemos]
        </p>
      </div>

      <div
        data-servicos-list
        className="mt-10 grid grid-cols-1 lg:grid-cols-12"
      >
        {SERVICES.map((service, index) => {
          const pattern = index % SPAN_PATTERN.length;
          const relatedProjects = PROJECTS.filter(
            (project) => project.serviceId === service.id,
          );

          return (
            <div key={service.id} data-servicos-card className={SPAN_PATTERN[pattern]}>
              <Link
                href={service.href}
                className={`group relative block w-full overflow-hidden ${HEIGHT_PATTERN[pattern]}`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />

                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 ${service.accent}`}
                >
                  • Conhecer serviço
                </span>

                <span className="absolute left-4 top-4 text-xs font-semibold tracking-widest text-white/80">
                  {service.number}
                </span>
              </Link>

              <div data-servicos-caption className="px-6 py-4">
                <p className="text-base font-semibold text-black sm:text-lg">
                  {service.title}
                </p>
                <p className="mt-1 text-sm text-black/60">{service.description}</p>
                <p className="mt-2 text-xs text-black/45">
                  {service.items.join(' · ')}
                </p>

                <RelatedProjects projects={relatedProjects} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}