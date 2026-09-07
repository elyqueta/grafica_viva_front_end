"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";
import { WHATSAPP_LINK, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "../../lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ sectionId }: { sectionId?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-contact-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <p
          data-contact-reveal
          className="text-xs font-semibold tracking-widest text-black/40"
        >
          [contactos]
        </p>

        <h2
          data-contact-reveal
          className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl"
        >
          vamos construir algo com significado.
        </h2>

        <p
          data-contact-reveal
          className="mt-4 text-base text-black/60 sm:text-lg"
        >
          a nossa porta está aberta. se tens uma ideia ou um projecto para
          imprimir, fala connosco.
        </p>

        <div data-contact-reveal className="mt-10">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
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
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
            <div>
              <p className="text-xs text-black/40">telefone</p>
              <p className="text-sm font-medium text-black/80">
                {CONTACT_PHONE}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
            <div>
              <p className="text-xs text-black/40">morada</p>
              <p className="text-sm font-medium text-black/80">
                {CONTACT_ADDRESS}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
