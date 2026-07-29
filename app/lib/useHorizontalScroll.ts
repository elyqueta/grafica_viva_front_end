'use client';

import { useEffect } from 'react';

/**
 * Converte o scroll vertical da rodinha/trackpad em scroll horizontal
 * dentro do elemento referenciado. Útil para carrosséis horizontais quando
 * o scroll suave global (Lenis) não deixa o container scrollar sozinho.
 */
export function useHorizontalScroll(
  trackRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled || !trackRef.current) return;

    const track = trackRef.current;

    const onWheel = (e: WheelEvent) => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= maxScroll - 1;

      const scrollingRight = e.deltaY > 0 && !atEnd;
      const scrollingLeft = e.deltaY < 0 && !atStart;

      if (scrollingRight || scrollingLeft) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };

    track.addEventListener('wheel', onWheel, { passive: false });
    return () => track.removeEventListener('wheel', onWheel);
  }, [enabled, trackRef]);
}
