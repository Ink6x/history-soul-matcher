'use client';

import { useState } from 'react';

type Props = {
  userPhotoDataUrl: string;
  portraitUrl: string;
  person: string;
  matchRate: number;
};

export function ComparisonCard({ userPhotoDataUrl, portraitUrl, person, matchRate }: Props) {
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section
      aria-label="あなたと歴史人物の写真比較"
      className="grid grid-cols-2 gap-3 sm:gap-4 items-center relative"
    >
      <figure className="flex flex-col items-center gap-2">
        <div className="w-full aspect-square rounded-2xl overflow-hidden border border-amber-200/30 bg-zinc-900/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userPhotoDataUrl}
            alt="あなたの写真"
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="text-xs text-zinc-400">あなた</figcaption>
      </figure>

      <figure className="flex flex-col items-center gap-2">
        <div className="w-full aspect-square rounded-2xl overflow-hidden border border-amber-200/30 bg-zinc-900/60 flex items-center justify-center">
          {portraitFailed ? (
            <div className="px-4 text-center">
              <p className="text-amber-200/80 text-3xl">🖼️</p>
              <p className="text-zinc-400 text-xs mt-2 leading-snug">
                {person}<br />の肖像
              </p>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portraitUrl}
              alt={`${person} の肖像`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
              onError={() => setPortraitFailed(true)}
            />
          )}
        </div>
        <figcaption className="text-xs text-amber-200/90">{person}</figcaption>
      </figure>

      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+0.75rem)] z-10 pointer-events-none"
      >
        <div className="rounded-full bg-zinc-950/90 border border-amber-200/60 px-3 py-1 shadow-lg shadow-amber-200/10">
          <span className="text-amber-200 text-sm font-bold tabular-nums">≈ {matchRate}%</span>
        </div>
      </div>
    </section>
  );
}
