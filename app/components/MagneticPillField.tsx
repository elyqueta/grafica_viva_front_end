'use client';

import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';

export type MagneticPillConfig = {
  id: string;
  label: string;
  color: string;
  style?: React.CSSProperties;
};

type MagneticPillFieldProps = {
  pills: MagneticPillConfig[];
  /** raio (px) a partir do qual um pill começa a reagir ao cursor */
  radius?: number;
  /** distância (px) ao cursor quando há vários pills ativos em simultâneo */
  ringRadius?: number;
  /** permite ao componente-pai aceder aos wrappers (ex: animações de entrada) */
  wrapperRefs?: MutableRefObject<(HTMLSpanElement | null)[]>;
  className?: string;
};

const DEFAULT_RADIUS = 160;
const DEFAULT_RING_RADIUS = 64;
const FADE_DURATION = 0.2;

/**
 * Gere um conjunto de "pills" magnéticos de uma secção como um único sistema,
 * em vez de cada um reagir isoladamente ao cursor.
 *
 * Porquê um único componente e não vários <MagneticPill /> independentes:
 * 1) Cliques: cada pill antigo precisava de `pointer-events-auto` no wrapper
 *    para o hover funcionar. Como a deteção agora é só `pointermove` global,
 *    isso deixou de ser necessário — e estava a bloquear links/botões por
 *    baixo. Aqui os wrappers são sempre `pointer-events-none`.
 * 2) Sobreposição: com vários pills independentes, dois podiam saltar para
 *    a mesma posição exata do cursor e ficar empilhados. Aqui o campo sabe
 *    quantos estão ativos e distribui-os num círculo à volta do cursor.
 */
export default function MagneticPillField({
  pills,
  radius = DEFAULT_RADIUS,
  ringRadius = DEFAULT_RING_RADIUS,
  wrapperRefs,
  className = '',
}: MagneticPillFieldProps) {
  const localWrapperRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillElRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const visibleRef = useRef<boolean[]>([]);

  useEffect(() => {
    visibleRef.current = pills.map(() => false);
  }, [pills.length]);

  useEffect(() => {
    // Estado inicial: todos escondidos até o cursor entrar no raio.
    pillElRefs.current.forEach((pillEl) => {
      if (pillEl) gsap.set(pillEl, { opacity: 0, scale: 0.6 });
    });

    const handlePointerMove = (e: PointerEvent) => {
      const distances: number[] = [];
      const deltas: { dx: number; dy: number }[] = [];

      // getBoundingClientRect é recalculado a cada evento de propósito:
      // os wrappers podem estar a "flutuar" (animação idle) ou a secção
      // pode ter scrollado, por isso a posição-âncora muda ao longo do tempo.
      localWrapperRefs.current.forEach((wrapper) => {
        if (!wrapper) {
          distances.push(Infinity);
          deltas.push({ dx: 0, dy: 0 });
          return;
        }
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        distances.push(Math.hypot(dx, dy));
        deltas.push({ dx, dy });
      });

      // Ordem estável (índice original), não por distância — evita que os
      // pills "troquem" de ângulo abruptamente quando um terceiro entra no raio.
      const activeIndices = distances
        .map((d, i) => i)
        .filter((i) => distances[i] < radius);
      const activeCount = activeIndices.length;

      localWrapperRefs.current.forEach((wrapper, i) => {
        const pillEl = pillElRefs.current[i];
        if (!wrapper || !pillEl) return;

        const isActive = distances[i] < radius;

        if (isActive) {
          const { dx, dy } = deltas[i];
          let targetX = dx;
          let targetY = dy;

          if (activeCount > 1) {
            const rank = activeIndices.indexOf(i);
            const angle = (2 * Math.PI * rank) / activeCount - Math.PI / 2;
            targetX = dx + ringRadius * Math.cos(angle);
            targetY = dy + ringRadius * Math.sin(angle);
          }

          // Sem tween na posição: aplica-se de imediato (tal como antes),
          // só opacity/scale é que têm easing de entrada/saída.
          gsap.set(pillEl, { x: targetX, y: targetY });

          if (!visibleRef.current[i]) {
            visibleRef.current[i] = true;
            gsap.to(pillEl, {
              opacity: 1,
              scale: 1,
              duration: FADE_DURATION,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        } else if (visibleRef.current[i]) {
          visibleRef.current[i] = false;
          gsap.to(pillEl, {
            opacity: 0,
            scale: 0.6,
            duration: FADE_DURATION,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pills, radius, ringRadius]);

  return (
    <>
      {pills.map((pill, index) => (
        <span
          key={pill.id}
          ref={(el) => {
            localWrapperRefs.current[index] = el;
            if (wrapperRefs) wrapperRefs.current[index] = el;
          }}
          className={`pointer-events-none absolute ${className}`}
          style={pill.style}
        >
          <span
            ref={(el) => {
              pillElRefs.current[index] = el;
            }}
            className={`pointer-events-none inline-block rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg ${pill.color}`}
          >
            {pill.label}
          </span>
        </span>
      ))}
    </>
  );
}