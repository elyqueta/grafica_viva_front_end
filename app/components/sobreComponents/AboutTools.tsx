"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Printer,
  PenTool,
  Palette,
  Scissors,
  Layers,
  Image as ImageIcon,
  Package,
  Recycle,
  Ruler,
  Paintbrush,
  FileText,
  Truck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Tool = {
  label: string;
  Icon: typeof Printer;
};

const TOOLS: Tool[] = [
  { label: "Impressão offset", Icon: Printer },
  { label: "Design vetorial", Icon: PenTool },
  { label: "Gestão de cor", Icon: Palette },
  { label: "Corte e vinco", Icon: Scissors },
  { label: "Acabamentos", Icon: Layers },
  { label: "Tratamento de imagem", Icon: ImageIcon },
  { label: "Embalagem", Icon: Package },
  { label: "Papel reciclado", Icon: Recycle },
  { label: "Medição rigorosa", Icon: Ruler },
  { label: "Ilustração", Icon: Paintbrush },
  { label: "Artes finais", Icon: FileText },
  { label: "Entrega e logística", Icon: Truck },
];

const FACTS: string[] = [
  "Sediados em Luanda",
  "A imprimir todos os dias",
  "Sempre a testar papel novo",
  "Atentos a cada detalhe",
  "De portas abertas a novos projectos",
];

export default function AboutTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-tools-heading]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from("[data-tool-item]", {
        opacity: 0,
        y: 16,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-tools-grid]", start: "top 85%" },
      });

      gsap.from("[data-fact-item]", {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-facts-list]", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div data-tools-heading className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-widest text-black/40">
          [com que trabalhamos]
        </p>
      </div>

      <div
        data-tools-grid
        className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6"
      >
        {TOOLS.map(({ label, Icon }) => (
          <div
            key={label}
            data-tool-item
            className="group relative flex aspect-square items-center justify-center rounded-sm bg-black/5 transition-colors hover:bg-black/10"
          >
            <Icon className="h-6 w-6 text-black/60 transition-colors group-hover:text-black" />

            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-black px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div
        data-facts-list
        className="mx-auto mt-24 max-w-md text-center sm:text-left"
      >
        <p className="text-xs font-semibold tracking-widest text-black/40">
          [agora]
        </p>
        <ul className="mt-6 space-y-3">
          {FACTS.map((fact) => (
            <li
              key={fact}
              data-fact-item
              className="text-base text-black/70 sm:text-lg"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
