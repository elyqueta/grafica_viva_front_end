'use client';

import { useCallback, useEffect, useState } from 'react';

type Options = {
  /** ativa a conversão do scroll vertical (roda/trackpad) em scroll horizontal */
  wheelEnabled?: boolean;
};

/**
 * Hook reutilizável para carrosséis horizontais (Services, Portfolio, etc).
 * Expõe o estado de início/fim do scroll (para setas) e uma função para
 * avançar/recuar um card de cada vez. Funciona com touch nativo, wheel e
 * clique nas setas — o estado atStart/atEnd é calculado via listeners de
 * scroll, por isso reflete sempre a posição real do track.
 */
export function useHorizontalScroll(
  trackRef: React.RefObject<HTMLElement | null>,
  { wheelEnabled = false }: Options = {},
) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 0);
    setAtEnd(track.scrollLeft >= maxScroll - 1);
  }, [trackRef]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateEdges();

    track.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);

    const ro = new ResizeObserver(updateEdges);
    ro.observe(track);

    return () => {
      track.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
      ro.disconnect();
    };
  }, [trackRef, updateEdges]);

  useEffect(() => {
    if (!wheelEnabled || !trackRef.current) return;
    const track = trackRef.current;

    const onWheel = (e: WheelEvent) => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const atStartNow = track.scrollLeft <= 0;
      const atEndNow = track.scrollLeft >= maxScroll - 1;
      const scrollingRight = e.deltaY > 0 && !atEndNow;
      const scrollingLeft = e.deltaY < 0 && !atStartNow;

      if (scrollingRight || scrollingLeft) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };

    track.addEventListener('wheel', onWheel, { passive: false });
    return () => track.removeEventListener('wheel', onWheel);
  }, [wheelEnabled, trackRef]);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.firstElementChild as HTMLElement | null;
      const cardWidth = firstCard?.offsetWidth ?? track.clientWidth;
      track.scrollLeft += direction * cardWidth;
    },
    [trackRef],
  );

  return { atStart, atEnd, scrollByCard };
}