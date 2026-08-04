'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ShapeConfig = {
  id: string;
  label: string;
  guidePath: string;
  revealText: string;
};

const SHAPES: ShapeConfig[] = [
  {
    id: 'tesoura',
    label: 'desenha uma tesoura',
    guidePath: 'M40,30 L120,150 M120,30 L40,150',
    revealText: 'cortamos com precisão, nunca ao acaso.',
  },
  {
    id: 'pincel',
    label: 'desenha um pincel',
    guidePath: 'M80,15 L60,50 L100,50 Z M80,50 L80,150',
    revealText: 'desenhamos cada identidade à mão, antes de ir para a máquina.',
  },
  {
    id: 'carimbo',
    label: 'desenha um carimbo',
    guidePath:
      'M140,80 A60,60 0 1,1 20,80 A60,60 0 1,1 140,80 M50,85 L72,107 L115,55',
    revealText: 'só sai da gráfica o que passa no nosso controlo de qualidade.',
  },
];

const VIEW_SIZE = 160;
const SAMPLE_COUNT = 48;
const TOLERANCE = 14; // distância (em unidades do viewBox) considerada "em cima" do guia
const COMPLETE_RATIO = 0.65; // % da forma que precisa de ser coberta para considerar completo

function DiscoveryCanvas({ id, label, guidePath, revealText }: ShapeConfig) {
  const svgRef = useRef<SVGSVGElement>(null);
  const guideRef = useRef<SVGPathElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);
  const samplePointsRef = useRef<{ x: number; y: number }[]>([]);
  const coveredRef = useRef<boolean[]>([]);
  const isDrawingRef = useRef(false);

  const [strokes, setStrokes] = useState<{ x: number; y: number }[][]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const guide = guideRef.current;
    if (!guide) return;
    const totalLength = guide.getTotalLength();
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const point = guide.getPointAtLength((i / (SAMPLE_COUNT - 1)) * totalLength);
      points.push({ x: point.x, y: point.y });
    }
    samplePointsRef.current = points;
    coveredRef.current = new Array(SAMPLE_COUNT).fill(false);
  }, [guidePath]);

  useEffect(() => {
    if (!revealRef.current) return;
    if (isComplete) {
      gsap.fromTo(
        revealRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      );
    } else {
      gsap.set(revealRef.current, { opacity: 0, y: 10 });
    }
  }, [isComplete]);

  const toSvgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * VIEW_SIZE,
      y: ((clientY - rect.top) / rect.height) * VIEW_SIZE,
    };
  }, []);

  const markCoverage = useCallback((point: { x: number; y: number }) => {
    const samples = samplePointsRef.current;
    const covered = coveredRef.current;
    for (let i = 0; i < samples.length; i++) {
      if (covered[i]) continue;
      const dx = samples[i].x - point.x;
      const dy = samples[i].y - point.y;
      if (Math.sqrt(dx * dx + dy * dy) <= TOLERANCE) {
        covered[i] = true;
      }
    }
    const ratio = covered.filter(Boolean).length / covered.length;
    if (ratio >= COMPLETE_RATIO) {
      setIsComplete(true);
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isComplete) return;
    isDrawingRef.current = true;
    const point = toSvgPoint(e.clientX, e.clientY);
    setStrokes((prev) => [...prev, [point]]);
    markCoverage(point);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawingRef.current || isComplete) return;
    const point = toSvgPoint(e.clientX, e.clientY);
    setStrokes((prev) => {
      const next = [...prev];
      next[next.length - 1] = [...next[next.length - 1], point];
      return next;
    });
    markCoverage(point);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleReset = () => {
    setStrokes([]);
    setIsComplete(false);
    coveredRef.current = new Array(SAMPLE_COUNT).fill(false);
  };

  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium text-black/70">{label}</p>

      <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-sm bg-black/[0.03]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="h-full w-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <defs>
            <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="fill-black/15" />
            </pattern>
          </defs>
          <rect width={VIEW_SIZE} height={VIEW_SIZE} fill={`url(#dots-${id})`} />

          <path
            ref={guideRef}
            d={guidePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray="4 5"
            strokeLinecap="round"
            className={`transition-colors duration-500 ${
              isComplete ? 'text-rose-600/40' : 'text-black/25'
            }`}
          />

          {strokes.map((stroke, i) => (
            <polyline
              key={i}
              points={stroke.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="black"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {isComplete && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-2 top-2 rounded-sm bg-white/80 px-2 py-1 text-xs font-medium text-black/60 backdrop-blur-sm transition-colors hover:bg-white"
          >
            tentar outra vez
          </button>
        )}
      </div>

      <p ref={revealRef} className="mt-4 text-sm text-black/70 opacity-0">
        {revealText}
      </p>
    </div>
  );
}

export default function AboutDiscover() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-discover-reveal]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p data-discover-reveal className="text-xs font-semibold tracking-widest text-black/40">
          [descobre-nos]
        </p>
        <p data-discover-reveal className="mt-4 text-base text-black/60 sm:text-lg">
          desenha as formas abaixo e mostramos-te como trabalhamos.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {SHAPES.map((shape) => (
          <div key={shape.id} data-discover-reveal>
            <DiscoveryCanvas {...shape} />
          </div>
        ))}
      </div>
    </section>
  );
}