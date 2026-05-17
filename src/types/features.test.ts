import { describe, expect, it } from 'vitest';
import {
  localizeFeatureValue,
  FACE_SHAPES,
  JAWLINES,
  EYE_SHAPES,
  EYE_SPACINGS,
  NOSE_SHAPES,
  BROW_SHAPES,
  LIP_FULLNESSES,
  CHEEKBONES,
} from './features';

describe('localizeFeatureValue', () => {
  it('localizes all faceShape values to Japanese', () => {
    for (const value of FACE_SHAPES) {
      const result = localizeFeatureValue('faceShape', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value); // should be translated, not pass-through
    }
  });

  it('localizes all jawline values to Japanese', () => {
    for (const value of JAWLINES) {
      const result = localizeFeatureValue('jawline', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('localizes all eyeShape values to Japanese', () => {
    for (const value of EYE_SHAPES) {
      const result = localizeFeatureValue('eyeShape', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('localizes all eyeSpacing values to Japanese', () => {
    for (const value of EYE_SPACINGS) {
      const result = localizeFeatureValue('eyeSpacing', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('localizes all noseShape values to Japanese', () => {
    for (const value of NOSE_SHAPES) {
      const result = localizeFeatureValue('noseShape', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('localizes all browShape values to Japanese', () => {
    for (const value of BROW_SHAPES) {
      const result = localizeFeatureValue('browShape', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('localizes all lipFullness values to Japanese', () => {
    for (const value of LIP_FULLNESSES) {
      const result = localizeFeatureValue('lipFullness', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('localizes all cheekbones values to Japanese', () => {
    for (const value of CHEEKBONES) {
      const result = localizeFeatureValue('cheekbones', value);
      expect(result).toBeTruthy();
      expect(result).not.toBe(value);
    }
  });

  it('returns value as-is for overallImpression', () => {
    expect(localizeFeatureValue('overallImpression', 'stoic')).toBe('stoic');
    expect(localizeFeatureValue('overallImpression', 'any-tag')).toBe('any-tag');
  });

  it('spot checks specific translations', () => {
    expect(localizeFeatureValue('faceShape', 'oval')).toBe('卵型');
    expect(localizeFeatureValue('jawline', 'sharp')).toBe('鋭角');
    expect(localizeFeatureValue('eyeShape', 'almond')).toBe('アーモンド型');
    expect(localizeFeatureValue('eyeSpacing', 'average')).toBe('標準');
    expect(localizeFeatureValue('noseShape', 'aquiline')).toBe('鷲鼻');
    expect(localizeFeatureValue('browShape', 'bushy')).toBe('濃く密集');
    expect(localizeFeatureValue('lipFullness', 'medium')).toBe('標準');
    expect(localizeFeatureValue('cheekbones', 'high')).toBe('高い');
  });
});
