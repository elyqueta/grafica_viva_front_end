'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PARTICLE_COUNT = 250;
const LOGO_SRC = '/logo.png';

type Point = { x: number; y: number };

function sampleLogoPoints(img: HTMLImageElement, boxW: number, boxH: number, count: number): Point[] {
  const canvas = document.createElement('canvas');
  canvas.width = boxW;
  canvas.height = boxH;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  ctx.drawImage(img, 0, 0, boxW, boxH);
  const { data } = ctx.getImageData(0, 0, boxW, boxH);

  const isFilled = (x: number, y: number) => {
    const i = (y * boxW + x) * 4;
    return data[i + 3] > 10 && (data[i] + data[i + 1] + data[i + 2]) / 3 < 250;
  };

  const cols = Math.ceil(Math.sqrt(count * (boxW / boxH)));
  const rows = Math.ceil(count / cols);
  const cellW = boxW / cols;
  const cellH = boxH / rows;

  const points: Point[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const startX = Math.floor(c * cellW);
      const startY = Math.floor(r * cellH);
      const endX = Math.min(boxW, Math.ceil(startX + cellW));
      const endY = Math.min(boxH, Math.ceil(startY + cellH));

      const cellPoints: Point[] = [];
      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          if (isFilled(x, y)) cellPoints.push({ x, y });
        }
      }
      if (cellPoints.length > 0) {
        points.push(cellPoints[Math.floor(cellPoints.length / 2)]);
      }
    }
  }
  return points;
}

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const finish = () => {
        document.body.style.overflow = '';
        setDone(true);
      };

      const moveToNavbarAndReveal = (tl: gsap.core.Timeline) => {
        const target = document.getElementById('nav-logo-target');
        const heroEls = document.querySelectorAll('[data-hero-fade]');
        const rect = target?.getBoundingClientRect();

        if (rect && logoRef.current) {
          tl.to(logoRef.current, {
            width: rect.width,
            height: rect.height,
            x: rect.left,
            y: rect.top,
            duration: 0.9,
            ease: 'power3.inOut',
          }, '+=0.35');
        } else {
          tl.to({}, { duration: 0.35 });
        }

        tl.to(containerRef.current, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.9, ease: 'power2.inOut' }, '<');
        tl.to(heroEls, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '<+=0.15');
        tl.to(containerRef.current, { autoAlpha: 0, duration: 0.3, onComplete: finish }, '-=0.1');
      };

      const img = new Image();
      img.src = LOGO_SRC;

      img.onload = () => {
        const aspect = img.naturalWidth / img.naturalHeight;
        const boxH = window.innerWidth < 640 ? 110 : 160;
        const boxW = Math.round(boxH * aspect);
        const originX = window.innerWidth / 2 - boxW / 2;
        const originY = window.innerHeight / 2 - boxH / 2;

        const points = sampleLogoPoints(img, boxW, boxH, PARTICLE_COUNT);

        if (!points.length || !particlesRef.current) {
          const tl = gsap.timeline();
          if (logoRef.current) tl.to(logoRef.current, { opacity: 1, duration: 0.4 });
          moveToNavbarAndReveal(tl);
          return;
        }

        const dots = points.map(() => {
          const dot = document.createElement('div');
          dot.className = 'absolute left-0 top-0 h-[3px] w-[3px] rounded-full bg-black';
          particlesRef.current!.appendChild(dot);
          gsap.set(dot, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0.5,
          });
          return dot;
        });

        const tl = gsap.timeline();

        tl.to(dots, {
          opacity: 1,
          scale: 1,
          x: (i) => originX + points[i].x,
          y: (i) => originY + points[i].y,
          duration: 1.1,
          ease: 'power3.out',
          stagger: { each: 0.006, from: 'random' },
        });

        if (logoRef.current) {
          tl.set(logoRef.current, { width: boxW, height: boxH, x: originX, y: originY }, '+=0.8');
          tl.to(logoRef.current, { opacity: 1, duration: 0.3 }, '<');
          tl.to(dots, { opacity: 0, duration: 0.3 }, '<');
        }

        moveToNavbarAndReveal(tl);
      };

      img.onerror = () => {
        const tl = gsap.timeline();
        if (logoRef.current) tl.to(logoRef.current, { opacity: 1, duration: 0.4 });
        moveToNavbarAndReveal(tl);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-100 flex items-center justify-center bg-amber-50">
      <div ref={particlesRef} className="absolute inset-0" />
      <img
        ref={logoRef}
        src={LOGO_SRC}
        alt="Gráfica Viva"
        className="absolute left-0 top-0 opacity-0"
        style={{ willChange: 'transform, width, height, opacity' }}
      />
    </div>
  );
}