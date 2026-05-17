import { describe, expect, it } from 'vitest';
import { AnalysisResultSchema, FeatureBreakdownItemSchema } from './analysis';

const VALID_BREAKDOWN_ITEM = {
  feature: 'faceShape',
  userValue: '卵型',
  figureValue: '卵型',
  matched: true,
  contribution: 10,
  displayContribution: 9,
  similarity: 1.0,
  maxContribution: 10,
  matchLevel: 'exact' as const,
};

const VALID_RESULT = {
  person: '織田信長',
  era: '戦国時代・日本, 1534-1582',
  matchRate: 78,
  reason: '鋭い顎のラインと高い頬骨が一致しています。',
  episode: '桶狭間の戦いで今川義元を破った。',
  quote: '是非に及ばず',
  userPhotoDataUrl: 'data:image/jpeg;base64,abc123',
  portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/example.jpg',
  featureBreakdown: [VALID_BREAKDOWN_ITEM],
};

describe('FeatureBreakdownItemSchema', () => {
  it('accepts a valid breakdown item', () => {
    expect(() => FeatureBreakdownItemSchema.parse(VALID_BREAKDOWN_ITEM)).not.toThrow();
  });

  it('rejects displayContribution above 10', () => {
    expect(() =>
      FeatureBreakdownItemSchema.parse({ ...VALID_BREAKDOWN_ITEM, displayContribution: 11 }),
    ).toThrow();
  });

  it('rejects displayContribution below 0', () => {
    expect(() =>
      FeatureBreakdownItemSchema.parse({ ...VALID_BREAKDOWN_ITEM, displayContribution: -1 }),
    ).toThrow();
  });

  it('rejects similarity above 1', () => {
    expect(() =>
      FeatureBreakdownItemSchema.parse({ ...VALID_BREAKDOWN_ITEM, similarity: 1.1 }),
    ).toThrow();
  });

  it('rejects similarity below 0', () => {
    expect(() =>
      FeatureBreakdownItemSchema.parse({ ...VALID_BREAKDOWN_ITEM, similarity: -0.1 }),
    ).toThrow();
  });

  it('rejects invalid matchLevel', () => {
    expect(() =>
      FeatureBreakdownItemSchema.parse({ ...VALID_BREAKDOWN_ITEM, matchLevel: 'perfect' }),
    ).toThrow();
  });

  it('accepts all valid matchLevel values', () => {
    const levels = ['exact', 'close', 'partial', 'weak', 'none'] as const;
    for (const matchLevel of levels) {
      expect(() =>
        FeatureBreakdownItemSchema.parse({ ...VALID_BREAKDOWN_ITEM, matchLevel }),
      ).not.toThrow();
    }
  });
});

describe('AnalysisResultSchema', () => {
  it('accepts a valid result', () => {
    expect(() => AnalysisResultSchema.parse(VALID_RESULT)).not.toThrow();
  });

  it('rejects matchRate above 100', () => {
    expect(() =>
      AnalysisResultSchema.parse({ ...VALID_RESULT, matchRate: 101 }),
    ).toThrow();
  });

  it('rejects matchRate below 0', () => {
    expect(() =>
      AnalysisResultSchema.parse({ ...VALID_RESULT, matchRate: -1 }),
    ).toThrow();
  });

  it('rejects invalid portraitUrl', () => {
    expect(() =>
      AnalysisResultSchema.parse({ ...VALID_RESULT, portraitUrl: 'not-a-url' }),
    ).toThrow();
  });

  it('rejects empty featureBreakdown', () => {
    const result = AnalysisResultSchema.safeParse({ ...VALID_RESULT, featureBreakdown: 'not-array' });
    expect(result.success).toBe(false);
  });

  it('returns typed object on valid parse', () => {
    const result = AnalysisResultSchema.parse(VALID_RESULT);
    expect(result.person).toBe('織田信長');
    expect(result.matchRate).toBe(78);
    expect(result.featureBreakdown).toHaveLength(1);
  });
});
