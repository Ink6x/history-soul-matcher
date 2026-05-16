import type { FacialFeatureProfile } from '@/types/features';

export type HistoricalFigure = {
  id: string;
  name: string;
  era: string;
  traits: readonly string[];
  /**
   * Wikimedia Commons の Special:FilePath URL (リダイレクト経由で実体に解決)。
   * 例: https://commons.wikimedia.org/wiki/Special:FilePath/Odanobunaga.jpg?width=512
   * 解決失敗時は ComparisonCard 側でテキストプレースホルダーにフォールバック。
   */
  portraitUrl: string;
  features: FacialFeatureProfile;
};

export const wikimedia = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=512`;
