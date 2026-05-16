#!/usr/bin/env tsx
/**
 * Phase 2B — Apply enriched features to figure source files.
 *
 * Run AFTER enrich-figures.ts has produced scripts/enriched-features.json.
 * Usage:  npx tsx scripts/apply-enrichment.ts
 *
 * Replaces the `features: { ... }` block in each figure's source file with
 * the Claude-extracted labels from the expanded vocabulary.
 * Writes the updated files in-place. Run `npx tsc --noEmit` afterward to verify.
 */

import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIGURES_DIR = path.join(__dirname, '../src/content/figures');
const INPUT_JSON = path.join(__dirname, 'enriched-features.json');

const FIGURE_FILES = [
  'japanese', 'western-political', 'science', 'arts',
  'religion-philosophy', 'eastern', 'fiction-myth', 'other-luminaries',
];

interface Features {
  faceShape: string; jawline: string; eyeShape: string; eyeSpacing: string;
  noseShape: string; browShape: string; lipFullness: string; cheekbones: string;
  overallImpression: string[];
}

// Generates the features block in the exact format used by all figure files:
//   4-space indent for the `features: {` line
//   6-space indent for property lines
function formatFeaturesBlock(f: Features): string {
  const tags = f.overallImpression.map(t => `'${t}'`).join(', ');
  return [
    `    features: {`,
    `      faceShape: '${f.faceShape}', jawline: '${f.jawline}', eyeShape: '${f.eyeShape}', eyeSpacing: '${f.eyeSpacing}',`,
    `      noseShape: '${f.noseShape}', browShape: '${f.browShape}', lipFullness: '${f.lipFullness}', cheekbones: '${f.cheekbones}',`,
    `      overallImpression: [${tags}],`,
    `    },`,
  ].join('\n');
}

// Finds a figure's features block by its unique id and replaces it.
// The features block always follows `    features: {` and ends with `\n    },`.
// Returns the updated source, or the original source if the figure is not found.
function applyToSource(source: string, figureId: string, features: Features): string {
  const idMarker = `id: '${figureId}'`;
  const idPos = source.indexOf(idMarker);
  if (idPos === -1) return source;

  const FEATURES_START = '    features: {';
  const featuresPos = source.indexOf(FEATURES_START, idPos);
  if (featuresPos === -1) {
    console.warn(`  [warn] Could not find features block for ${figureId}`);
    return source;
  }

  // The features block closes with `\n    },` (4-space indent)
  const CLOSING = '\n    },';
  const closingPos = source.indexOf(CLOSING, featuresPos);
  if (closingPos === -1) {
    console.warn(`  [warn] Could not find closing }​, for ${figureId}`);
    return source;
  }

  const blockEnd = closingPos + CLOSING.length;
  const newBlock = formatFeaturesBlock(features);
  return source.slice(0, featuresPos) + newBlock + source.slice(blockEnd);
}

// Validate that all enriched values exist in the expanded enums
const VALID: Record<string, Set<string>> = {
  faceShape:   new Set(['oval','round','square','long','rectangular','heart','diamond','triangular','oblong']),
  jawline:     new Set(['sharp','soft','square','narrow','rounded','pointed','wide','recessed']),
  eyeShape:    new Set(['almond','round','narrow','hooded','upturned','downturned','wide-open','monolid','deep-set']),
  eyeSpacing:  new Set(['very-close','close','slightly-close','average','slightly-wide','wide','very-wide']),
  noseShape:   new Set(['straight','aquiline','button','broad','narrow','upturned','bulbous','roman','flat']),
  browShape:   new Set(['arched','straight','thick','thin','angled','rounded','tapered','sparse','bushy']),
  lipFullness: new Set(['very-thin','thin','medium-thin','medium','medium-full','full','very-full']),
  cheekbones:  new Set(['high','subtle','broad','prominent','flat','angular','sculpted','rounded']),
};

function validateFeatures(id: string, f: Features): boolean {
  let ok = true;
  for (const [key, validSet] of Object.entries(VALID)) {
    const val = f[key as keyof Features] as string;
    if (!validSet.has(val)) {
      console.error(`  [invalid] ${id}.${key} = '${val}' (not in enum)`);
      ok = false;
    }
  }
  return ok;
}

function main() {
  if (!fsSync.existsSync(INPUT_JSON)) {
    console.error(`Not found: ${INPUT_JSON}`);
    console.error('Run enrich-figures.ts first: npx tsx scripts/enrich-figures.ts');
    process.exit(1);
  }

  const enriched: Record<string, Features> = JSON.parse(fsSync.readFileSync(INPUT_JSON, 'utf-8'));
  const total = Object.keys(enriched).length;
  console.log(`Loaded ${total} enriched figures from ${path.basename(INPUT_JSON)}`);

  // Validate all values before touching any source files
  let validationFailed = false;
  for (const [id, features] of Object.entries(enriched)) {
    if (!validateFeatures(id, features)) validationFailed = true;
  }
  if (validationFailed) {
    console.error('\nValidation failed. Fix invalid values before applying.');
    process.exit(1);
  }
  console.log('Validation passed.\n');

  let totalUpdated = 0;
  for (const fileName of FIGURE_FILES) {
    const filePath = path.join(FIGURES_DIR, `${fileName}.ts`);
    let source = fsSync.readFileSync(filePath, 'utf-8');
    let count = 0;

    for (const [id, features] of Object.entries(enriched)) {
      const updated = applyToSource(source, id, features);
      if (updated !== source) {
        source = updated;
        count++;
      }
    }

    if (count > 0) {
      fsSync.writeFileSync(filePath, source, 'utf-8');
      console.log(`  ${fileName}.ts — updated ${count} figures`);
      totalUpdated += count;
    } else {
      console.log(`  ${fileName}.ts — no changes`);
    }
  }

  console.log(`\nTotal updated: ${totalUpdated} / ${total}`);
  console.log('\nNext: run `npx tsc --noEmit` to verify TypeScript types');
}

main();
