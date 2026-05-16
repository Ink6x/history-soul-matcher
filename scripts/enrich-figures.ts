#!/usr/bin/env tsx
/**
 * Phase 2A — Re-label historical figures with the expanded vocabulary.
 *
 * Usage:  npx tsx scripts/enrich-figures.ts
 *
 * Fetches each figure's Wikimedia portrait, calls Claude Haiku with the new
 * 9-label vocabulary, and writes results to scripts/enriched-features.json.
 * Supports incremental runs: figures already in the JSON are skipped.
 */

import Anthropic from '@anthropic-ai/sdk';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local (Next.js convention) if API key not already in environment
const envLocalPath = path.join(__dirname, '../.env.local');
if (!process.env.ANTHROPIC_API_KEY && fsSync.existsSync(envLocalPath)) {
  for (const line of fsSync.readFileSync(envLocalPath, 'utf-8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '');
  }
}
const FIGURES_DIR = path.join(__dirname, '../src/content/figures');
const OUTPUT_JSON = path.join(__dirname, 'enriched-features.json');
const RATE_LIMIT_MS = 1200;

// ── Tool definition (expanded vocabulary) ────────────────────────────────────

const TOOL_NAME = 'extract_facial_features';

const INT_FIELD = (desc: string) => ({ type: 'integer' as const, minimum: 1, maximum: 10, description: desc });

const TOOL = {
  name: TOOL_NAME,
  description: '写真から顔の構造的特徴を抽出する',
  input_schema: {
    type: 'object' as const,
    properties: {
      faceShape:           { type: 'string', enum: ['oval','round','square','long','rectangular','heart','diamond','triangular','oblong'] },
      faceShapeIntensity:  INT_FIELD('顔の輪郭の顕著さ'),
      jawline:             { type: 'string', enum: ['sharp','soft','square','narrow','rounded','pointed','wide','recessed'] },
      jawlineIntensity:    INT_FIELD('顎ラインの顕著さ'),
      eyeShape:            { type: 'string', enum: ['almond','round','narrow','hooded','upturned','downturned','wide-open','monolid','deep-set'] },
      eyeShapeIntensity:   INT_FIELD('目の形の顕著さ'),
      eyeSpacing:          { type: 'string', enum: ['very-close','close','slightly-close','average','slightly-wide','wide','very-wide'] },
      eyeSpacingIntensity: INT_FIELD('目の間隔の顕著さ'),
      noseShape:           { type: 'string', enum: ['straight','aquiline','button','broad','narrow','upturned','bulbous','roman','flat'] },
      noseShapeIntensity:  INT_FIELD('鼻筋の顕著さ'),
      browShape:           { type: 'string', enum: ['arched','straight','thick','thin','angled','rounded','tapered','sparse','bushy'] },
      browShapeIntensity:  INT_FIELD('眉の顕著さ'),
      lipFullness:         { type: 'string', enum: ['very-thin','thin','medium-thin','medium','medium-full','full','very-full'] },
      lipFullnessIntensity:INT_FIELD('唇の厚みの顕著さ'),
      cheekbones:          { type: 'string', enum: ['high','subtle','broad','prominent','flat','angular','sculpted','rounded'] },
      cheekbonesIntensity: INT_FIELD('頬骨の顕著さ'),
      overallImpression: {
        type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 5,
        description: '形状から想起される印象タグ (英語短語) 3〜5個',
      },
    },
    required: [
      'faceShape','faceShapeIntensity','jawline','jawlineIntensity',
      'eyeShape','eyeShapeIntensity','eyeSpacing','eyeSpacingIntensity',
      'noseShape','noseShapeIntensity','browShape','browShapeIntensity',
      'lipFullness','lipFullnessIntensity','cheekbones','cheekbonesIntensity',
      'overallImpression',
    ],
  },
};

const SYSTEM_PROMPT = `あなたは冷静な解剖学的観察者です。肖像（写真・絵画・版画・彫刻）から被写体の顔の「形状」を客観的に観察し、構造化された属性として記述してください。

# 制約
- 人物の特定・推測禁止。年齢・人種・性別の断定禁止。主観的な美醜評価禁止。
- 絵画や版画の場合も、描かれた顔の造形から形状を推定してください。

# 出力
extract_facial_features ツールを使い、各カテゴリから1つ選択し強度スコア(1〜10)を記録してください。`;

// ── Image fetching ────────────────────────────────────────────────────────────

type MediaType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

const MIME_MAP: Record<string, MediaType> = {
  'image/jpeg': 'image/jpeg', 'image/jpg': 'image/jpeg',
  'image/png': 'image/png', 'image/webp': 'image/webp', 'image/gif': 'image/gif',
};

async function fetchImage(url: string): Promise<{ base64: string; mediaType: MediaType }> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'history-soul-matcher-relabeler/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const contentType = res.headers.get('content-type')?.split(';')[0]?.trim() ?? '';
  const mediaType = MIME_MAP[contentType];
  if (!mediaType) throw new Error(`Unsupported MIME: ${contentType}`);

  const buf = await res.arrayBuffer();
  if (buf.byteLength > 4 * 1024 * 1024) throw new Error(`Too large: ${buf.byteLength} bytes`);

  return { base64: Buffer.from(buf).toString('base64'), mediaType };
}

// ── Feature extraction ────────────────────────────────────────────────────────

interface EnrichedFeatures {
  faceShape: string; jawline: string; eyeShape: string; eyeSpacing: string;
  noseShape: string; browShape: string; lipFullness: string; cheekbones: string;
  overallImpression: string[];
}

async function extractFeatures(
  client: Anthropic,
  base64: string,
  mediaType: MediaType,
): Promise<EnrichedFeatures> {
  const resp = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    temperature: 0,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    tools: [TOOL],
    tool_choice: { type: 'tool', name: TOOL_NAME },
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
        { type: 'text', text: 'この肖像の顔の構造的特徴を抽出してください。' },
      ],
    }],
  });

  const toolUse = resp.content.find((b) => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') throw new Error('No tool_use block');

  const inp = toolUse.input as Record<string, unknown>;
  return {
    faceShape:        inp.faceShape as string,
    jawline:          inp.jawline as string,
    eyeShape:         inp.eyeShape as string,
    eyeSpacing:       inp.eyeSpacing as string,
    noseShape:        inp.noseShape as string,
    browShape:        inp.browShape as string,
    lipFullness:      inp.lipFullness as string,
    cheekbones:       inp.cheekbones as string,
    overallImpression: inp.overallImpression as string[],
  };
}

// ── Parse figure files ────────────────────────────────────────────────────────

interface FigureStub { id: string; name: string; portraitUrl: string; }

function parseFigureFile(filePath: string): FigureStub[] {
  const source = fsSync.readFileSync(filePath, 'utf-8');
  const figures: FigureStub[] = [];

  // Each figure starts with:  id: 'ID', name: 'NAME'
  // Then later:  portraitUrl: wikimedia('FILENAME'),
  const chunks = source.split(/(?=  \{)/);
  for (const chunk of chunks) {
    const idMatch = chunk.match(/id: '([^']+)', name: '([^']+)'/);
    const urlMatch = chunk.match(/wikimedia\('([^']+)'\)/);
    if (!idMatch || !urlMatch) continue;
    const filename = urlMatch[1];
    const portraitUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=512`;
    figures.push({ id: idMatch[1], name: idMatch[2], portraitUrl });
  }
  return figures;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const FIGURE_FILES = [
  'japanese', 'western-political', 'science', 'arts',
  'religion-philosophy', 'eastern', 'fiction-myth', 'other-luminaries',
];

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY is not set');
    process.exit(1);
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const checkpoint: Record<string, EnrichedFeatures> = fsSync.existsSync(OUTPUT_JSON)
    ? JSON.parse(fsSync.readFileSync(OUTPUT_JSON, 'utf-8'))
    : {};

  let processed = 0, skipped = 0, failed = 0;

  for (const fileName of FIGURE_FILES) {
    const filePath = path.join(FIGURES_DIR, `${fileName}.ts`);
    const figures = parseFigureFile(filePath);
    console.log(`\n── ${fileName}.ts (${figures.length} figures) ──`);

    for (const fig of figures) {
      if (checkpoint[fig.id]) {
        console.log(`  [skip] ${fig.id}`);
        skipped++;
        continue;
      }
      try {
        const img = await fetchImage(fig.portraitUrl);
        const features = await extractFeatures(client, img.base64, img.mediaType);
        checkpoint[fig.id] = features;
        // Save checkpoint after every successful extraction
        fsSync.writeFileSync(OUTPUT_JSON, JSON.stringify(checkpoint, null, 2), 'utf-8');
        console.log(`  [done] ${fig.id} (${fig.name}): faceShape=${features.faceShape}, eyeShape=${features.eyeShape}`);
        processed++;
        await sleep(RATE_LIMIT_MS);
      } catch (err) {
        console.error(`  [fail] ${fig.id} (${fig.name}): ${err instanceof Error ? err.message : String(err)}`);
        failed++;
        await sleep(500);
      }
    }
  }

  console.log(`\n── Complete ──`);
  console.log(`  processed: ${processed}, skipped: ${skipped}, failed: ${failed}`);
  console.log(`  JSON contains ${Object.keys(checkpoint).length} figures`);
  console.log(`\nNext step: npx tsx scripts/apply-enrichment.ts`);
}

main().catch(console.error);
