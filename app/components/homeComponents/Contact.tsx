'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';
import MagneticPillField, { MagneticPillConfig } from './MagneticPillField';

gsap.registerPlugin(ScrollTrigger);

const PILLS: MagneticPillConfig[] = [
  { id: 'uma-ideia', label: 'uma ideia?', color: 'bg-violet-500', style: { top: '8%', left: '6%' } },
  { id: 'tens-um', label: 'tens um', color: 'bg-amber-500', style: { top: '2%', left: '32%' } },
  { id: 'projeto', label: 'projeto?', color: 'bg-sky-500', style: { top: '14%', left: '58%' } },
  { id: 'vamos', label: 'vamos', color: 'bg-rose-500', style: { top: '58%', left: '4%' } },
  { id: 'conversar', label: 'conversar', color: 'bg-pink-400', style: { top: '64%', left: '28%' } },
  { id: 'fala-connosco', label: 'fala connosco', color: 'bg-orange-500', style: { top: '52%', left: '68%' } },
];

const WHATSAPP_LINK = 'https://wa.me/244924666323';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-contact-reveal]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(pillsRef.current, {
        opacity: 0,
        scale: 0.6,
        duration: 0.6,
        stagger: 0.06,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        onComplete: () => {
          pillsRef.current.forEach((pill) => {
            if (!pill) return;
            gsap.to(pill, {
              y: '+=14',
              x: `+=${gsap.utils.random(-10, 10)}`,
              rotate: gsap.utils.random(-4, 4),
              duration: gsap.utils.random(2.5, 4),
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contactos"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <MagneticPillField
          pills={PILLS}
          wrapperRefs={pillsRef}
          disabled={isMobile}
          className="opacity-40 scale-[0.65] sm:scale-75 lg:scale-100 lg:opacity-100"
        />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <p data-contact-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [contactos]
        </p>

        <h2
          data-contact-reveal
          className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl"
        >
          vamos construir algo com significado.
        </h2>

        <p data-contact-reveal className="mt-4 text-base text-black/60 sm:text-lg">
          a nossa porta está aberta. se tens uma ideia ou um projeto para
          imprimir, fala connosco.
        </p>

        <div data-contact-reveal className="mt-10">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            fala connosco
          </a>
        </div>

        <div
          data-contact-reveal
          className="mt-16 grid grid-cols-1 gap-6 border-t border-black/10 pt-10 text-left sm:grid-cols-3"
        >
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
            <div>
              <p className="text-xs text-black/40">email</p>
              <p className="text-sm font-medium text-black/80">
                geral@graficaviva.co.ao
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
            <div>
              <p className="text-xs text-black/40">telefone</p>
              <p className="text-sm font-medium text-black/80">
                +244 924 666 323
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
            <div>
              <p className="text-xs text-black/40">morada</p>
              <p className="text-sm font-medium text-black/80">
                Nova Vida, Luanda, Angola
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}