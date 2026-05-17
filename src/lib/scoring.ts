import type { HistoricalFigure } from '@/content/historical-figures';
import {
  FEATURE_WEIGHTS,
  localizeFeatureValue,
  type IntensityKey,
  type UserFacialProfile,
  type FeatureBreakdownItem,
  type FeatureKey,
} from '@/types/features';
import {
  BROW_SHAPE_SIMILARITY,
  CHEEKBONES_SIMILARITY,
  EYE_SHAPE_SIMILARITY,
  EYE_SPACING_SIMILARITY,
  FACE_SHAPE_SIMILARITY,
  JAWLINE_SIMILARITY,
  LIP_FULLNESS_SIMILARITY,
  NOSE_SHAPE_SIMILARITY,
  DISPLAY_BASE_CAP,
  MATCHED_THRESHOLD,
  applyIntensityAdjustment,
  toMatchLevel,
} from '@/types/feature-similarity';
import { impressionSimilarity } from './impression-similarity';

const CATEGORICAL_KEYS: ReadonlyArray<Exclude<FeatureKey, 'overallImpression'>> = [
  'faceShape', 'jawline', 'eyeShape', 'eyeSpacing',
  'noseShape', 'browShape', 'lipFullness', 'cheekbones',
];

const MATCH_RATE_FLOOR = 20;

const FEATURE_WEIGHTS_TOTAL = Object.values(FEATURE_WEIGHTS).reduce((sum, w) => sum + w, 0);

function getCategoricalSimilarity(
  key: Exclude<FeatureKey, 'overallImpression'>,
  userValue: string,
  figureValue: string,
): number {
  switch (key) {
    case 'faceShape':
      return FACE_SHAPE_SIMILARITY[userValue as keyof typeof FACE_SHAPE_SIMILARITY]?.[figureValue as keyof typeof FACE_SHAPE_SIMILARITY] ?? 0;
    case 'jawline':
      return JAWLINE_SIMILARITY[userValue as keyof typeof JAWLINE_SIMILARITY]?.[figureValue as keyof typeof JAWLINE_SIMILARITY] ?? 0;
    case 'eyeShape':
      return EYE_SHAPE_SIMILARITY[userValue as keyof typeof EYE_SHAPE_SIMILARITY]?.[figureValue as keyof typeof EYE_SHAPE_SIMILARITY] ?? 0;
    case 'eyeSpacing':
      return EYE_SPACING_SIMILARITY[userValue as keyof typeof EYE_SPACING_SIMILARITY]?.[figureValue as keyof typeof EYE_SPACING_SIMILARITY] ?? 0;
    case 'noseShape':
      return NOSE_SHAPE_SIMILARITY[userValue as keyof typeof NOSE_SHAPE_SIMILARITY]?.[figureValue as keyof typeof NOSE_SHAPE_SIMILARITY] ?? 0;
    case 'browShape':
      return BROW_SHAPE_SIMILARITY[userValue as keyof typeof BROW_SHAPE_SIMILARITY]?.[figureValue as keyof typeof BROW_SHAPE_SIMILARITY] ?? 0;
    case 'lipFullness':
      return LIP_FULLNESS_SIMILARITY[userValue as keyof typeof LIP_FULLNESS_SIMILARITY]?.[figureValue as keyof typeof LIP_FULLNESS_SIMILARITY] ?? 0;
    case 'cheekbones':
      return CHEEKBONES_SIMILARITY[userValue as keyof typeof CHEEKBONES_SIMILARITY]?.[figureValue as keyof typeof CHEEKBONES_SIMILARITY] ?? 0;
  }
}

/**
 * Score a single historical figure against the user's facial profile.
 * Returns rawScore (used for figure comparison) and matchRate (display value, floored at 20).
 */
export function scoreFigure(
  user: UserFacialProfile,
  figure: HistoricalFigure,
): { matchRate: number; rawScore: number; breakdown: FeatureBreakdownItem[] } {
  const breakdown: FeatureBreakdownItem[] = [];
  let totalRaw = 0;

  for (const key of CATEGORICAL_KEYS) {
    const userValue = user[key];
    const figureValue = figure.features[key];
    const rawSimilarity = getCategoricalSimilarity(key, userValue, figureValue);
    const weight = FEATURE_WEIGHTS[key];
    // contribution uses raw similarity for matchRate integrity (best-figure selection)
    const contribution = Math.round(weight * rawSimilarity);
    totalRaw += contribution;

    // displayContribution uses intensity-adjusted similarity for richer visual spread
    const userIntensity = user[`${key}Intensity` as IntensityKey];
    const cappedSim = Math.min(rawSimilarity, DISPLAY_BASE_CAP);
    const displaySim = applyIntensityAdjustment(cappedSim, userIntensity);
    const displayContribution = Math.round(displaySim * weight);

    breakdown.push({
      feature: key,
      userValue: localizeFeatureValue(key, userValue),
      figureValue: localizeFeatureValue(key, figureValue),
      matched: displaySim >= MATCHED_THRESHOLD,
      contribution,
      displayContribution,
      similarity: rawSimilarity,
      maxContribution: weight,
      matchLevel: toMatchLevel(displaySim),
    });
  }

  const impressionWeight = FEATURE_WEIGHTS.overallImpression;
  const impressionSim = impressionSimilarity(user.overallImpression, figure.features.overallImpression);
  const impressionContribution = Math.round(impressionWeight * impressionSim);
  totalRaw += impressionContribution;

  const sum8Display = breakdown.reduce((s, i) => s + i.displayContribution, 0);
  const max8Display = breakdown.reduce((s, i) => s + i.maxContribution, 0);
  const derivedRatio = max8Display > 0 ? sum8Display / max8Display : 0;
  const derivedDisplayScore = Math.round(derivedRatio * impressionWeight);
  const derivedMatchLevel = toMatchLevel(derivedRatio);

  const userImpression = user.overallImpression.join(', ') || '—';
  const figureImpression = figure.features.overallImpression.join(', ') || '—';
  breakdown.push({
    feature: 'overallImpression',
    userValue: userImpression,
    figureValue: figureImpression,
    matched: derivedDisplayScore >= impressionWeight,
    contribution: impressionContribution,
    displayContribution: derivedDisplayScore,
    similarity: derivedRatio,
    maxContribution: impressionWeight,
    matchLevel: derivedMatchLevel,
  });

  const rawScore = Math.min(100, Math.round((totalRaw / FEATURE_WEIGHTS_TOTAL) * 100));
  // Apply floor only for display; rawScore is used for figure comparison in scoreFigures.
  const matchRate = Math.max(MATCH_RATE_FLOOR, rawScore);
  breakdown.sort((a, b) => b.contribution - a.contribution);
  return { matchRate, rawScore, breakdown };
}

/**
 * Stage 2: Pure function — scan all figures and return the best match.
 * No LLM involved; same input always returns the same figure (deterministic).
 */
export function scoreFigures(
  user: UserFacialProfile,
  figures: readonly HistoricalFigure[],
): { figure: HistoricalFigure; matchRate: number; breakdown: FeatureBreakdownItem[] } {
  if (figures.length === 0) throw new Error('scoreFigures: empty figures list');
  let bestFigure = figures[0];
  let bestRaw = -1;
  let bestMatchRate = MATCH_RATE_FLOOR;
  let bestBreakdown: FeatureBreakdownItem[] = [];
  for (const f of figures) {
    const { rawScore, matchRate, breakdown } = scoreFigure(user, f);
    if (rawScore > bestRaw) {
      bestRaw = rawScore;
      bestMatchRate = matchRate;
      bestFigure = f;
      bestBreakdown = breakdown;
    }
  }
  return { figure: bestFigure, matchRate: bestMatchRate, breakdown: bestBreakdown };
}
