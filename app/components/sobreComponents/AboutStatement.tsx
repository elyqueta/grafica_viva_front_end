'use client';

import { useEffect, useRef } from 'react';
import MediaReveal from '../MediaReveal';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const SOBRE_VIDEO = '/videos/sobre.mp4';

type ScatterImage = {
  src: string;
  alt: string;
  size: string; // largura responsiva
  position: string; // posição lg (absolute)
};

const IMAGES: ScatterImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&q=80',
    alt: 'Processo de impressão na Gráfica Viva',
    size: 'w-56 sm:w-64 lg:w-72',
    position: 'lg:left-[4%] lg:top-[4%]',
  },
  {
    src: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=700&q=80',
    alt: 'Embalagens produzidas pela Gráfica Viva',
    size: 'w-48 sm:w-56 lg:w-60',
    position: 'lg:left-1/2 lg:top-[36%] lg:-translate-x-1/2',
  },
  {
    src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=700&q=80',
    alt: 'Materiais gráficos da Gráfica Viva',
    size: 'w-56 sm:w-64 lg:w-80',
    position: 'lg:right-[6%] lg:top-[50%]',
  },
];

export default function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-scatter-image]', {
        opacity: 0,
        y: 40,
        rotate: 0,
        scale: 0.94,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('[data-scatter-text]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-amber-50 px-6 pb-24 pt-36 lg:px-10 lg:pt-44"
    >
      <div className="relative mx-auto flex max-w-3xl flex-col gap-10 lg:h-[90vh] lg:max-w-7xl lg:block">
        {IMAGES.map((img, index) => (
          <div
            key={img.src}
            data-scatter-image
            className={`relative mx-auto overflow-hidden border-white bg-white lg:absolute lg:mx-0 ${img.size} ${img.position} ${index === 0 ? 'aspect-[3/4] sm:aspect-[3/4] lg:aspect-[3/4]' : ''}`}
          >
            {index === 0 ? (
              <MediaReveal
                poster={img.src}
                alt={img.alt}
                videoSrc={SOBRE_VIDEO}
              />
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                width={700}
                height={840}
                className="h-auto w-full object-cover"
              />
            )}
          </div>
        ))}

        <div className="relative max-w-md lg:absolute lg:bottom-16 lg:left-0">
          <h2
            data-scatter-text
            className="text-3xl font-extrabold leading-tight text-black sm:text-2xl lg:text-4xl"
          >
            confiamos no olho, <br /> não no acaso.
          </h2>
          <p data-scatter-text className="mt-4 text-base text-black/60 sm:text-lg">
            reparamos no que a maioria ignora.
            <br />
            e nunca apressamos o processo.
          </p>
        </div>
      </div>
    </section>
  );
}