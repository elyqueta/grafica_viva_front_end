'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHorizontalScroll } from '@/app/lib/useHorizontalScroll';
import ScrollArrows from './ScrollArrows';

gsap.registerPlugin(ScrollTrigger);

type PortfolioCard = {
  slug: string;
  client: string;
  title: string;
  image: string;
};

const PROJECTS: PortfolioCard[] = [
  {
    slug: 'sabores-de-angola',
    client: 'sabores de angola',
    title: 'catálogo de produto',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
  },
  {
    slug: 'cafe-kianda',
    client: 'café kianda',
    title: 'rebranding e embalagem',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80',
  },
  {
    slug: 'mercado-central',
    client: 'mercado central',
    title: 'sinalética exterior',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
  },
  {
    slug: 'nova-vida-eventos',
    client: 'nova vida eventos',
    title: 'materiais de evento',
    image:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80',
  },
  {
    slug: 'grupo-luanda-norte',
    client: 'grupo luanda norte',
    title: 'identidade corporativa',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80',
  },
  {
    slug: 'feira-do-artesao',
    client: 'feira do artesão',
    title: 'sinalética e brindes',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
  },
];

export default function Portfolio() {
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
      gsap.from('[data-portfolio-heading]', {
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
        const cards = gsap.utils.toArray<HTMLElement>('[data-portfolio-card]');
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
      id="portfolio"
      ref={sectionRef}
      className="relative w-full bg-amber-50"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10">
        <div data-portfolio-heading>
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [portfólio]
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
            trabalhos realizados
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
          className="flex w-max gap-0 overflow-x-auto scroll-smooth px-[7.5vw] pb-6 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              data-portfolio-card
              className="group relative h-[70vh] w-[85vw] shrink-0 snap-center sm:w-[60vw] lg:h-[80vh] lg:w-[32vw] lg:snap-align-none"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 32vw, 85vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

              <span className="absolute right-4 top-4 rounded-sm bg-white px-4 py-2 text-xs font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                • ver caso
              </span>

              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
                <p className="text-sm text-black/80">
                  <span className="lowercase">{project.client}</span>
                  {' | '}
                  {project.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}