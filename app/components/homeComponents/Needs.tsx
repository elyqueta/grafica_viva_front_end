'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../../data/servicos';

gsap.registerPlugin(ScrollTrigger);

type Need = {
  slug: string;
  category: string;
  title: string;
  accent: string;
  image: string;
};

const NEEDS: Need[] = SERVICES.map((s) => ({
  slug: s.slug,
  category: s.needCategory,
  title: s.needTitle,
  accent: s.accent,
  image: s.image,
}));

export default function Needs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-needs-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('[data-needs-card]', {
        opacity: 0,
        scale: 1.04,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-needs-list]', start: 'top 85%' },
      });

      gsap.from('[data-needs-caption]', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-needs-list]', start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p data-needs-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [o que precisa?]
        </p>
        <h2 data-needs-reveal className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
          O que precisa para a sua marca?
        </h2>
        <p data-needs-reveal className="mt-4 text-base text-black/60 sm:text-lg">
          Encontre a solução certa para comunicar, promover e valorizar o seu negócio.
        </p>
      </div>

      <div
        data-needs-list
        className="mt-14 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {NEEDS.map((need) => (
          <div key={need.slug} data-needs-card>
            <Link
              href="/servicos"
              className="group relative block h-74 w-full overflow-hidden sm:h-72 lg:h-90"
            >
              <Image
                src={need.image}
                alt={need.title}
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />

              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 ${need.accent}`}
              >
                Ver soluções →
              </span>
            </Link>

            <div data-needs-caption className="px-1 py-4">
              <p className="text-base font-semibold text-black sm:text-lg">
                {need.title}
              </p>
              <p className="mt-1 text-sm text-black/45">{need.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
