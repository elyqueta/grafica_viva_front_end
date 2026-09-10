'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../../data/servicos';
import { ORCAMENTO_LINK } from '../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

type ServiceCard = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
};

const SERVICES_CARDS: ServiceCard[] = SERVICES.map((s) => ({
  slug: s.slug,
  category: s.category,
  title: s.serviceTitle,
  subtitle: s.subtitle,
  image: s.image,
}));

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-services-heading]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top 80%',
        },
      });

      const track = trackRef.current!;

      const getScrollAmount = () =>
        track.scrollWidth - (pinRef.current?.offsetWidth ?? 0);

      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
        }),
      });

      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative w-full bg-amber-50"
    >
      <div data-services-heading className="mx-auto max-w-7xl px-6 pt-24 lg:px-10">
        <p className="text-xs font-semibold tracking-widest text-black/40">
          [serviços]
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
          Do conceito à impressão.
        </h2>
        <p className="mt-4 max-w-xl text-base text-black/60 sm:text-lg">
          Soluções gráficas pensadas para ajudar a sua marca a comunicar melhor e destacar-se.
        </p>
      </div>

      <div ref={pinRef} className="relative mt-12 w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-0 px-[7.5vw] lg:px-0"
        >
          {SERVICES_CARDS.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos`}
              data-services-card
              className="group relative h-[70vh] w-[85vw] shrink-0 sm:w-[60vw] lg:h-[80vh] lg:w-[32vw]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 32vw, 85vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

              <span className="absolute right-4 top-4 rounded-sm bg-rose-600 px-4 py-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                • Ver todos os serviços
              </span>

              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
                <p className="text-sm text-black/80">
                  <span className="lowercase">{service.category}</span>
                  {' | '}
                  {service.title}
                </p>
                <p className="mt-0.5 text-xs text-black/50">
                  {service.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-6 text-center lg:px-10">
        <Link
          href={ORCAMENTO_LINK}
          className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Pedir orçamento
        </Link>
      </div>
    </section>
  );
}
