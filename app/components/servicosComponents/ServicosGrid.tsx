'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ServiceEntry = {
  slug: string;
  category: string;
  title: string;
  accent: string;
  image: string;
};

const SERVICES: ServiceEntry[] = [
  {
    slug: 'comunicacao-institucional',
    category: 'comunicação institucional',
    title: 'identidade e estratégia de marca',
    accent: 'bg-violet-500',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80',
  },
  {
    slug: 'publicidade-propaganda',
    category: 'publicidade & propaganda',
    title: 'campanhas que se veem',
    accent: 'bg-sky-500',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
  },
  {
    slug: 'servicos-graficos',
    category: 'serviços gráficos',
    title: 'do rascunho à impressão',
    accent: 'bg-rose-500',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
  },
  {
    slug: 'brindes-personalizados',
    category: 'brindes personalizados',
    title: 'a marca em cada objeto',
    accent: 'bg-pink-400',
    image:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&q=80',
  },
  {
    slug: 'websites-profissionais',
    category: 'websites profissionais',
    title: 'presença digital que funciona',
    accent: 'bg-orange-500',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
  },
  {
    slug: 'aplicativos',
    category: 'aplicativos (apps)',
    title: 'apps à medida do negócio',
    accent: 'bg-amber-500',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80',
  },
];

const WHATSAPP_BASE = 'https://wa.me/244924666323';

function buildWhatsappLink(category: string) {
  const message = `Olá! Gostaria de saber mais sobre o serviço de ${category}.`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

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
    <section ref={sectionRef} className="relative w-full bg-amber-50 pt-28 lg:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:gap-16 lg:px-10">
        <p data-servicos-reveal className="shrink-0 text-xs font-semibold tracking-widest text-black/40">
          [serviços]
        </p>
        <p data-servicos-reveal className="max-w-xl text-base leading-relaxed text-black/70 sm:text-lg">
          uma seleção do que desenhamos e produzimos para marcas em luanda. da
          identidade visual ao objeto físico na mão do cliente, procuramos
          sempre a mesma coisa: um resultado simples e bem acabado.
        </p>
      </div>

      <div
        data-servicos-list
        className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <div key={service.slug} data-servicos-card>
            <a
              href={buildWhatsappLink(service.category)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-[55vh] w-full overflow-hidden sm:h-[60vh] lg:h-[70vh]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />

              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 ${service.accent}`}
              >
                • pedir orçamento
              </span>
            </a>

            <div data-servicos-caption className="px-4 py-4 sm:px-5">
              <p className="text-base font-semibold text-black sm:text-lg">
                {service.title}
              </p>
              <p className="mt-1 text-sm text-black/45">{service.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}