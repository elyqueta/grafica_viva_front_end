'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'conte-nos o que precisa',
    description: 'explique-nos a sua ideia, necessidade ou objectivo.',
  },
  {
    number: '02',
    title: 'definimos a solução',
    description: 'ajudamos a escolher o serviço e os materiais mais adequados.',
  },
  {
    number: '03',
    title: 'preparamos o projecto',
    description: 'tratamos dos detalhes necessários antes da produção.',
  },
  {
    number: '04',
    title: 'produzimos',
    description: 'damos forma à solução final com atenção aos detalhes.',
  },
];

export default function ServicosProcesso() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-processo-heading]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('[data-processo-step]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-processo-list]', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          data-processo-heading
          className="text-2xl font-extrabold leading-tight text-black sm:text-3xl"
        >
          um processo simples. um resultado pensado consigo.
        </h2>
      </div>

      <div
        data-processo-list
        className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {STEPS.map((step) => (
          <div key={step.number} data-processo-step className="text-left">
            <span className="text-xs font-semibold tracking-widest text-black/40">
              {step.number}
            </span>
            <p className="mt-3 text-lg font-semibold text-black">{step.title}</p>
            <p className="mt-2 text-sm text-black/60">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}