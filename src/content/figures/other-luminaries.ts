import { wikimedia, type HistoricalFigure } from './_shared';

export const OTHER_LUMINARIES_FIGURES = [
  {
    id: 'marcopolo', name: 'マルコ・ポーロ', era: '中世・ヴェネツィア',
    traits: ['冒険', '記録', '商才'],
    portraitUrl: wikimedia('Marco_Polo_portrait.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['curious', 'wandering', 'observant'],
    },
  },
  {
    id: 'gutenberg', name: 'ヨハネス・グーテンベルク', era: 'ルネサンス・ドイツ',
    traits: ['発明', '職人', '革新'],
    portraitUrl: wikimedia('Gutenberg.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['bearded', 'craftsmanly', 'patient'],
    },
  },
  {
    id: 'columbus', name: 'クリストファー・コロンブス', era: 'ルネサンス・ジェノヴァ',
    traits: ['探検', '執念', '航海'],
    portraitUrl: wikimedia('Portrait_of_a_Man,_Said_to_be_Christopher_Columbus.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['determined', 'weathered', 'searching'],
    },
  },
  {
    id: 'magellan', name: 'マゼラン', era: 'ルネサンス・ポルトガル',
    traits: ['航海', '不屈', '先見'],
    portraitUrl: wikimedia('Ferdinand_Magellan.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['hardy', 'bearded', 'stoic'],
    },
  },
  {
    id: 'cook', name: 'ジェームズ・クック', era: '近世・イギリス',
    traits: ['探検', '科学', '航海'],
    portraitUrl: wikimedia('Captainjamescookportrait.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['composed', 'rugged', 'meticulous'],
    },
  },
  {
    id: 'watt', name: 'ジェームズ・ワット', era: '近代・スコットランド',
    traits: ['発明', '工学', '勤勉'],
    portraitUrl: wikimedia('Watt_James_von_Breda.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['methodical', 'thoughtful', 'reserved'],
    },
  },
  {
    id: 'stephenson', name: 'ジョージ・スティーブンソン', era: '近代・イギリス',
    traits: ['発明', '蒸気', '実務'],
    portraitUrl: wikimedia('George_Stephenson.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['workmanly', 'genial', 'sturdy'],
    },
  },
  {
    id: 'bell', name: 'アレクサンダー・グラハム・ベル', era: '近代・スコットランド/アメリカ',
    traits: ['発明', '通信', '教育'],
    portraitUrl: wikimedia('Alexander_Graham_Bell.jpg'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'broad',
      overallImpression: ['bearded', 'venerable', 'observant'],
    },
  },
  {
    id: 'nightingale', name: 'フローレンス・ナイチンゲール', era: '近代・イギリス',
    traits: ['看護', '改革', '統計'],
    portraitUrl: wikimedia('Florence_Nightingale_(H_Hering_NPG_x82368).jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['composed', 'determined', 'graceful'],
    },
  },
  {
    id: 'rockefeller', name: 'ジョン・D・ロックフェラー', era: '近代・アメリカ',
    traits: ['実業', '蓄財', '慈善'],
    portraitUrl: wikimedia('John_D._Rockefeller_1885.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['austere', 'calculating', 'severe'],
    },
  },
  {
    id: 'carnegie', name: 'アンドリュー・カーネギー', era: '近代・スコットランド/アメリカ',
    traits: ['鉄鋼', '慈善', '勤勉'],
    portraitUrl: wikimedia('Andrew_Carnegie,_three-quarter_length_portrait,_seated,_facing_slightly_left,_1913-crop.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['bearded', 'shrewd', 'genial'],
    },
  },
  {
    id: 'morgan', name: 'J・P・モルガン', era: '近代・アメリカ',
    traits: ['金融', '権勢', '威圧'],
    portraitUrl: wikimedia('JPMorganClapp.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'broad',
      overallImpression: ['imposing', 'glowering', 'formidable'],
    },
  },
  {
    id: 'amundsen', name: 'ロアール・アムンセン', era: '近代・ノルウェー',
    traits: ['極地', '計画', '不屈'],
    portraitUrl: wikimedia('Amundsen_in_fur_skins.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['hawkish', 'weathered', 'stoic'],
    },
  },
  {
    id: 'lindbergh', name: 'チャールズ・リンドバーグ', era: '近代・アメリカ',
    traits: ['飛行', '冒険', '孤独'],
    portraitUrl: wikimedia('Col_Charles_Lindbergh.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['boyish', 'composed', 'aviator'],
    },
  },
  {
    id: 'earhart', name: 'アメリア・イアハート', era: '近代・アメリカ',
    traits: ['飛行', '先駆', '勇気'],
    portraitUrl: wikimedia('Amelia_Earhart_-_GPN-2002-000211.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['boyish', 'spirited', 'resolute'],
    },
  },
  {
    id: 'helenkeller', name: 'ヘレン・ケラー', era: '近代・アメリカ',
    traits: ['不屈', '言葉', '希望'],
    portraitUrl: wikimedia('Helen_KellerA.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['serene', 'gentle', 'undaunted'],
    },
  },
  {
    id: 'wright', name: 'ライト兄弟', era: '近代・アメリカ',
    traits: ['発明', '飛行', '兄弟'],
    portraitUrl: wikimedia('Wrightbros1.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['mustached', 'composed', 'tinkering'],
    },
  },
  {
    id: 'ford', name: 'ヘンリー・フォード', era: '近代・アメリカ',
    traits: ['量産', '機械', '頑固'],
    portraitUrl: wikimedia('Henry_ford_1919.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['gaunt', 'industrious', 'severe'],
    },
  },
  {
    id: 'chanel', name: 'ココ・シャネル', era: '近代・フランス',
    traits: ['革新', 'モード', '自立'],
    portraitUrl: wikimedia('Coco_Chanel,_1920.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['chic', 'piercing', 'iconoclastic'],
    },
  },
  {
    id: 'matsushita', name: '松下幸之助', era: '近代・日本',
    traits: ['経営哲学', '慈愛', '実践'],
    portraitUrl: wikimedia('Konosuke_Matsushita_01.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thin', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['gentle', 'sage', 'humble'],
    },
  },
  {
    id: 'honda', name: '本田宗一郎', era: '昭和・日本',
    traits: ['技術', '挑戦', '情熱'],
    portraitUrl: wikimedia('Soichiro_Honda_1956.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['exuberant', 'craftsmanly', 'spirited'],
    },
  },
  {
    id: 'morita', name: '盛田昭夫', era: '昭和・日本',
    traits: ['国際', '革新', '営業'],
    portraitUrl: wikimedia('Akio_Morita_cropped_2_Akio_Morita_19741003.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['polished', 'shrewd', 'cosmopolitan'],
    },
  },
  {
    id: 'disney', name: 'ウォルト・ディズニー', era: '近代・アメリカ',
    traits: ['物語', '夢想', '事業'],
    portraitUrl: wikimedia('Walt_Disney_1946.JPG'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['mustached', 'imaginative', 'avuncular'],
    },
  },
  {
    id: 'teresa', name: 'マザー・テレサ', era: '現代・北マケドニア/インド',
    traits: ['慈愛', '奉仕', '謙虚'],
    portraitUrl: wikimedia('MotherTeresa_090.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thin', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['weathered', 'compassionate', 'serene'],
    },
  },
  {
    id: 'hillary_e', name: 'エドモンド・ヒラリー', era: '現代・ニュージーランド',
    traits: ['登山', '冒険', '不屈'],
    portraitUrl: wikimedia('Edmund_Hillary_1953.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['weathered', 'rugged', 'composed'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
