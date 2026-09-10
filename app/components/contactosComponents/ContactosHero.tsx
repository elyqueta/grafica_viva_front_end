'use client';

import { useEffect, useRef } from 'react';
import MediaReveal from '../MediaReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const CONTACTOS_HERO_VIDEO = '/videos/contacto.mp4';

export default function ContactosHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-contactos-hero]', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
        <MediaReveal
          poster="https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=1600&q=80"
          alt="Contactos"
          priority
          videoSrc={CONTACTOS_HERO_VIDEO}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
          <div className="mx-auto max-w-4xl">
            <h1
              data-contactos-hero
              className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Fala connosco
            </h1>
            <p
              data-contactos-hero
              className="mt-2 text-base text-white/80 sm:text-lg"
            >
              A nossa porta está aberta. Se tens uma ideia ou um projecto para imprimir, fala connosco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
