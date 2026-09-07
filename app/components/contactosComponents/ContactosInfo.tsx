'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { WHATSAPP_LINK, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS, ORCAMENTO_LINK } from '../../lib/constants';

export default function ContactosInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-contactos-info]', {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div data-contactos-info className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <Mail className="h-5 w-5 text-black/40" />
            <div>
              <p className="text-xs font-semibold text-black/40">email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-1 block text-sm text-black/80 underline underline-offset-4 hover:text-black"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div data-contactos-info className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <Phone className="h-5 w-5 text-black/40" />
            <div>
              <p className="text-xs font-semibold text-black/40">telefone</p>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="mt-1 block text-sm text-black/80 underline underline-offset-4 hover:text-black"
              >
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          <div data-contactos-info className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <MapPin className="h-5 w-5 text-black/40" />
            <div>
              <p className="text-xs font-semibold text-black/40">morada</p>
              <p className="mt-1 text-sm text-black/80">{CONTACT_ADDRESS}</p>
            </div>
          </div>
        </div>

        <div data-contactos-info className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ORCAMENTO_LINK}
            className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            pedir orçamento
          </Link>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            falar pelo whatsapp
          </a>
        </div>
      </div>
    </section>
  );
}
