import { z } from 'zod';
import { MATCH_LEVELS } from './features';

export const FeatureBreakdownItemSchema = z.object({
  feature: z.string(),
  userValue: z.string(),
  figureValue: z.string(),
  matched: z.boolean(),
  contribution: z.number(),
  displayContribution: z.number().int().min(0).max(10),
  similarity: z.number().min(0).max(1),
  maxContribution: z.number(),
  matchLevel: z.enum(MATCH_LEVELS),
});

export const AnalysisResultSchema = z.object({
  person: z.string(),
  era: z.string(),
  matchRate: z.number().min(0).max(100),
  reason: z.string(),
  episode: z.string(),
  quote: z.string(),
  userPhotoDataUrl: z.string(),
  portraitUrl: z.string().url(),
  featureBreakdown: z.array(FeatureBreakdownItemSchema),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
