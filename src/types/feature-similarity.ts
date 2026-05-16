import { FIGURE_DEFAULT_INTENSITY, INTENSITY_MAX } from './features';
import type {
  BrowShape,
  Cheekbones,
  EyeShape,
  EyeSpacing,
  FaceShape,
  Jawline,
  LipFullness,
  MatchLevel,
  NoseShape,
} from './features';

export const DISPLAY_BASE_CAP = 0.80;
export const INTENSITY_SPREAD_WEIGHT = 0.40;
export const MATCHED_THRESHOLD = 0.95;

/**
 * カテゴリ類似度に intensity（顕著さ）補正を掛け合わせる。
 * 同ラベル（catSim >= DISPLAY_BASE_CAP）: 高 intensity ほどスコアが上がる
 * 異ラベル（catSim < DISPLAY_BASE_CAP）: 高 intensity ほどミスマッチが際立ち下がる
 */
export function applyIntensityAdjustment(
  categoricalSim: number,
  userIntensity: number | undefined,
): number {
  if (userIntensity === undefined) return categoricalSim;
  const delta = (userIntensity - FIGURE_DEFAULT_INTENSITY) / (INTENSITY_MAX - FIGURE_DEFAULT_INTENSITY);
  const directionSign = categoricalSim >= DISPLAY_BASE_CAP ? 1 : -1;
  const factor = 1 + delta * INTENSITY_SPREAD_WEIGHT * directionSign;
  return Math.max(0, Math.min(1, categoricalSim * factor));
}

type Matrix<T extends string> = Readonly<Record<T, Readonly<Record<T, number>>>>;

export const FACE_SHAPE_SIMILARITY: Matrix<FaceShape> = {
  oval:        { oval: 1.00, round: 0.60, square: 0.15, long: 0.40, rectangular: 0.20, heart: 0.45, diamond: 0.40, triangular: 0.15, oblong: 0.35 },
  round:       { oval: 0.60, round: 1.00, square: 0.25, long: 0.10, rectangular: 0.10, heart: 0.25, diamond: 0.15, triangular: 0.20, oblong: 0.05 },
  square:      { oval: 0.15, round: 0.25, square: 1.00, long: 0.35, rectangular: 0.75, heart: 0.10, diamond: 0.35, triangular: 0.55, oblong: 0.30 },
  long:        { oval: 0.40, round: 0.10, square: 0.35, long: 1.00, rectangular: 0.65, heart: 0.25, diamond: 0.35, triangular: 0.15, oblong: 0.70 },
  rectangular: { oval: 0.20, round: 0.10, square: 0.75, long: 0.65, rectangular: 1.00, heart: 0.10, diamond: 0.25, triangular: 0.40, oblong: 0.55 },
  heart:       { oval: 0.45, round: 0.25, square: 0.10, long: 0.25, rectangular: 0.10, heart: 1.00, diamond: 0.65, triangular: 0.10, oblong: 0.25 },
  diamond:     { oval: 0.40, round: 0.15, square: 0.35, long: 0.35, rectangular: 0.25, heart: 0.65, diamond: 1.00, triangular: 0.30, oblong: 0.20 },
  triangular:  { oval: 0.15, round: 0.20, square: 0.55, long: 0.15, rectangular: 0.40, heart: 0.10, diamond: 0.30, triangular: 1.00, oblong: 0.10 },
  oblong:      { oval: 0.35, round: 0.05, square: 0.30, long: 0.70, rectangular: 0.55, heart: 0.25, diamond: 0.20, triangular: 0.10, oblong: 1.00 },
};

export const JAWLINE_SIMILARITY: Matrix<Jawline> = {
  sharp:    { sharp: 1.00, soft: 0.10, square: 0.55, narrow: 0.40, rounded: 0.15, pointed: 0.65, wide: 0.10, recessed: 0.05 },
  soft:     { sharp: 0.10, soft: 1.00, square: 0.15, narrow: 0.45, rounded: 0.75, pointed: 0.30, wide: 0.30, recessed: 0.40 },
  square:   { sharp: 0.55, soft: 0.15, square: 1.00, narrow: 0.20, rounded: 0.10, pointed: 0.15, wide: 0.70, recessed: 0.10 },
  narrow:   { sharp: 0.40, soft: 0.45, square: 0.20, narrow: 1.00, rounded: 0.45, pointed: 0.55, wide: 0.05, recessed: 0.35 },
  rounded:  { sharp: 0.15, soft: 0.75, square: 0.10, narrow: 0.45, rounded: 1.00, pointed: 0.20, wide: 0.25, recessed: 0.45 },
  pointed:  { sharp: 0.65, soft: 0.30, square: 0.15, narrow: 0.55, rounded: 0.20, pointed: 1.00, wide: 0.05, recessed: 0.15 },
  wide:     { sharp: 0.10, soft: 0.30, square: 0.70, narrow: 0.05, rounded: 0.25, pointed: 0.05, wide: 1.00, recessed: 0.10 },
  recessed: { sharp: 0.05, soft: 0.40, square: 0.10, narrow: 0.35, rounded: 0.45, pointed: 0.15, wide: 0.10, recessed: 1.00 },
};

export const EYE_SHAPE_SIMILARITY: Matrix<EyeShape> = {
  almond:      { almond: 1.00, round: 0.30, narrow: 0.40, hooded: 0.35, upturned: 0.65, downturned: 0.60, 'wide-open': 0.35, monolid: 0.30, 'deep-set': 0.40 },
  round:       { almond: 0.30, round: 1.00, narrow: 0.10, hooded: 0.25, upturned: 0.25, downturned: 0.20, 'wide-open': 0.70, monolid: 0.20, 'deep-set': 0.20 },
  narrow:      { almond: 0.40, round: 0.10, narrow: 1.00, hooded: 0.70, upturned: 0.15, downturned: 0.15, 'wide-open': 0.05, monolid: 0.45, 'deep-set': 0.30 },
  hooded:      { almond: 0.35, round: 0.25, narrow: 0.70, hooded: 1.00, upturned: 0.15, downturned: 0.15, 'wide-open': 0.10, monolid: 0.60, 'deep-set': 0.40 },
  upturned:    { almond: 0.65, round: 0.25, narrow: 0.15, hooded: 0.15, upturned: 1.00, downturned: 0.20, 'wide-open': 0.25, monolid: 0.10, 'deep-set': 0.15 },
  downturned:  { almond: 0.60, round: 0.20, narrow: 0.15, hooded: 0.15, upturned: 0.20, downturned: 1.00, 'wide-open': 0.15, monolid: 0.10, 'deep-set': 0.25 },
  'wide-open': { almond: 0.35, round: 0.70, narrow: 0.05, hooded: 0.10, upturned: 0.25, downturned: 0.15, 'wide-open': 1.00, monolid: 0.10, 'deep-set': 0.20 },
  monolid:     { almond: 0.30, round: 0.20, narrow: 0.45, hooded: 0.60, upturned: 0.10, downturned: 0.10, 'wide-open': 0.10, monolid: 1.00, 'deep-set': 0.25 },
  'deep-set':  { almond: 0.40, round: 0.20, narrow: 0.30, hooded: 0.40, upturned: 0.15, downturned: 0.25, 'wide-open': 0.20, monolid: 0.25, 'deep-set': 1.00 },
};

// Ordinal scale: very-close=0, close=1, slightly-close=2, average=3, slightly-wide=4, wide=5, very-wide=6
// Distance → similarity: 0→1.00, 1→0.75, 2→0.45, 3→0.20, 4→0.08, 5→0.03, 6→0.01
export const EYE_SPACING_SIMILARITY: Matrix<EyeSpacing> = {
  'very-close':    { 'very-close': 1.00, close: 0.75, 'slightly-close': 0.45, average: 0.20, 'slightly-wide': 0.08, wide: 0.03, 'very-wide': 0.01 },
  close:           { 'very-close': 0.75, close: 1.00, 'slightly-close': 0.75, average: 0.45, 'slightly-wide': 0.20, wide: 0.08, 'very-wide': 0.03 },
  'slightly-close':{ 'very-close': 0.45, close: 0.75, 'slightly-close': 1.00, average: 0.75, 'slightly-wide': 0.45, wide: 0.20, 'very-wide': 0.08 },
  average:         { 'very-close': 0.20, close: 0.45, 'slightly-close': 0.75, average: 1.00, 'slightly-wide': 0.75, wide: 0.45, 'very-wide': 0.20 },
  'slightly-wide': { 'very-close': 0.08, close: 0.20, 'slightly-close': 0.45, average: 0.75, 'slightly-wide': 1.00, wide: 0.75, 'very-wide': 0.45 },
  wide:            { 'very-close': 0.03, close: 0.08, 'slightly-close': 0.20, average: 0.45, 'slightly-wide': 0.75, wide: 1.00, 'very-wide': 0.75 },
  'very-wide':     { 'very-close': 0.01, close: 0.03, 'slightly-close': 0.08, average: 0.20, 'slightly-wide': 0.45, wide: 0.75, 'very-wide': 1.00 },
};

export const NOSE_SHAPE_SIMILARITY: Matrix<NoseShape> = {
  straight: { straight: 1.00, aquiline: 0.35, button: 0.20, broad: 0.10, narrow: 0.65, upturned: 0.25, bulbous: 0.15, roman: 0.65, flat: 0.10 },
  aquiline: { straight: 0.35, aquiline: 1.00, button: 0.05, broad: 0.05, narrow: 0.40, upturned: 0.25, bulbous: 0.10, roman: 0.55, flat: 0.05 },
  button:   { straight: 0.20, aquiline: 0.05, button: 1.00, broad: 0.30, narrow: 0.10, upturned: 0.60, bulbous: 0.55, roman: 0.10, flat: 0.30 },
  broad:    { straight: 0.10, aquiline: 0.05, button: 0.30, broad: 1.00, narrow: 0.05, upturned: 0.20, bulbous: 0.55, roman: 0.10, flat: 0.45 },
  narrow:   { straight: 0.65, aquiline: 0.40, button: 0.10, broad: 0.05, narrow: 1.00, upturned: 0.20, bulbous: 0.10, roman: 0.45, flat: 0.10 },
  upturned: { straight: 0.25, aquiline: 0.25, button: 0.60, broad: 0.20, narrow: 0.20, upturned: 1.00, bulbous: 0.35, roman: 0.10, flat: 0.15 },
  bulbous:  { straight: 0.15, aquiline: 0.10, button: 0.55, broad: 0.55, narrow: 0.10, upturned: 0.35, bulbous: 1.00, roman: 0.15, flat: 0.30 },
  roman:    { straight: 0.65, aquiline: 0.55, button: 0.10, broad: 0.10, narrow: 0.45, upturned: 0.10, bulbous: 0.15, roman: 1.00, flat: 0.05 },
  flat:     { straight: 0.10, aquiline: 0.05, button: 0.30, broad: 0.45, narrow: 0.10, upturned: 0.15, bulbous: 0.30, roman: 0.05, flat: 1.00 },
};

// arched↔thin=0.65 and straight↔thick=0.70 intentionally preserved for test anchors
export const BROW_SHAPE_SIMILARITY: Matrix<BrowShape> = {
  arched:   { arched: 1.00, straight: 0.30, thick: 0.25, thin: 0.65, angled: 0.55, rounded: 0.75, tapered: 0.40, sparse: 0.20, bushy: 0.20 },
  straight: { arched: 0.30, straight: 1.00, thick: 0.70, thin: 0.25, angled: 0.35, rounded: 0.20, tapered: 0.35, sparse: 0.30, bushy: 0.50 },
  thick:    { arched: 0.25, straight: 0.70, thick: 1.00, thin: 0.05, angled: 0.25, rounded: 0.20, tapered: 0.35, sparse: 0.05, bushy: 0.75 },
  thin:     { arched: 0.65, straight: 0.25, thick: 0.05, thin: 1.00, angled: 0.30, rounded: 0.30, tapered: 0.55, sparse: 0.60, bushy: 0.05 },
  angled:   { arched: 0.55, straight: 0.35, thick: 0.25, thin: 0.30, angled: 1.00, rounded: 0.25, tapered: 0.30, sparse: 0.20, bushy: 0.20 },
  rounded:  { arched: 0.75, straight: 0.20, thick: 0.20, thin: 0.30, angled: 0.25, rounded: 1.00, tapered: 0.35, sparse: 0.25, bushy: 0.20 },
  tapered:  { arched: 0.40, straight: 0.35, thick: 0.35, thin: 0.55, angled: 0.30, rounded: 0.35, tapered: 1.00, sparse: 0.45, bushy: 0.10 },
  sparse:   { arched: 0.20, straight: 0.30, thick: 0.05, thin: 0.60, angled: 0.20, rounded: 0.25, tapered: 0.45, sparse: 1.00, bushy: 0.05 },
  bushy:    { arched: 0.20, straight: 0.50, thick: 0.75, thin: 0.05, angled: 0.20, rounded: 0.20, tapered: 0.10, sparse: 0.05, bushy: 1.00 },
};

// Ordinal scale: very-thin=0, thin=1, medium-thin=2, medium=3, medium-full=4, full=5, very-full=6
// Distance → similarity: 0→1.00, 1→0.75, 2→0.45, 3→0.20, 4→0.08, 5→0.03, 6→0.01
export const LIP_FULLNESS_SIMILARITY: Matrix<LipFullness> = {
  'very-thin':   { 'very-thin': 1.00, thin: 0.75, 'medium-thin': 0.45, medium: 0.20, 'medium-full': 0.08, full: 0.03, 'very-full': 0.01 },
  thin:          { 'very-thin': 0.75, thin: 1.00, 'medium-thin': 0.75, medium: 0.45, 'medium-full': 0.20, full: 0.08, 'very-full': 0.03 },
  'medium-thin': { 'very-thin': 0.45, thin: 0.75, 'medium-thin': 1.00, medium: 0.75, 'medium-full': 0.45, full: 0.20, 'very-full': 0.08 },
  medium:        { 'very-thin': 0.20, thin: 0.45, 'medium-thin': 0.75, medium: 1.00, 'medium-full': 0.75, full: 0.45, 'very-full': 0.20 },
  'medium-full': { 'very-thin': 0.08, thin: 0.20, 'medium-thin': 0.45, medium: 0.75, 'medium-full': 1.00, full: 0.75, 'very-full': 0.45 },
  full:          { 'very-thin': 0.03, thin: 0.08, 'medium-thin': 0.20, medium: 0.45, 'medium-full': 0.75, full: 1.00, 'very-full': 0.75 },
  'very-full':   { 'very-thin': 0.01, thin: 0.03, 'medium-thin': 0.08, medium: 0.20, 'medium-full': 0.45, full: 0.75, 'very-full': 1.00 },
};

export const CHEEKBONES_SIMILARITY: Matrix<Cheekbones> = {
  high:      { high: 1.00, subtle: 0.25, broad: 0.40, prominent: 0.80, flat: 0.05, angular: 0.60, sculpted: 0.70, rounded: 0.35 },
  subtle:    { high: 0.25, subtle: 1.00, broad: 0.30, prominent: 0.05, flat: 0.55, angular: 0.10, sculpted: 0.10, rounded: 0.40 },
  broad:     { high: 0.40, subtle: 0.30, broad: 1.00, prominent: 0.35, flat: 0.25, angular: 0.30, sculpted: 0.25, rounded: 0.45 },
  prominent: { high: 0.80, subtle: 0.05, broad: 0.35, prominent: 1.00, flat: 0.05, angular: 0.70, sculpted: 0.75, rounded: 0.25 },
  flat:      { high: 0.05, subtle: 0.55, broad: 0.25, prominent: 0.05, flat: 1.00, angular: 0.05, sculpted: 0.05, rounded: 0.40 },
  angular:   { high: 0.60, subtle: 0.10, broad: 0.30, prominent: 0.70, flat: 0.05, angular: 1.00, sculpted: 0.65, rounded: 0.10 },
  sculpted:  { high: 0.70, subtle: 0.10, broad: 0.25, prominent: 0.75, flat: 0.05, angular: 0.65, sculpted: 1.00, rounded: 0.15 },
  rounded:   { high: 0.35, subtle: 0.40, broad: 0.45, prominent: 0.25, flat: 0.40, angular: 0.10, sculpted: 0.15, rounded: 1.00 },
};

export const MATCH_LEVEL_THRESHOLDS = {
  exact: 1.0,
  close: 0.65,
  partial: 0.35,
  weak: 0.0,
} as const;

export function toMatchLevel(similarity: number): MatchLevel {
  if (similarity >= MATCH_LEVEL_THRESHOLDS.exact) return 'exact';
  if (similarity >= MATCH_LEVEL_THRESHOLDS.close) return 'close';
  if (similarity >= MATCH_LEVEL_THRESHOLDS.partial) return 'partial';
  if (similarity > MATCH_LEVEL_THRESHOLDS.weak) return 'weak';
  return 'none';
}
