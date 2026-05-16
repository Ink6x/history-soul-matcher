import { JAPANESE_FIGURES } from './figures/japanese';
import { WESTERN_POLITICAL_FIGURES } from './figures/western-political';
import { SCIENCE_FIGURES } from './figures/science';
import { ARTS_FIGURES } from './figures/arts';
import { RELIGION_PHILOSOPHY_FIGURES } from './figures/religion-philosophy';
import { EASTERN_FIGURES } from './figures/eastern';
import { FICTION_MYTH_FIGURES } from './figures/fiction-myth';
import { OTHER_LUMINARIES_FIGURES } from './figures/other-luminaries';
import type { HistoricalFigure } from './figures/_shared';

export type { HistoricalFigure } from './figures/_shared';
export { wikimedia } from './figures/_shared';

export const HISTORICAL_FIGURES = [
  ...JAPANESE_FIGURES,
  ...WESTERN_POLITICAL_FIGURES,
  ...SCIENCE_FIGURES,
  ...ARTS_FIGURES,
  ...RELIGION_PHILOSOPHY_FIGURES,
  ...EASTERN_FIGURES,
  ...FICTION_MYTH_FIGURES,
  ...OTHER_LUMINARIES_FIGURES,
] as const satisfies readonly HistoricalFigure[];
