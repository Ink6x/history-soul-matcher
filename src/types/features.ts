export const FACE_SHAPES = ['oval', 'round', 'square', 'long', 'rectangular', 'heart', 'diamond', 'triangular', 'oblong'] as const;
export const JAWLINES = ['sharp', 'soft', 'square', 'narrow', 'rounded', 'pointed', 'wide', 'recessed'] as const;
export const EYE_SHAPES = ['almond', 'round', 'narrow', 'hooded', 'upturned', 'downturned', 'wide-open', 'monolid', 'deep-set'] as const;
export const EYE_SPACINGS = ['very-close', 'close', 'slightly-close', 'average', 'slightly-wide', 'wide', 'very-wide'] as const;
export const NOSE_SHAPES = ['straight', 'aquiline', 'button', 'broad', 'narrow', 'upturned', 'bulbous', 'roman', 'flat'] as const;
export const BROW_SHAPES = ['arched', 'straight', 'thick', 'thin', 'angled', 'rounded', 'tapered', 'sparse', 'bushy'] as const;
export const LIP_FULLNESSES = ['very-thin', 'thin', 'medium-thin', 'medium', 'medium-full', 'full', 'very-full'] as const;
export const CHEEKBONES = ['high', 'subtle', 'broad', 'prominent', 'flat', 'angular', 'sculpted', 'rounded'] as const;

export type FaceShape = (typeof FACE_SHAPES)[number];
export type Jawline = (typeof JAWLINES)[number];
export type EyeShape = (typeof EYE_SHAPES)[number];
export type EyeSpacing = (typeof EYE_SPACINGS)[number];
export type NoseShape = (typeof NOSE_SHAPES)[number];
export type BrowShape = (typeof BROW_SHAPES)[number];
export type LipFullness = (typeof LIP_FULLNESSES)[number];
export type Cheekbones = (typeof CHEEKBONES)[number];

export type FacialFeatureProfile = {
  faceShape: FaceShape;
  jawline: Jawline;
  eyeShape: EyeShape;
  eyeSpacing: EyeSpacing;
  noseShape: NoseShape;
  browShape: BrowShape;
  lipFullness: LipFullness;
  cheekbones: Cheekbones;
  overallImpression: readonly string[];
};

export const FEATURE_WEIGHTS = {
  faceShape: 10,
  jawline: 10,
  eyeShape: 10,
  eyeSpacing: 10,
  noseShape: 10,
  browShape: 10,
  lipFullness: 10,
  cheekbones: 10,
  overallImpression: 10,
} as const satisfies Record<keyof FacialFeatureProfile, number>;

export type FeatureKey = keyof FacialFeatureProfile;

export const FEATURE_LABELS_JA: Record<FeatureKey, string> = {
  faceShape: '顔の輪郭',
  jawline: '顎のライン',
  eyeShape: '目の形',
  eyeSpacing: '目の間隔',
  noseShape: '鼻筋',
  browShape: '眉',
  lipFullness: '唇の厚み',
  cheekbones: '頬骨',
  overallImpression: '全体の印象',
};

const FACE_SHAPE_LABELS: Record<FaceShape, string> = {
  oval: '卵型', round: '丸顔', square: '四角顔', long: '面長',
  rectangular: '長方形型', heart: 'ハート型', diamond: 'ダイヤモンド型',
  triangular: '三角顔', oblong: '縦長型',
};
const JAWLINE_LABELS: Record<Jawline, string> = {
  sharp: '鋭角', soft: '柔らかい', square: '角張った', narrow: '細い',
  rounded: '丸み', pointed: '尖った顎', wide: '幅広', recessed: '控えめな顎',
};
const EYE_SHAPE_LABELS: Record<EyeShape, string> = {
  almond: 'アーモンド型', round: '丸目', narrow: '細目', hooded: '奥二重',
  upturned: '吊り目', downturned: '垂れ目',
  'wide-open': 'くっきり大きい', monolid: '一重', 'deep-set': '落ち窪んだ',
};
const EYE_SPACING_LABELS: Record<EyeSpacing, string> = {
  'very-close': 'かなり寄り目', close: '寄り目', 'slightly-close': 'やや寄り目',
  average: '標準', 'slightly-wide': 'やや離れ目', wide: '離れ目', 'very-wide': 'かなり離れ目',
};
const NOSE_SHAPE_LABELS: Record<NoseShape, string> = {
  straight: 'まっすぐ', aquiline: '鷲鼻', button: '小さく丸い', broad: '幅広', narrow: '細い',
  upturned: '上向き', bulbous: '丸み大きめ', roman: 'ローマ鼻', flat: '低い',
};
const BROW_SHAPE_LABELS: Record<BrowShape, string> = {
  arched: 'アーチ型', straight: 'まっすぐ', thick: '太い', thin: '細い',
  angled: 'くの字', rounded: '弓型', tapered: '先細り', sparse: 'まばら', bushy: '濃く密集',
};
const LIP_FULLNESS_LABELS: Record<LipFullness, string> = {
  'very-thin': 'かなり薄い', thin: '薄い', 'medium-thin': 'やや薄い',
  medium: '標準', 'medium-full': 'やや厚い', full: 'ふっくら', 'very-full': '非常にふっくら',
};
const CHEEKBONES_LABELS: Record<Cheekbones, string> = {
  high: '高い', subtle: '控えめ', broad: '広い', prominent: '際立つ',
  flat: '平坦', angular: '角張った', sculpted: '彫り深い', rounded: '丸み',
};

export function localizeFeatureValue(key: FeatureKey, value: string): string {
  switch (key) {
    case 'faceShape': return FACE_SHAPE_LABELS[value as FaceShape] ?? value;
    case 'jawline': return JAWLINE_LABELS[value as Jawline] ?? value;
    case 'eyeShape': return EYE_SHAPE_LABELS[value as EyeShape] ?? value;
    case 'eyeSpacing': return EYE_SPACING_LABELS[value as EyeSpacing] ?? value;
    case 'noseShape': return NOSE_SHAPE_LABELS[value as NoseShape] ?? value;
    case 'browShape': return BROW_SHAPE_LABELS[value as BrowShape] ?? value;
    case 'lipFullness': return LIP_FULLNESS_LABELS[value as LipFullness] ?? value;
    case 'cheekbones': return CHEEKBONES_LABELS[value as Cheekbones] ?? value;
    case 'overallImpression': return value;
  }
}

export const MATCH_LEVELS = ['exact', 'close', 'partial', 'weak', 'none'] as const;
export type MatchLevel = (typeof MATCH_LEVELS)[number];

export const MATCH_LEVEL_LABELS_JA: Record<MatchLevel, string> = {
  exact: '完全一致',
  close: '近い',
  partial: 'やや似ている',
  weak: 'わずかに類似',
  none: '相違',
};

export const INTENSITY_MIN = 1 as const;
export const INTENSITY_MAX = 10 as const;
export const FIGURE_DEFAULT_INTENSITY = 5 as const;

export type IntensityKey = `${Exclude<FeatureKey, 'overallImpression'>}Intensity`;

/** ユーザーの顔特徴プロフィール。歴史人物は FacialFeatureProfile（強度フィールドなし）を使う。 */
export type UserFacialProfile = FacialFeatureProfile & Partial<Record<IntensityKey, number>>;

export type FeatureBreakdownItem = {
  feature: FeatureKey;
  userValue: string;
  figureValue: string;
  matched: boolean;
  contribution: number;
  displayContribution: number;
  similarity: number;
  maxContribution: number;
  matchLevel: MatchLevel;
};
