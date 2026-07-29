'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHorizontalScroll } from '@/app/lib/useHorizontalScroll';
import ScrollArrows from './ScrollArrows';

gsap.registerPlugin(ScrollTrigger);

type ServiceCard = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
};

const SERVICES: ServiceCard[] = [
  {
    slug: 'impressao-digital',
    category: 'impressão digital',
    title: 'grande e pequeno formato',
    subtitle: 'gráfica viva',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80',
  },
  {
    slug: 'design-grafico',
    category: 'design gráfico',
    title: 'identidade visual e materiais',
    subtitle: 'gráfica viva',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80',
  },
  {
    slug: 'embalagens',
    category: 'embalagens',
    title: 'soluções personalizadas',
    subtitle: 'gráfica viva',
    image:
      'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=900&q=80',
  },
  {
    slug: 'sinaletica',
    category: 'sinalética',
    title: 'interior e exterior',
    subtitle: 'gráfica viva',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
  },
  {
    slug: 'impressao-offset',
    category: 'impressão offset',
    title: 'tiragens de grande escala',
    subtitle: 'gráfica viva',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
  },
  {
    slug: 'personalizacao',
    category: 'personalização',
    title: 'brindes e merchandising',
    subtitle: 'gráfica viva',
    image:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&q=80',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsHorizontal(mm.matches);
    update();
    mm.addEventListener('change', update);
    return () => mm.removeEventListener('change', update);
  }, []);

  const { atStart, atEnd, scrollByCard } = useHorizontalScroll(trackRef, {
    wheelEnabled: isHorizontal,
  });

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

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
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
      });

      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-services-card]');
        const trigger = ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, x: 40 },
              {
                opacity: 1,
                x: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out',
              },
            );
          },
          once: true,
        });

        return () => trigger.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative w-full bg-amber-50"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10">
        <div data-services-heading>
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [serviços]
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
            o que fazemos
          </h2>
        </div>
      </div>

      <div ref={pinRef} className="relative mt-12 w-full overflow-hidden">
        <ScrollArrows
          atStart={atStart}
          atEnd={atEnd}
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
        />

        <div
          ref={trackRef}
          className="flex w-max touch-pan-x gap-0 overflow-x-auto scroll-smooth px-[7.5vw] pb-6 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              data-services-card
              className="group relative h-[70vh] w-[85vw] shrink-0 snap-center sm:w-[60vw] lg:h-[80vh] lg:w-[32vw] lg:snap-align-none"
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
                • ver mais
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
    </section>
  );
}