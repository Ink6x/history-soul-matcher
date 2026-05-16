import { NextRequest, NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { ZodError } from 'zod';
import { CLAUDE_CONFIG } from '@/lib/claude';
import { extractUserFeatures } from '@/lib/extract-features';
import { generateNarrative } from '@/lib/generate-narrative';
import { scoreFigures } from '@/lib/scoring';
import { HISTORICAL_FIGURES } from '@/content/historical-figures';
import { AnalysisResultSchema } from '@/types/analysis';

const IS_DEV = process.env.NODE_ENV !== 'production';

export const runtime = 'nodejs';
export const maxDuration = 30;

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: '画像ファイルが見つかりません' },
        { status: 400 },
      );
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { error: '対応していない画像形式です（JPEG / PNG / WebP / GIF のみ）' },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '画像サイズが大きすぎます（3MB 以内にしてください）' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
    console.log('[analyze] image:', { bytes: arrayBuffer.byteLength, mime: mediaType });

    // Stage 1: extract structured facial features from the user's photo.
    const userFeatures = await extractUserFeatures(base64, mediaType);

    // Stage 2: deterministic weighted scoring against all figures (no LLM).
    const { figure, matchRate, breakdown } = scoreFigures(userFeatures, HISTORICAL_FIGURES);
    console.log('[analyze] matched:', figure.id, 'rate:', matchRate);

    // Stage 3: narrative generation citing the top contributing features.
    const narrative = await generateNarrative({
      userFeatures,
      matchedFigure: figure,
      topBreakdownItems: breakdown.slice(0, 3),
      matchRate,
    });

    const userPhotoDataUrl = `data:${mediaType};base64,${base64}`;
    const payload = {
      person: figure.name,
      era: figure.era,
      matchRate,
      reason: narrative.reason,
      episode: narrative.episode,
      quote: narrative.quote,
      userPhotoDataUrl,
      portraitUrl: figure.portraitUrl,
      featureBreakdown: breakdown,
    };

    const result = AnalysisResultSchema.parse(payload);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      const status = error.status ?? 500;
      console.error(
        `[analyze] anthropic_api status=${status} extract=${CLAUDE_CONFIG.extractModel} narrative=${CLAUDE_CONFIG.narrativeModel} message=${error.message}`,
      );
      console.error('[analyze] anthropic_api body:', JSON.stringify(error.error ?? null));
      if (status === 429) {
        return NextResponse.json(
          {
            error: 'アクセスが集中しています。少し時間を置いて再度お試しください。',
            ...(IS_DEV && { detail: error.message }),
          },
          { status: 429 },
        );
      }
      if (status === 529) {
        return NextResponse.json(
          {
            error: 'AI が混み合っています。少し時間を置いて再度お試しください。',
            ...(IS_DEV && { detail: error.message }),
          },
          { status: 503 },
        );
      }
      return NextResponse.json(
        {
          error: '診断できませんでした。もう一度お試しください。',
          ...(IS_DEV && { detail: `anthropic_api ${status}: ${error.message}` }),
        },
        { status: 500 },
      );
    }
    if (error instanceof ZodError) {
      console.error('[analyze] zod_validation issues:', JSON.stringify(error.issues, null, 2));
      const firstIssue = error.issues[0];
      const detail = firstIssue
        ? `zod: ${firstIssue.path.join('.')} ${firstIssue.message}`
        : 'zod: validation failed';
      return NextResponse.json(
        {
          error: '診断結果の形式が不正でした。もう一度お試しください。',
          ...(IS_DEV && { detail }),
        },
        { status: 500 },
      );
    }
    console.error('[analyze] unknown error:', error instanceof Error ? error.stack ?? error.message : error);
    return NextResponse.json(
      {
        error: '診断できませんでした。もう一度お試しください。',
        ...(IS_DEV && { detail: error instanceof Error ? error.message : String(error) }),
      },
      { status: 500 },
    );
  }
}
