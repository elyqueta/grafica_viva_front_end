"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Conte-nos a sua ideia",
    description:
      "Explique-nos o que precisa e qual é o objetivo do seu projecto.",
  },
  {
    number: "02",
    title: "Criamos a solução",
    description:
      "A nossa equipa trabalha consigo para encontrar a melhor solução gráfica.",
  },
  {
    number: "03",
    title: "Aprove o projecto",
    description:
      "Analisamos consigo todos os detalhes antes de avançar para a produção.",
  },
  {
    number: "04",
    title: "Damos vida à ideia",
    description:
      "Produzimos o resultado final com atenção à qualidade e aos detalhes.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-how-reveal]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from("[data-how-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: { trigger: "[data-how-steps]", start: "top 80%" },
      });

      gsap.from("[data-how-step]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-how-steps]", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          data-how-reveal
          className="text-xs font-semibold tracking-widest text-black/40"
        >
          [como funciona]
        </p>
        <h2
          data-how-reveal
          className="mt-2 text-3xl font-extrabold text-black sm:text-4xl"
        >
          Da ideia ao resultado.
        </h2>
        <p data-how-reveal className="mt-4 text-base text-black/60 sm:text-lg">
          Um processo simples, transparente e pensado para transformar a sua
          ideia numa solução concreta.
        </p>
      </div>

      <div data-how-steps className="relative mx-auto mt-20 max-w-6xl">
        <div
          data-how-line
          className="absolute left-0 right-0 top-4 hidden h-px bg-black/10 lg:block"
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.number} data-how-step className="relative">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-amber-50">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-semibold text-black sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-black/60 sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
