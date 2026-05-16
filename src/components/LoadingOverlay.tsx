'use client';

import { useEffect, useState } from 'react';

const STAGES = [
  '顔のパーツを抽出中…',
  '魂の波長を測定中…',
  '歴史人物と照合中…',
] as const;

const PARTICLE_COUNT = 14;

type Props = {
  previewUrl: string;
  active: boolean;
};

export function LoadingOverlay({ previewUrl, active }: Props) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setStageIndex((i) => (i + 1) % STAGES.length);
    }, 1500);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/85 backdrop-blur-sm"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(253, 230, 138, 0.18), transparent 55%)',
          animation: 'hsmGlow 3.2s ease-in-out infinite',
        }}
      />

      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const left = (i * 137.508) % 100;
          const top = ((i * 73) % 80) + 10;
          const delay = (i % 7) * 0.45;
          const duration = 3.5 + (i % 5) * 0.7;
          return (
            <span
              key={i}
              className="absolute block w-1 h-1 rounded-full bg-amber-200/70"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animation: `hsmFloat ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      <div className="relative flex flex-col items-center gap-8 px-6">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden
              className="absolute inset-0 rounded-full border border-amber-200/60"
              style={{
                animation: `hsmPing 2.4s cubic-bezier(0, 0, 0.2, 1) ${i * 0.6}s infinite`,
              }}
            />
          ))}
          <div className="absolute inset-2 rounded-full overflow-hidden border border-amber-200/40 shadow-[0_0_40px_-10px_rgba(253,230,138,0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-2 min-h-[3rem]">
          <p
            key={stageIndex}
            className="text-amber-200 text-sm sm:text-base font-medium tracking-wide"
            style={{ animation: 'hsmFadeIn 600ms ease-out both' }}
          >
            {STAGES[stageIndex]}
          </p>
          <div className="flex justify-center gap-1.5">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-500 ${
                  i === stageIndex ? 'w-6 bg-amber-200' : 'w-2 bg-amber-200/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
