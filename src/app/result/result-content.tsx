'use client';

import { useEffect, useMemo, Suspense } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnalysisResultSchema, type AnalysisResult } from '@/types/analysis';
import { ComparisonCard } from '@/components/ComparisonCard';
import { FeatureBreakdown } from '@/components/FeatureBreakdown';

type LoadedState = {
  result: AnalysisResult | null;
  error: string | null;
};

function loadResult(searchParams: ReadonlyURLSearchParams): LoadedState {
  const id = searchParams.get('id');
  if (!id) return { result: null, error: '診断結果が見つかりません' };
  const raw = sessionStorage.getItem(`hsm:${id}`);
  if (!raw) {
    return {
      result: null,
      error: '診断結果の有効期限が切れました。もう一度診断してください。',
    };
  }
  try {
    return { result: AnalysisResultSchema.parse(JSON.parse(raw)), error: null };
  } catch {
    return { result: null, error: '診断結果の読み込みに失敗しました' };
  }
}

function ResultBody() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { result, error } = useMemo(() => loadResult(searchParams), [searchParams]);

  useEffect(() => {
    if (result) {
      document.title = `${result.person}と${result.matchRate}%一致 — 歴史人物 魂マッチング`;
    }
  }, [result]);

  const handleShare = async () => {
    if (!result) return;
    const text = `私の魂は${result.person}と${result.matchRate}%一致しているらしい`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({ title: '歴史人物 魂マッチング', text, url });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('リンクをコピーしました');
    } catch {
      alert('コピーに失敗しました');
    }
  };

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center space-y-6 max-w-md">
          <p className="text-zinc-300">{error}</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 h-12 rounded-full bg-amber-200 text-zinc-950 font-bold hover:bg-amber-100 transition-colors"
          >
            トップに戻る
          </button>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100 flex items-center justify-center">
        <p className="text-zinc-500">読み込み中…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100 px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col gap-8">
        <header className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-amber-200/70">
            Soul Match
          </p>
          <h1 className="text-2xl font-bold text-amber-200">
            あなたの魂は—
          </h1>
        </header>

        <section className="bg-zinc-900/60 border border-amber-200/20 rounded-2xl p-8 text-center space-y-4">
          <p className="text-sm text-zinc-400">{result.era}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-100">
            {result.person}
          </h2>
          <div className="pt-2">
            <p className="text-7xl font-black text-amber-200 leading-none">
              {result.matchRate}
              <span className="text-3xl font-bold align-top ml-1">%</span>
            </p>
            <p className="text-xs text-zinc-500 mt-2">match</p>
          </div>
        </section>

        <ComparisonCard
          userPhotoDataUrl={result.userPhotoDataUrl}
          portraitUrl={result.portraitUrl}
          person={result.person}
          matchRate={result.matchRate}
        />

        <section className="space-y-5 text-sm leading-relaxed">
          <div>
            <h3 className="text-amber-200/80 text-xs uppercase tracking-widest mb-2">
              診断
            </h3>
            <p className="text-zinc-200">{result.reason}</p>
          </div>
          <div>
            <h3 className="text-amber-200/80 text-xs uppercase tracking-widest mb-2">
              エピソード
            </h3>
            <p className="text-zinc-300">{result.episode}</p>
          </div>
          <div>
            <h3 className="text-amber-200/80 text-xs uppercase tracking-widest mb-2">
              名言
            </h3>
            <p className="text-zinc-100 italic border-l-2 border-amber-200/40 pl-4">
              {result.quote}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-amber-200/80 text-xs uppercase tracking-widest">
            特徴の一致
          </h3>
          <FeatureBreakdown items={result.featureBreakdown} />
          <p className="text-[10px] text-zinc-600 leading-relaxed pt-1">
            ※ 顔の各パーツを Claude Vision で構造化抽出し、各人物の特徴プロファイルと加重スコアで照合しています。
          </p>
        </section>

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="button"
            onClick={handleShare}
            className="w-full h-12 rounded-full bg-amber-200 text-zinc-950 font-bold hover:bg-amber-100 transition-colors"
          >
            シェアする
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full h-12 rounded-full border border-zinc-700 text-zinc-300 hover:bg-zinc-900 transition-colors"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultContent() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100 flex items-center justify-center">
        <p className="text-zinc-500">読み込み中…</p>
      </main>
    }>
      <ResultBody />
    </Suspense>
  );
}
