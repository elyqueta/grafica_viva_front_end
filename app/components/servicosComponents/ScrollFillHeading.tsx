'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollFillHeadingProps = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
};

/**
 * Título cujos caracteres passam de text-black/25 a text-black à medida que
 * a secção atravessa o viewport, com scrub ligado directamente à posição do
 * scroll (sem pin, sem toggleActions de disparo único). Espaços nunca
 * precisam de ser "revelados", ficam sempre fora da animação.
 */
export default function ScrollFillHeading({
  text,
  className = '',
  as = 'h2',
}: ScrollFillHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const Tag = as;

  const characters = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = containerRef.current!.querySelectorAll('[data-fill-char]');

      gsap.to(chars, {
        color: 'var(--color-black, #000)',
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <Tag ref={containerRef as never} className={`text-black/25 ${className}`}>
      {characters.map((char, index) =>
        char === ' ' ? (
          <span key={index}>&nbsp;</span>
        ) : (
          <span key={index} data-fill-char>
            {char}
          </span>
        ),
      )}
    </Tag>
  );
}