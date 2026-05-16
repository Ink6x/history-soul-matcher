const IMPRESSION_GROUPS: readonly (readonly string[])[] = [
  ['serene', 'tranquil', 'peaceful', 'gentle', 'quiet', 'composed', 'patient', 'tender', 'measured'],
  ['intellectual', 'scholarly', 'erudite', 'philosophical', 'analytical', 'inquisitive',
   'thoughtful', 'contemplative', 'introspective', 'pondering', 'observant', 'rational',
   'precise', 'methodical', 'meticulous', 'studious'],
  ['determined', 'resolute', 'tenacious', 'resilient', 'undaunted', 'uncompromising',
   'disciplined', 'stalwart', 'stoic', 'focused', 'unrelenting'],
  ['intense', 'fierce', 'passionate', 'stormy', 'tempestuous', 'tormented', 'wild'],
  ['refined', 'graceful', 'dignified', 'noble', 'aristocratic', 'stately', 'polished'],
  ['imaginative', 'inventive', 'experimental', 'visionary', 'pioneering', 'dreamy',
   'free-spirited', 'whimsical', 'lyrical', 'curious', 'eccentric'],
  ['spiritual', 'mystical', 'divine', 'devout', 'sacred', 'prophetic', 'ethereal', 'zen'],
  ['charismatic', 'magnetic', 'bold', 'spirited', 'exuberant', 'irrepressible', 'vivid', 'radiant'],
  ['humble', 'sincere', 'compassionate', 'benevolent', 'kind', 'kindly', 'nonviolent', 'tolerant'],
  ['brooding', 'somber', 'solemn', 'pensive', 'sorrowful', 'tragic', 'lonely', 'restless', 'anxious'],
  ['proud', 'imperious', 'imposing', 'formidable', 'mighty', 'towering', 'herculean', 'ambitious'],
  ['shrewd', 'cunning', 'calculating', 'sly', 'astute', 'knowing'],
  ['genial', 'cheerful', 'avuncular', 'witty', 'playful', 'mischievous', 'roguish'],
  ['austere', 'severe', 'spare', 'gaunt', 'weathered', 'rugged', 'gruff', 'craggy'],
  ['romantic', 'sensitive', 'sensual', 'alluring', 'idealistic'],
  ['venerable', 'sage', 'lofty', 'magnanimous', 'principled'],
];

const TAG_TO_GROUP = new Map<string, number>();
for (let i = 0; i < IMPRESSION_GROUPS.length; i++) {
  for (const tag of IMPRESSION_GROUPS[i]) {
    TAG_TO_GROUP.set(tag, i);
  }
}

const EXACT_CREDIT = 1.0;
const GROUP_CREDIT = 0.6;

/**
 * Similarity between two impression tag sets.
 * Exact string matches earn full credit; tags in the same semantic group earn partial credit.
 * Denominator is the average of the two set sizes, which avoids Jaccard's tendency to
 * penalize mismatched set sizes and allows semantically similar sets to reach 'close' level.
 */
export function impressionSimilarity(a: readonly string[], b: readonly string[]): number {
  const setA = new Set(a.map((s) => s.toLowerCase().trim()).filter(Boolean));
  const setB = new Set(b.map((s) => s.toLowerCase().trim()).filter(Boolean));
  if (setA.size === 0 || setB.size === 0) return 0;

  let credit = 0;
  const usedB = new Set<string>();

  for (const tag of setA) {
    if (setB.has(tag)) {
      credit += EXACT_CREDIT;
      usedB.add(tag);
    }
  }

  for (const tag of setA) {
    if (setB.has(tag)) continue;
    const groupIdx = TAG_TO_GROUP.get(tag);
    if (groupIdx === undefined) continue;
    for (const bTag of setB) {
      if (usedB.has(bTag)) continue;
      if (TAG_TO_GROUP.get(bTag) === groupIdx) {
        credit += GROUP_CREDIT;
        usedB.add(bTag);
        break;
      }
    }
  }

  const denominator = (setA.size + setB.size) / 2;
  return Math.min(1.0, credit / denominator);
}
