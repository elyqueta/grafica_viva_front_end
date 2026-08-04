'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Value = {
  number: string;
  title: string;
  description: string;
};

const VALUES: Value[] = [
  {
    number: '01',
    title: 'simplicidade',
    description:
      'a beleza não vem de acrescentar, vem de tirar. deixamos ficar só o que é preciso.',
  },
  {
    number: '02',
    title: 'rigor',
    description:
      'cada cor, cada corte, cada milímetro é verificado antes de sair da gráfica.',
  },
  {
    number: '03',
    title: 'cuidado',
    description: 'tratamos cada encomenda como se fosse a única do dia.',
  },
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-values-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from('[data-values-item]', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-values-list]', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-2xl">
        <p data-values-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [como pensamos]
        </p>
        <p data-values-reveal className="mt-6 text-lg leading-relaxed text-black/70 sm:text-xl">
          um trabalho bem feito não nasce da pressa, nasce de decisões. deixamos cair
          o que não é preciso e guardamos só o que tem significado.
        </p>

        <div data-values-list className="mt-14 divide-y divide-black/10 border-y border-black/10">
          {VALUES.map((value, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={value.number}
                type="button"
                data-values-item
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className="block w-full py-6 text-left"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-black/40">{value.number}</span>
                  <h3
                    className={`text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                      isActive ? 'text-black' : 'text-black/35'
                    }`}
                  >
                    {value.title}
                  </h3>
                </div>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isActive
                      ? 'mt-3 grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden pl-8">
                    <p className="text-sm text-black/60 sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div data-values-reveal className="mt-10 text-center sm:text-left">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-5 py-2.5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            ver como trabalhamos
          </Link>
        </div>
      </div>
    </section>
  );
}