import { describe, expect, it } from 'vitest';
import {
  BROW_SHAPE_SIMILARITY,
  CHEEKBONES_SIMILARITY,
  EYE_SHAPE_SIMILARITY,
  EYE_SPACING_SIMILARITY,
  FACE_SHAPE_SIMILARITY,
  JAWLINE_SIMILARITY,
  LIP_FULLNESS_SIMILARITY,
  NOSE_SHAPE_SIMILARITY,
  toMatchLevel,
} from '@/types/feature-similarity';
import { scoreFigure, scoreFigures } from './scoring';
import { impressionSimilarity } from './impression-similarity';
import { DISPLAY_BASE_CAP, MATCHED_THRESHOLD } from '@/types/feature-similarity';
import type { HistoricalFigure } from '@/content/historical-figures';
import type { UserFacialProfile } from '@/types/features';

const ALL_MATRICES = [
  FACE_SHAPE_SIMILARITY,
  JAWLINE_SIMILARITY,
  EYE_SHAPE_SIMILARITY,
  EYE_SPACING_SIMILARITY,
  NOSE_SHAPE_SIMILARITY,
  BROW_SHAPE_SIMILARITY,
  LIP_FULLNESS_SIMILARITY,
  CHEEKBONES_SIMILARITY,
] as const;

const BASE_PROFILE: UserFacialProfile = {
  faceShape: 'oval',
  jawline: 'soft',
  eyeShape: 'almond',
  eyeSpacing: 'average',
  noseShape: 'straight',
  browShape: 'arched',
  lipFullness: 'medium',
  cheekbones: 'high',
  overallImpression: ['refined', 'calm'],
};

function makeFigure(features: UserFacialProfile): HistoricalFigure {
  return {
    id: 'test',
    name: 'Test Figure',
    era: 'Test Era',
    traits: [],
    portraitUrl: 'https://example.com/portrait.jpg',
    features,
  };
}

// ── Similarity matrix structural tests ──────────────────────────────────────

describe('similarity matrices', () => {
  it('diagonal entries are all 1.0', () => {
    for (const matrix of ALL_MATRICES) {
      for (const [key, row] of Object.entries(matrix)) {
        expect((row as Record<string, number>)[key]).toBe(1.0);
      }
    }
  });

  it('are symmetric: sim(a,b) === sim(b,a)', () => {
    for (const matrix of ALL_MATRICES) {
      const entries = Object.entries(matrix);
      for (const [a, rowA] of entries) {
        for (const [b, sim] of Object.entries(rowA as Record<string, number>)) {
          const reverse = (matrix as Record<string, Record<string, number>>)[b]?.[a];
          expect(reverse).toBe(sim);
        }
      }
    }
  });

  it('all values are in [0, 1]', () => {
    for (const matrix of ALL_MATRICES) {
      for (const row of Object.values(matrix)) {
        for (const val of Object.values(row as Record<string, number>)) {
          expect(val).toBeGreaterThanOrEqual(0);
          expect(val).toBeLessThanOrEqual(1);
        }
      }
    }
  });
});

// ── toMatchLevel ─────────────────────────────────────────────────────────────

describe('toMatchLevel', () => {
  it('returns exact for 1.0', () => expect(toMatchLevel(1.0)).toBe('exact'));
  it('returns close for 0.65', () => expect(toMatchLevel(0.65)).toBe('close'));
  it('returns close for 0.9', () => expect(toMatchLevel(0.9)).toBe('close'));
  it('returns partial for 0.35', () => expect(toMatchLevel(0.35)).toBe('partial'));
  it('returns partial for 0.5', () => expect(toMatchLevel(0.5)).toBe('partial'));
  it('returns weak for 0.1', () => expect(toMatchLevel(0.1)).toBe('weak'));
  it('returns none for 0.0', () => expect(toMatchLevel(0.0)).toBe('none'));
});

// ── scoreFigure ───────────────────────────────────────────────────────────────

describe('scoreFigure', () => {
  it('returns matchRate = 100 for identical profile (raw similarity intact for matchRate)', () => {
    // Without intensities, displayContribution = Math.round(DISPLAY_BASE_CAP * weight) = 8 per slot
    const figure = makeFigure({ ...BASE_PROFILE });
    const { matchRate, breakdown } = scoreFigure(BASE_PROFILE, figure);
    expect(matchRate).toBe(100);
    for (const item of breakdown) {
      if (item.feature === 'overallImpression') {
        // derived from 8-item displayContributions (all 8) → ratio 64/80 = 0.80 → display 8
        expect(item.displayContribution).toBeGreaterThanOrEqual(8);
        expect(['close', 'exact']).toContain(item.matchLevel);
      } else {
        // raw similarity stays 1.0 → contribution = maxContribution → matchRate = 100
        expect(item.similarity).toBe(1.0);
        expect(item.contribution).toBe(item.maxContribution);
        // display uses DISPLAY_BASE_CAP (0.80) without intensity → round(0.80*10) = 8
        expect(item.displayContribution).toBe(8);
        expect(item.matchLevel).toBe('close');
        // matched requires displaySim >= MATCHED_THRESHOLD (0.95); 0.80 < 0.95 → false without intensity
        expect(item.matched).toBe(false);
      }
    }
  });

  it('returns matchRate >= 20 (floor) even when all features differ', () => {
    const figure = makeFigure({
      faceShape: 'square',
      jawline: 'sharp',
      eyeShape: 'round',
      eyeSpacing: 'wide',
      noseShape: 'aquiline',
      browShape: 'thick',
      lipFullness: 'full',
      cheekbones: 'broad',
      overallImpression: ['fierce', 'bold'],
    });
    const { matchRate } = scoreFigure(BASE_PROFILE, figure);
    expect(matchRate).toBeGreaterThanOrEqual(20);
  });

  it('matched is true only when similarity is 1.0', () => {
    const figure = makeFigure({ ...BASE_PROFILE, faceShape: 'round' });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    expect(faceItem?.matched).toBe(false);
    expect(faceItem?.similarity).toBeGreaterThan(0);
    expect(faceItem?.similarity).toBeLessThan(1);
  });

  it('contribution is proportional to similarity × maxContribution', () => {
    const figure = makeFigure({ ...BASE_PROFILE, faceShape: 'round' });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    expect(faceItem).toBeDefined();
    const expected = Math.round(faceItem!.maxContribution * faceItem!.similarity);
    expect(faceItem!.contribution).toBe(expected);
    // oval→round: sim=0.60 → Math.round(0.60*10) = 6
    expect(faceItem!.displayContribution).toBe(6);
  });

  it('displayContribution is deterministic for the same input', () => {
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown: b1 } = scoreFigure(BASE_PROFILE, figure);
    const { breakdown: b2 } = scoreFigure(BASE_PROFILE, figure);
    for (let i = 0; i < b1.length; i++) {
      expect(b1[i].displayContribution).toBe(b2[i].displayContribution);
    }
  });

  it('displayContribution is Math.round(similarity * maxContribution) — deterministic 10-stage', () => {
    const figure = makeFigure({
      ...BASE_PROFILE,
      faceShape: 'round',    // oval→round: sim=0.60 → 6
      eyeShape: 'hooded',    // almond→hooded: sim=0.35 → 4
      lipFullness: 'thin',   // medium→thin: sim=0.50 → 5
      cheekbones: 'broad',   // high→broad: sim=0.45 → 5
    });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    const eyeItem = breakdown.find((i) => i.feature === 'eyeShape');
    const lipItem = breakdown.find((i) => i.feature === 'lipFullness');
    const jawItem = breakdown.find((i) => i.feature === 'jawline'); // soft→soft: same label → DISPLAY_BASE_CAP=0.80 → round(8.0)=8 without intensity
    expect(faceItem!.displayContribution).toBe(6);
    expect(eyeItem!.displayContribution).toBe(4);
    expect(lipItem!.displayContribution).toBe(5);
    expect(jawItem!.displayContribution).toBe(8);
  });

  it('breakdown is sorted by contribution descending', () => {
    const figure = makeFigure({ ...BASE_PROFILE, faceShape: 'round', eyeShape: 'narrow' });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    for (let i = 1; i < breakdown.length; i++) {
      expect(breakdown[i - 1].contribution).toBeGreaterThanOrEqual(breakdown[i].contribution);
    }
  });

  it('matchRate is clamped to [20, 100]', () => {
    const figures: HistoricalFigure[] = [
      makeFigure({ ...BASE_PROFILE }),
      makeFigure({
        faceShape: 'long',
        jawline: 'sharp',
        eyeShape: 'hooded',
        eyeSpacing: 'close',
        noseShape: 'broad',
        browShape: 'thick',
        lipFullness: 'thin',
        cheekbones: 'subtle',
        overallImpression: [],
      }),
    ];
    for (const f of figures) {
      const { matchRate } = scoreFigure(BASE_PROFILE, f);
      expect(matchRate).toBeGreaterThanOrEqual(20);
      expect(matchRate).toBeLessThanOrEqual(100);
    }
  });

  it('overallImpression.displayContribution mirrors the average of the 8 categorical items', () => {
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const impressionItem = breakdown.find((i) => i.feature === 'overallImpression');
    const categoricalItems = breakdown.filter((i) => i.feature !== 'overallImpression');
    const sum8 = categoricalItems.reduce((s, i) => s + i.displayContribution, 0);
    const max8 = categoricalItems.reduce((s, i) => s + i.maxContribution, 0);
    const expected = Math.round((sum8 / max8) * impressionItem!.maxContribution);
    expect(impressionItem?.displayContribution).toBe(expected);
  });

  it('overallImpression.matchLevel reflects the 8-item average (close when all items same label, no intensity)', () => {
    // Without intensities, each categorical display = 9. sum8/max8 = 72/80 = 0.90 → 'close'.
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const impressionItem = breakdown.find((i) => i.feature === 'overallImpression');
    expect(['close', 'exact']).toContain(impressionItem?.matchLevel);
    expect(impressionItem?.displayContribution).toBeGreaterThanOrEqual(8);
  });

  it('overallImpression.displayContribution stays high even when impression tags differ', () => {
    // Tags differ but all 8 categorical features are identical → impression should still be high
    const figure = makeFigure({
      ...BASE_PROFILE,
      overallImpression: ['fierce', 'bold', 'stormy'],
    });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const impressionItem = breakdown.find((i) => i.feature === 'overallImpression');
    expect(impressionItem?.displayContribution).toBeGreaterThanOrEqual(8);
  });

  it('browShape: arched vs thin → similarity 0.65 → close matchLevel, display 7 pts', () => {
    // arched→thin: sim=0.65 → Math.round(0.65*10) = 7
    const figure = makeFigure({ ...BASE_PROFILE, browShape: 'thin' });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const browItem = breakdown.find((i) => i.feature === 'browShape');
    expect(browItem?.similarity).toBe(0.65);
    expect(browItem?.matchLevel).toBe('close');
    expect(browItem?.displayContribution).toBe(7);
  });

  it('browShape: straight vs thick → similarity 0.70 → close matchLevel, display 7 pts', () => {
    // straight→thick: sim=0.70 → Math.round(0.70*10) = 7
    const figure = makeFigure({ ...BASE_PROFILE, browShape: 'thick' });
    const profile = { ...BASE_PROFILE, browShape: 'straight' as const };
    const { breakdown } = scoreFigure(profile, figure);
    const browItem = breakdown.find((i) => i.feature === 'browShape');
    expect(browItem?.similarity).toBe(0.70);
    expect(browItem?.matchLevel).toBe('close');
    expect(browItem?.displayContribution).toBe(7);
  });
});

// ── intensity-aware scoring ──────────────────────────────────────────────────

describe('intensity-aware scoring', () => {
  it('same-label + no intensity → displayContribution = round(DISPLAY_BASE_CAP * weight)', () => {
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    // no intensity → cappedSim = DISPLAY_BASE_CAP = 0.80 → round(8.0) = 8
    expect(faceItem?.displayContribution).toBe(8);
    expect(faceItem?.matchLevel).toBe('close');
  });

  it('same-label + high intensity (10) → displayContribution = 10 (matched)', () => {
    const profile: UserFacialProfile = { ...BASE_PROFILE, faceShapeIntensity: 10 };
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(profile, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    // delta=1.0, factor=1.40, sim=0.80*1.40=1.12→1.0, display=10
    expect(faceItem?.displayContribution).toBe(10);
    expect(faceItem?.matched).toBe(true);
    expect(faceItem?.matchLevel).toBe('exact');
  });

  it('same-label + low intensity (1) → displayContribution drops below 9', () => {
    const profile: UserFacialProfile = { ...BASE_PROFILE, faceShapeIntensity: 1 };
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(profile, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    // delta=-0.8, factor=0.68, sim=0.80*0.68=0.544, display=5
    expect(faceItem?.displayContribution).toBeLessThan(9);
    expect(faceItem?.matched).toBe(false);
  });

  it('different-label + high intensity → displayContribution further reduced', () => {
    const profile: UserFacialProfile = { ...BASE_PROFILE, faceShapeIntensity: 10 };
    const profileNoIntensity: UserFacialProfile = { ...BASE_PROFILE };
    const figure = makeFigure({ ...BASE_PROFILE, faceShape: 'round' });
    const { breakdown: withIntensity } = scoreFigure(profile, figure);
    const { breakdown: noIntensity } = scoreFigure(profileNoIntensity, figure);
    const withI = withIntensity.find((i) => i.feature === 'faceShape');
    const noI = noIntensity.find((i) => i.feature === 'faceShape');
    // High intensity on a mismatch amplifies the mismatch → lower display
    expect(withI!.displayContribution).toBeLessThan(noI!.displayContribution);
  });

  it('varied intensities on identical labels produce spread of displayContribution values', () => {
    const profile: UserFacialProfile = {
      ...BASE_PROFILE,
      faceShapeIntensity: 10,   // → display 10
      jawlineIntensity: 5,      // → display 8 (DISPLAY_BASE_CAP = 0.80 → 8)
      eyeShapeIntensity: 1,     // → display 6
      eyeSpacingIntensity: 8,   // → display 10
      noseShapeIntensity: 3,    // → display 7
    };
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(profile, figure);
    const categoricalItems = breakdown.filter((i) => i.feature !== 'overallImpression');
    const distinctValues = new Set(categoricalItems.map((i) => i.displayContribution));
    expect(distinctValues.size).toBeGreaterThanOrEqual(3);
  });

  it('rawScore / matchRate is unaffected by intensity (uses raw similarity)', () => {
    // Intensity only changes display; matchRate selection should be identical
    const profileHigh: UserFacialProfile = { ...BASE_PROFILE, faceShapeIntensity: 10 };
    const profileLow: UserFacialProfile = { ...BASE_PROFILE, faceShapeIntensity: 1 };
    const figure = makeFigure({ ...BASE_PROFILE });
    const { rawScore: highRaw } = scoreFigure(profileHigh, figure);
    const { rawScore: lowRaw } = scoreFigure(profileLow, figure);
    expect(highRaw).toBe(lowRaw);
  });

  it('MATCHED_THRESHOLD constant: same-label + intensity >= 8 reaches matched=true', () => {
    const profile: UserFacialProfile = { ...BASE_PROFILE, faceShapeIntensity: 8 };
    const figure = makeFigure({ ...BASE_PROFILE });
    const { breakdown } = scoreFigure(profile, figure);
    const faceItem = breakdown.find((i) => i.feature === 'faceShape');
    // delta=0.6, factor=1.24, sim=0.80*1.24=0.992 >= MATCHED_THRESHOLD(0.95)
    expect(faceItem?.matched).toBe(true);
  });
});

// ── 10-stage distribution ────────────────────────────────────────────────────

describe('10-stage distribution', () => {
  it('each similarity matrix produces at least 4 distinct rounded values across non-diagonal entries', () => {
    for (const matrix of ALL_MATRICES) {
      const rounded = new Set<number>();
      for (const [a, row] of Object.entries(matrix)) {
        for (const [b, val] of Object.entries(row as Record<string, number>)) {
          if (a !== b) rounded.add(Math.round((val as number) * 10));
        }
      }
      expect(rounded.size).toBeGreaterThanOrEqual(3);
    }
  });

  it('mixed-similarity profile produces at least 4 distinct displayContribution values', () => {
    const figure = makeFigure({
      faceShape: 'round',
      jawline: 'narrow',
      eyeShape: 'hooded',
      eyeSpacing: 'wide',
      noseShape: 'aquiline',
      browShape: 'thin',
      lipFullness: 'full',
      cheekbones: 'broad',
      overallImpression: ['fierce', 'bold'],
    });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    const categoricalItems = breakdown.filter((i) => i.feature !== 'overallImpression');
    const distinctValues = new Set(categoricalItems.map((i) => i.displayContribution));
    expect(distinctValues.size).toBeGreaterThanOrEqual(4);
  });

  it('displayContribution values are always in [0, 10]', () => {
    const figure = makeFigure({
      faceShape: 'square',
      jawline: 'sharp',
      eyeShape: 'round',
      eyeSpacing: 'wide',
      noseShape: 'broad',
      browShape: 'thick',
      lipFullness: 'full',
      cheekbones: 'broad',
      overallImpression: [],
    });
    const { breakdown } = scoreFigure(BASE_PROFILE, figure);
    for (const item of breakdown) {
      expect(item.displayContribution).toBeGreaterThanOrEqual(0);
      expect(item.displayContribution).toBeLessThanOrEqual(10);
    }
  });
});

// ── impressionSimilarity ──────────────────────────────────────────────────────

describe('impressionSimilarity', () => {
  it('returns 0 when both sets are empty', () => {
    expect(impressionSimilarity([], [])).toBe(0);
  });

  it('returns 0 when either set is empty', () => {
    expect(impressionSimilarity(['serene'], [])).toBe(0);
    expect(impressionSimilarity([], ['calm'])).toBe(0);
  });

  it('returns 1.0 for identical tag sets', () => {
    expect(impressionSimilarity(['serene', 'noble'], ['serene', 'noble'])).toBe(1.0);
  });

  it('gives full credit for exact matches', () => {
    // ['a', 'b'] vs ['a', 'b', 'c']: 2 exact / avg(2, 3) = 2/2.5 = 0.8
    const sim = impressionSimilarity(['serene', 'noble'], ['serene', 'noble', 'fierce']);
    expect(sim).toBeCloseTo(0.8, 5);
  });

  it('gives GROUP_CREDIT (0.6) for same-group tag pairs', () => {
    // 'intellectual' and 'scholarly' are in the same group
    // ['intellectual'] vs ['scholarly']: 0.6 credit / avg(1, 1) = 0.6
    const sim = impressionSimilarity(['intellectual'], ['scholarly']);
    expect(sim).toBeCloseTo(0.6, 5);
    // 0.6 < close threshold (0.65) → partial
    expect(toMatchLevel(sim)).toBe('partial');
  });

  it('semantically similar sets reach partial level', () => {
    // Both tags are group-matched → 2 × 0.6 / avg(2, 2) = 1.2 / 2 = 0.6 → partial
    const sim = impressionSimilarity(['intellectual', 'serene'], ['scholarly', 'composed']);
    expect(sim).toBeCloseTo(0.6, 5);
    expect(toMatchLevel(sim)).toBe('partial');
  });

  it('unrelated tags give 0', () => {
    // 'serene' (calm group) vs 'fierce' (intense group) — different groups
    const sim = impressionSimilarity(['serene'], ['fierce']);
    expect(sim).toBe(0);
  });

  it('is case-insensitive', () => {
    const sim = impressionSimilarity(['Serene'], ['serene']);
    expect(sim).toBe(1.0);
  });
});

// ── scoreFigures ──────────────────────────────────────────────────────────────

describe('scoreFigures', () => {
  it('throws when given an empty array', () => {
    expect(() => scoreFigures(BASE_PROFILE, [])).toThrow('scoreFigures: empty figures list');
  });

  it('returns the figure with the highest matchRate', () => {
    const identical = { ...makeFigure({ ...BASE_PROFILE }), id: 'identical' };
    const dissimilar = {
      ...makeFigure({
        faceShape: 'long',
        jawline: 'sharp',
        eyeShape: 'hooded',
        eyeSpacing: 'close',
        noseShape: 'broad',
        browShape: 'thick',
        lipFullness: 'thin',
        cheekbones: 'subtle',
        overallImpression: [],
      }),
      id: 'dissimilar',
    };
    const { figure, matchRate } = scoreFigures(BASE_PROFILE, [dissimilar, identical]);
    expect(figure.id).toBe('identical');
    expect(matchRate).toBe(100);
  });
});
