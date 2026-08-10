'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/portfolio';


gsap.registerPlugin(ScrollTrigger);


export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      const track = trackRef.current!;

      // Aplica-se sempre — o pin passa a ser controlado pelo scroll vertical
      // (Lenis) em todos os tamanhos de ecrã, eliminando a necessidade de
      // scroll horizontal manual por toque.
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
        <div
          ref={trackRef}
          className="flex w-max gap-0 px-[7.5vw] lg:px-0"
        >
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio`}
              data-portfolio-card
              className="group relative h-[70vh] w-[85vw] shrink-0 sm:w-[60vw] lg:h-[80vh] lg:w-[32vw]"
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