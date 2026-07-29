'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type ScrollArrowsProps = {
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
};

/** Setas de navegação para carrosséis horizontais — só mobile/tablet. */
export default function ScrollArrows({ atStart, atEnd, onPrev, onNext }: ScrollArrowsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-3 lg:hidden">
      <button
        type="button"
        onClick={onPrev}
        aria-label="anterior"
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/70 shadow-md transition-opacity duration-300 ${
          atStart ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="seguinte"
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/70 shadow-md transition-opacity duration-300 ${
          atEnd ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}