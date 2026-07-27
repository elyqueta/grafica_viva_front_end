"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SHOWCASE_STATES } from "./animations";

gsap.registerPlugin(ScrollTrigger);

const N = SHOWCASE_STATES.length;

export default function AnimatedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateSlides = (progress: number) => {
      const currentPos = progress * (N - 1);
      // ...mantém tudo o que já tinhas aqui dentro...
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${(N - 1) * window.innerHeight * 15}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: true, // <- TEMPORÁRIO, só para debug
      onUpdate: (self) => {
        gsap.set(track, { xPercent: -self.progress * ((N - 1) / N) * 100 });
        updateSlides(self.progress);
        const debugEl = document.getElementById("gv-debug");
        if (debugEl) {
          debugEl.textContent = `progress: ${self.progress.toFixed(3)} | end: ${Math.round(self.end)}px`;
        }
      },
      onRefresh: (self) => updateSlides(self.progress),
    });

    updateSlides(0);
    return () => st.kill();
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-amber-50"
    >
      <span className="pointer-events-none absolute left-6 top-28 z-20 text-xs uppercase tracking-widest text-black/50 lg:left-16 lg:top-32">
        porque escolher
      </span>
      <div ref={trackRef} className="flex h-full pt-16 lg:pt-0 w-max will-change-transform">
        {SHOWCASE_STATES.map((state, index) => (
          <div
            key={state.id}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative flex h-full w-screen shrink-0 items-center px-6 lg:px-16"
          >
            <div
              ref={(el) => {
                mockupRefs.current[index] = el;
              }}
              className="pointer-events-none absolute right-0 top-1/2 hidden h-[68%] w-[34vw] -translate-y-1/2 lg:block"
            >
              <img src={state.image} alt={state.title} className="h-full w-full object-cover" />
            </div>

            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:pr-[36vw]">
              <h2
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="text-[13vw] font-bold uppercase leading-[0.85] tracking-tight text-[#1a1a1a] lg:text-[4.6vw]"
              >
                {state.title}
              </h2>

              <div className="flex flex-col gap-4">
                <span data-line className="text-xs uppercase tracking-widest text-black/50">
                  {state.subtitle}
                </span>
                <p data-line className="max-w-sm text-sm text-black/70 sm:text-base">
                  {state.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {state.advantages.map((adv) => (
                    <li key={adv} data-line className="flex items-center gap-2 text-sm text-black/70">
                      <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-rose-600" />
                      {adv}
                    </li>
                  ))}
                </ul>
                <a
                  data-line
                  href="#portfolio"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  {state.ctaLabel}
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}