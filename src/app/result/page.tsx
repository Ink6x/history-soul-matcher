import type { Metadata } from 'next';
import ResultContent from './result-content';

type Props = {
  searchParams: Promise<{ id?: string; p?: string; m?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const person = (sp.p ?? '歴史人物').slice(0, 30);
  const rateRaw = Number.parseInt(sp.m ?? '', 10);
  const matchRate =
    Number.isFinite(rateRaw) && rateRaw >= 0 && rateRaw <= 100 ? rateRaw : 0;

  const title = `${person}と${matchRate}%一致 — 歴史人物 魂マッチング`;
  const description = `あなたの魂は ${person} と ${matchRate}% 一致しているらしい。あなたも診断してみよう。`;
  const ogImage = `/api/og?person=${encodeURIComponent(person)}&matchRate=${matchRate}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page() {
  return <ResultContent />;
}
