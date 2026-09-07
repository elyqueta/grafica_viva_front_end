"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticPillField, {
  MagneticPillConfig,
} from "./homeComponents/MagneticPillField";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  WHATSAPP_LINK,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  CONTACT_MAPS_URL,
} from "../lib/constants";

gsap.registerPlugin(ScrollTrigger);

const LINK_COLUMNS = [
  {
    heading: "[navegação]",
    items: [
      { label: "início", href: "/", external: false },
      { label: "serviços", href: "/servicos", external: false },
      { label: "sobre nós", href: "/sobre", external: false },
      { label: "parceiros", href: "/#parceiros", external: false },
      { label: "portfólio", href: "/portfolio", external: false },
      { label: "blog", href: "/blog", external: false },
      { label: "contactos", href: "/contactos", external: false },
    ],
  },
  {
    heading: "[redes]",
    items: [
      { label: "instagram", href: "https://instagram.com", external: true },
      { label: "whatsapp", href: WHATSAPP_LINK, external: true },
    ],
  },
];

const CONTACT_INFO = [
  { Icon: Mail, label: "email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { Icon: Phone, label: "telefone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, '')}` },
  { Icon: MapPin, label: "morada", value: CONTACT_ADDRESS, href: CONTACT_MAPS_URL },
];

const FOOTER_PILLS: MagneticPillConfig[] = [
  {
    id: "uma-ideia",
    label: "uma ideia?",
    color: "bg-violet-500",
    style: { top: "4%", right: "28%" },
  },
  {
    id: "tens-um-projecto",
    label: "tens um projecto?",
    color: "bg-sky-500",
    style: { top: "16%", right: "8%" },
  },
  {
    id: "o-teu-lugar",
    label: "o teu lugar",
    color: "bg-rose-500",
    style: { top: "30%", right: "18%" },
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const spacer = document.getElementById("page-footer-spacer");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer ?? footerRef.current,
          start: "top 90%",
        },
      });

      tl.from("[data-footer-label]", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(
          "[data-footer-heading]",
          { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
          "-=0.25",
        )
        .from(
          "[data-footer-wordmark]",
          { opacity: 0, scale: 0.9, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .from(
          "[data-footer-column]",
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          "[data-footer-divider]",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.2",
        )
        .from(
          "[data-footer-copyright]",
          { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: spacer ?? footerRef.current,
            start: "top 80%",
          },
        })
        .from(pillsRef.current, {
          opacity: 0,
          x: 220,
          rotate: () => gsap.utils.random(-12, 12),
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-amber-50 px-6 pb-10 pt-24 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 lg:block">
        <MagneticPillField pills={FOOTER_PILLS} wrapperRefs={pillsRef} />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-sm">
            <p
              data-footer-label
              className="text-xs font-semibold tracking-widest text-black/40"
            >
              [contacto]
            </p>
            <h2
              data-footer-heading
              className="mt-3 text-3xl font-extrabold text-black sm:text-4xl"
            >
              precisa de um orçamento?
            </h2>
            <p
              data-footer-heading
              className="mt-3 text-sm text-black/60 sm:text-base"
            >
              Soluções gráficas completas, do design à impressão final.
            </p>
            <Link
              data-footer-heading
              href="/orcamento"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              pedir orçamento
            </Link>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading} data-footer-column>
                <p className="text-xs font-semibold tracking-widest text-black/40">
                  {column.heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-black/70 transition-colors hover:text-black"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-black/70 transition-colors hover:text-black"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div data-footer-column>
              <p className="text-xs font-semibold tracking-widest text-black/40">
                [contactos]
              </p>
              <ul className="mt-3 space-y-3">
                {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm cursor-pointer font-medium text-black/70 transition-colors hover:text-black"
                    >
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          data-footer-wordmark
          className="mt-8 border-y border-black/10 py-8"
        >
          <p className="text-6xl font-extrabold tracking-tight text-black sm:text-8xl lg:text-9xl">
            [gráfica viva]
          </p>
        </div>

        <div data-footer-divider className="h-px w-full bg-black/10" />

        <p data-footer-copyright className="mt-6 text-xs text-black/40">
          desenhado e construído pela gráfica viva © 2026
        </p>
      </div>
    </footer>
  );
}
