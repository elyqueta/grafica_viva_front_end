'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = {
  number: string;
  title: string;
  category: string;
};

const SERVICES_PREVIEW: ServiceItem[] = [
  { number: '01', title: 'grande e pequeno formato', category: 'impressão digital' },
  { number: '02', title: 'identidade visual e materiais', category: 'design gráfico' },
  { number: '03', title: 'soluções personalizadas', category: 'embalagens' },
  { number: '04', title: 'interior e exterior', category: 'sinalética' },
];

export default function AboutBio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-bio-reveal]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from('[data-bio-image]', {
        opacity: 0,
        y: 30,
        rotate: 0,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('[data-services-item]', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-services-list]', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p data-bio-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [a nossa história]
        </p>
        <p data-bio-reveal className="mt-6 text-lg leading-relaxed text-black/70 sm:text-xl">
          começámos como uma pequena tipografia de bairro, com uma máquina antiga e a
          vontade de fazer bem feito. hoje somos uma equipa que desenha, imprime e
          acompanha cada projeto do primeiro rascunho à entrega final.
        </p>
        <p data-bio-reveal className="mt-4 text-lg leading-relaxed text-black/70 sm:text-xl">
          não crescemos a acrescentar clientes ao acaso — crescemos a dizer que não a
          trabalho apressado.
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8">
        <div
          data-bio-image
          className="relative mx-auto w-48 -rotate-2 overflow-hidden rounded-sm border-4 border-white bg-white shadow-sm sm:w-56 lg:mx-0 lg:w-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
            alt="Sinalética produzida pela Gráfica Viva"
            width={600}
            height={720}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="text-center">
          <p data-bio-reveal className="text-xs font-semibold tracking-widest text-black/40">
            [o que fazemos]
          </p>
          <p data-bio-reveal className="mt-6 text-base leading-relaxed text-black/70 sm:text-lg">
            desenhamos a identidade visual e imprimimos o resultado final. não
            separamos as duas fases — quem cria também acompanha a produção.
          </p>
          <p data-bio-reveal className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
            trabalhamos grandes e pequenos formatos, embalagens, sinalética e tudo o
            que precise de sair do ecrã para o papel.
          </p>
        </div>

        <div
          data-bio-image
          className="relative mx-auto w-48 rotate-1 overflow-hidden rounded-sm border-4 border-white bg-white shadow-sm sm:w-56 lg:mx-0 lg:ml-auto lg:w-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600&q=80"
            alt="Personalização e brindes da Gráfica Viva"
            width={600}
            height={720}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div data-services-list className="mx-auto mt-24 max-w-3xl">
        <div className="divide-y divide-black/10 border-y border-black/10">
          {SERVICES_PREVIEW.map((service) => (
            <div
              key={service.number}
              data-services-item
              className="flex items-baseline gap-4 py-5"
            >
              <span className="text-xs text-black/40">{service.number}</span>
              <div>
                <p className="text-lg font-semibold text-black sm:text-xl">
                  {service.title}
                </p>
                <p className="text-sm text-black/50">{service.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-5 py-2.5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            ver todos os serviços
          </Link>
        </div>
      </div>
    </section>
  );
}