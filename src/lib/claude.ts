import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not set');
}

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CLAUDE_CONFIG = {
  // Stage 1: Vision + structured extraction — Haiku is sufficient for closed-enum classification
  extractModel: process.env.CLAUDE_EXTRACT_MODEL ?? process.env.CLAUDE_MODEL ?? 'claude-haiku-4-5-20251001',
  // Stage 3: User-facing creative narrative — Sonnet for quality
  narrativeModel: process.env.CLAUDE_NARRATIVE_MODEL ?? process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6',
  maxTokens: 512,
  temperature: 0.7,
} as const;
