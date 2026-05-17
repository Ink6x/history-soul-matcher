import { describe, expect, it } from 'vitest';
import { impressionSimilarity } from './impression-similarity';

describe('impressionSimilarity', () => {
  it('returns 0 when either array is empty', () => {
    expect(impressionSimilarity([], ['stoic', 'intense'])).toBe(0);
    expect(impressionSimilarity(['stoic', 'intense'], [])).toBe(0);
    expect(impressionSimilarity([], [])).toBe(0);
  });

  it('returns 1.0 for identical tag sets', () => {
    const tags = ['stoic', 'determined', 'intense'];
    expect(impressionSimilarity(tags, tags)).toBe(1.0);
  });

  it('returns 1.0 for single identical tag', () => {
    expect(impressionSimilarity(['stoic'], ['stoic'])).toBe(1.0);
  });

  it('returns 0 for completely unrelated tags', () => {
    // 'serene' and 'intense' are in different groups
    expect(impressionSimilarity(['serene'], ['intense'])).toBe(0);
  });

  it('gives partial credit for tags in the same semantic group', () => {
    // 'stoic' and 'determined' are both in the "determined" group
    const sim = impressionSimilarity(['stoic'], ['determined']);
    expect(sim).toBeGreaterThan(0);
    expect(sim).toBeLessThan(1.0);
  });

  it('is case-insensitive', () => {
    expect(impressionSimilarity(['Stoic'], ['stoic'])).toBe(1.0);
    expect(impressionSimilarity(['INTENSE'], ['intense'])).toBe(1.0);
  });

  it('trims whitespace from tags', () => {
    expect(impressionSimilarity(['  stoic  '], ['stoic'])).toBe(1.0);
  });

  it('ignores empty string tags', () => {
    const result = impressionSimilarity(['stoic', ''], ['stoic']);
    expect(result).toBe(1.0);
  });

  it('returns value between 0 and 1', () => {
    const result = impressionSimilarity(
      ['stoic', 'intense', 'intellectual'],
      ['serene', 'determined', 'scholarly'],
    );
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1.0);
  });

  it('gives full credit for partial overlap', () => {
    // 2 exact matches out of 3 tags each → high similarity
    const sim = impressionSimilarity(
      ['stoic', 'intense', 'noble'],
      ['stoic', 'intense', 'serene'],
    );
    expect(sim).toBeGreaterThan(0.5);
  });

  it('semantically similar sets score higher than unrelated sets', () => {
    // Same group: determined / stoic / resolute
    const similarSim = impressionSimilarity(['determined'], ['resolute']);
    // Different groups: serene vs intense
    const unrelatedSim = impressionSimilarity(['serene'], ['intense']);
    expect(similarSim).toBeGreaterThan(unrelatedSim);
  });
});
