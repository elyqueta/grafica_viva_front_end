'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { number: '01', title: 'branco' },
  { number: '02', title: 'entropia' },
  { number: '03', title: 'pareto' },
  { number: '04', title: 'observador' },
  { number: '05', title: 'dicotomia' },
  { number: '06', title: 'escolha' },
  { number: '07', title: 'perda' },
  { number: '08', title: 'confiança' },
  { number: '09', title: 'resta' },
];

const WHATSAPP_LINK = 'https://wa.me/244924666323';

/* ------------------------------------------------------------------ */
/* wrapper de cada secção                                             */
/* ------------------------------------------------------------------ */

type ManifestSectionProps = {
  label: string;
  text: string;
  more?: string;
  sectionRef: (el: HTMLElement | null) => void;
  children: ReactNode;
};

function ManifestSection({ label, text, more, sectionRef, children }: ManifestSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section ref={sectionRef} className="flex min-h-[85vh] flex-col justify-center gap-16 py-16">
      <div data-manifest-reveal className="max-w-md">
        <p className="text-xs font-semibold tracking-widest text-black/40">{label}</p>
        <p className="mt-3 text-base leading-relaxed text-black/70 sm:text-lg">{text}</p>

        {more && (
          <>
            <div
              className={`grid transition-all duration-500 ease-out ${
                expanded ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm text-black/60">{more}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-black/50 transition-colors hover:text-black"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              {expanded ? 'mostrar menos' : 'saber mais'}
            </button>
          </>
        )}
      </div>

      <div data-manifest-reveal className="flex flex-1 items-center justify-center">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · branco                                                        */
/* ------------------------------------------------------------------ */

function VisualBranco() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const tween = gsap.to(cardRef.current, {
      rotate: 4,
      y: -8,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="h-40 w-32 -rotate-2 rounded-sm border border-black/10 bg-white shadow-[0_25px_60px_-25px_rgba(0,0,0,0.35)] sm:h-52 sm:w-40"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 02 · entropia                                                      */
/* ------------------------------------------------------------------ */

const DOT_COUNT = 36;

function VisualEntropia() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [energised, setEnergised] = useState(false);

  const scatter = (wide: boolean) => {
    dotsRef.current.forEach((dot) => {
      if (!dot) return;
      gsap.to(dot, {
        x: () => gsap.utils.random(wide ? -150 : -50, wide ? 150 : 50),
        y: () => gsap.utils.random(wide ? -90 : -30, wide ? 90 : 30),
        duration: 1.1,
        ease: 'power2.out',
      });
    });
  };

  useEffect(() => {
    scatter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-48 w-64 sm:h-56 sm:w-80">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-black/50"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setEnergised(true);
          scatter(true);
        }}
        className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 transition-colors hover:bg-black/10"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
        aplicar energia
      </button>
      {energised && <p className="text-xs text-black/40">a ordem custa energia para se manter</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · pareto                                                        */
/* ------------------------------------------------------------------ */

const BAR_COUNT = 18;

function VisualPareto() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [concentrated, setConcentrated] = useState(false);

  const toggle = () => {
    const next = !concentrated;
    setConcentrated(next);
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const height = next ? Math.max(8, 100 - i * i * 1.05) : 46;
      gsap.to(bar, { height, duration: 0.6, ease: 'power2.out', delay: i * 0.02 });
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex h-32 items-end gap-1.5 sm:h-40">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            style={{ height: 46 }}
            className="w-2.5 rounded-t-sm bg-black/60 sm:w-3"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 transition-colors hover:bg-black/10"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
        {concentrated ? 'repartir de forma igual' : 'ver como o valor se concentra'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · observador                                                    */
/* ------------------------------------------------------------------ */

function VisualObservador() {
  const ringsRef = useRef<HTMLDivElement>(null);
  const [approved, setApproved] = useState(false);

  const handleClick = () => {
    setApproved(true);
    if (!ringsRef.current) return;
    gsap.fromTo(
      ringsRef.current.querySelectorAll('[data-ring]'),
      { scale: 0.85, opacity: 0.6 },
      { scale: 1.15, opacity: 0, duration: 1, ease: 'power2.out', stagger: 0.1 },
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={ringsRef}
        className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56"
      >
        {[1, 2, 3].map((r) => (
          <div
            key={r}
            data-ring
            className="absolute rounded-full border border-black/15"
            style={{ height: `${r * 32}%`, width: `${r * 32}%` }}
          />
        ))}
        <button
          type="button"
          onClick={handleClick}
          aria-label="observar prova"
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-black/30 bg-white transition-transform hover:scale-105"
        >
          <span className="h-2 w-2 rounded-full bg-black" />
        </button>
      </div>
      <p className="text-xs text-black/40">
        {approved ? 'prova aprovada, segue para impressão' : 'clica para rever a prova'}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · dicotomia                                                     */
/* ------------------------------------------------------------------ */

type Side = 'tecnico' | 'ambos' | 'criativo';

const SIDE_TEXT: Record<Side, string> = {
  tecnico: 'este lado mede, calcula e verifica margens antes de qualquer máquina arrancar.',
  ambos: 'os dois lados vivem no mesmo processo, da folha em branco à entrega final.',
  criativo: 'este lado sente o que funciona visualmente, mesmo antes de saber explicar porquê.',
};

function VisualDicotomia() {
  const [side, setSide] = useState<Side>('ambos');

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex h-40 w-64 items-center justify-center sm:h-48 sm:w-72">
        <div
          className={`absolute left-1/2 h-36 w-36 -translate-x-[65%] rounded-full border border-black/20 transition-colors duration-300 sm:h-44 sm:w-44 ${
            side !== 'criativo' ? 'bg-black/15' : 'bg-transparent'
          }`}
        />
        <div
          className={`absolute left-1/2 h-36 w-36 -translate-x-[35%] rounded-full border border-black/20 transition-colors duration-300 sm:h-44 sm:w-44 ${
            side !== 'tecnico' ? 'bg-black/15' : 'bg-transparent'
          }`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
        <button
          type="button"
          onClick={() => setSide('tecnico')}
          className={side === 'tecnico' ? 'text-black' : 'text-black/35'}
        >
          o lado técnico
        </button>
        <span className="text-black/20">/</span>
        <button
          type="button"
          onClick={() => setSide('ambos')}
          className={side === 'ambos' ? 'text-black' : 'text-black/35'}
        >
          o ofício
        </button>
        <span className="text-black/20">/</span>
        <button
          type="button"
          onClick={() => setSide('criativo')}
          className={side === 'criativo' ? 'text-black' : 'text-black/35'}
        >
          o lado criativo
        </button>
      </div>

      <p className="max-w-xs text-center text-sm text-black/60">{SIDE_TEXT[side]}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 06 · escolha                                                       */
/* ------------------------------------------------------------------ */

const PAPERS = ['couché 300g', 'reciclado kraft', 'verjurado', 'brilho uv', 'linho texturado'];

function VisualEscolha() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const doorsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const openDoor = (i: number) => {
    if (openIndex !== null) return;
    setOpenIndex(i);
    const door = doorsRef.current[i];
    if (door) {
      gsap.to(door, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs text-black/40">cinco papéis, escolhe só um</p>
      <div className="flex gap-2 sm:gap-3">
        {PAPERS.map((paper, i) => (
          <div
            key={paper}
            className="relative h-36 w-12 overflow-hidden rounded-sm bg-black/5 sm:h-44 sm:w-16"
          >
            {openIndex === i && (
              <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-[10px] font-medium text-black/70">
                {paper}
              </span>
            )}
            <button
              ref={(el) => {
                doorsRef.current[i] = el;
              }}
              type="button"
              onClick={() => openDoor(i)}
              aria-label={`escolher ${paper}`}
              disabled={openIndex !== null}
              className="absolute inset-0 border border-black/20 bg-amber-50 disabled:cursor-default"
            />
          </div>
        ))}
      </div>
      {openIndex !== null && (
        <p className="text-xs text-black/40">
          escolheste {PAPERS[openIndex]}, as outras portas ficam fechadas
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 07 · perda                                                         */
/* ------------------------------------------------------------------ */

function VisualPerda() {
  const polyRef = useRef<SVGPolylineElement>(null);
  const pointsRef = useRef<number[]>([50, 50]);
  const [gain, setGain] = useState(0);
  const [loss, setLoss] = useState(0);

  const redraw = () => {
    const poly = polyRef.current;
    if (!poly) return;
    const points = pointsRef.current
      .map((v, i) => `${i * (240 / (pointsRef.current.length - 1 || 1))},${80 - v}`)
      .join(' ');
    poly.setAttribute('points', points);
  };

  const addPoint = (delta: number) => {
    const last = pointsRef.current[pointsRef.current.length - 1];
    pointsRef.current = [...pointsRef.current, Math.max(4, Math.min(76, last + delta))].slice(-12);
    redraw();
  };

  useEffect(() => {
    redraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 240 80" className="h-24 w-full max-w-xs sm:h-28">
        <polyline
          ref={polyRef}
          fill="none"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setGain((g) => g + 1);
            addPoint(4);
          }}
          className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 transition-colors hover:bg-black/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
          ganhar folha
        </button>
        <button
          type="button"
          onClick={() => {
            setLoss((l) => l + 1);
            addPoint(-8);
          }}
          className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 transition-colors hover:bg-black/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          perder folha
        </button>
      </div>
      <p className="text-xs text-black/40">
        ganhas {gain} folhas / perdes {loss} folhas
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 08 · confiança                                                     */
/* ------------------------------------------------------------------ */

function VisualConfianca() {
  const [meBar, setMeBar] = useState(50);
  const [clientBar, setClientBar] = useState(50);

  const trust = () => {
    setMeBar((v) => Math.min(100, v + 12));
    setClientBar((v) => Math.min(100, v + 8));
  };

  const betray = () => {
    setMeBar((v) => Math.max(0, v - 6));
    setClientBar((v) => Math.max(0, v - 18));
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <div>
        <p className="mb-1 text-xs text-black/40">[nós]</p>
        <div className="h-1.5 w-full rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-black transition-all duration-500"
            style={{ width: `${meBar}%` }}
          />
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs text-black/40">[cliente]</p>
        <div className="h-1.5 w-full rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-rose-600 transition-all duration-500"
            style={{ width: `${clientBar}%` }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-6 text-xs font-medium">
        <button type="button" onClick={trust} className="text-black/70 transition-colors hover:text-black">
          confiar
        </button>
        <button type="button" onClick={betray} className="text-black/70 transition-colors hover:text-black">
          trair
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* componente principal                                               */
/* ------------------------------------------------------------------ */

export default function PortfolioManifest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-manifest-intro]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });

      sectionRefs.current.forEach((section, i) => {
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        gsap.from(section.querySelectorAll('[data-manifest-reveal]'), {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div ref={containerRef} className="relative w-full bg-amber-50">
      {/* intro */}
      <section className="flex min-h-[70vh] w-full flex-col justify-center px-6 pb-16 pt-36 lg:px-10 lg:pt-44">
        <div className="ml-auto max-w-xl text-right">
          <p data-manifest-intro className="text-xs font-semibold tracking-widest text-black/40">
            [manifesto]
          </p>
          <p data-manifest-intro className="mt-6 text-xl leading-relaxed text-black sm:text-2xl">
            não vemos o design como decoração. tiramos o que é desnecessário de uma peça gráfica,
            de uma frase, de um dia inteiro de trabalho. o que fica não é menos, é mais claro.
          </p>
          <p data-manifest-intro className="mt-10 text-xs text-black/40">
            as ideias começam abaixo, desliza
          </p>
        </div>
      </section>

      <div className="relative mx-auto flex max-w-7xl gap-12 px-6 lg:px-10">
        {/* sidebar */}
        <aside className="sticky top-1/3 hidden h-fit w-32 shrink-0 self-start lg:block">
          <ul className="space-y-6">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.number}>
                <button
                  type="button"
                  onClick={() => scrollToSection(i)}
                  className="flex items-center gap-3 text-left"
                >
                  <span
                    className={`h-px shrink-0 transition-all duration-300 ${
                      activeIndex === i ? 'w-8 bg-black' : 'w-4 bg-black/20'
                    }`}
                  />
                  {activeIndex === i && (
                    <span className="flex items-baseline gap-2">
                      <span className="text-xs text-black/40">{item.number}</span>
                      <span className="text-sm font-semibold text-black">{item.title}</span>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* secções */}
        <div className="flex-1">
          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[0] = el;
            }}
            label="[antes da tinta]"
            text="todo o trabalho começa aqui. uma folha sem marcas é pura possibilidade, mas também o maior risco: o primeiro traço decide tudo o que vem a seguir."
            more="às vezes a decisão mais difícil de um projeto é não desenhar nada."
          >
            <VisualBranco />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[1] = el;
            }}
            label="[o rascunho]"
            text="uma ideia nasce dispersa, feita de referências, recortes e notas soltas. o nosso trabalho é dar ordem a esse caos antes de ele chegar à máquina."
            more="a máquina só recebe o ficheiro depois de a ideia ganhar forma."
          >
            <VisualEntropia />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[2] = el;
            }}
            label="[a tirania dos poucos]"
            text="o valor não se reparte de forma igual. um pequeno grupo de clientes e produtos sustenta quase tudo o resto. escolher bem esse grupo é o verdadeiro ofício."
            more="por isso preferimos poucos clientes bem tratados a muitos mal servidos."
          >
            <VisualPareto />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[3] = el;
            }}
            label="[o olhar final]"
            text="uma prova de impressão guarda todos os erros e todos os acertos ao mesmo tempo, até alguém a observar. é o nosso olhar treinado que decide o que sai da gráfica."
            more="nenhuma tiragem sai sem essa aprovação final."
          >
            <VisualObservador />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[4] = el;
            }}
            label="[o ofício]"
            text="um lado mede, calcula e verifica margens. o outro lado sente o que funciona visualmente antes de saber explicar porquê. os dois vivem no mesmo processo."
            more="um bom impresso nunca escolhe só um dos dois lados."
          >
            <VisualDicotomia />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[5] = el;
            }}
            label="[o peso do sim]"
            text="escolher é a arte de subtrair. cada papel e cada acabamento escolhido fecha a porta a todos os outros. cinco portas, abre só uma."
            more="por isso perguntamos sempre antes de decidir por ti."
          >
            <VisualEscolha />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[6] = el;
            }}
            label="[o que fica para trás]"
            text="uma folha desperdiçada pesa mais do que uma folha ganha. por isso conferimos duas vezes antes de qualquer máquina arrancar."
            more="prevenir custa sempre menos do que reimprimir."
          >
            <VisualPerda />
          </ManifestSection>

          <ManifestSection
            sectionRef={(el) => {
              sectionRefs.current[7] = el;
            }}
            label="[confiar antes de imprimir]"
            text="confiar não é um sentimento, é uma estratégia. voltamos a trabalhar com quem cumpre, e recomeçamos sempre sem guardar rancor."
            more="um fornecedor de confiança poupa tempo a toda a gente."
          >
            <VisualConfianca />
          </ManifestSection>

          {/* 09 · resta, secção final sem label/texto padrão */}
          <section
            ref={(el) => {
              sectionRefs.current[8] = el;
            }}
            className="flex min-h-[85vh] flex-col items-center justify-center gap-6 py-16 text-center"
          >
            <p data-manifest-reveal className="text-2xl font-semibold text-black sm:text-3xl">
              é tudo isto. e é suficiente.
            </p>
            <p data-manifest-reveal className="text-sm tracking-widest text-black/40">
              [gráfica viva]
            </p>
            <a
              data-manifest-reveal
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              se algo disto falou contigo, fala connosco
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}