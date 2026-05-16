import { wikimedia, type HistoricalFigure } from './_shared';

export const ARTS_FIGURES = [
  {
    id: 'michelangelo', name: 'ミケランジェロ', era: 'ルネサンス・イタリア',
    traits: ['情熱', '彫刻', '理想'],
    portraitUrl: wikimedia('Michelangelo_Daniele_da_Volterra_(dettaglio).jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'sharp', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'straight', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['angular', 'austere', 'contemplative'],
    },
  },
  {
    id: 'raphael', name: 'ラファエロ', era: 'ルネサンス・イタリア',
    traits: ['調和', '優美', '才能'],
    portraitUrl: wikimedia('Raffaello_Sanzio.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['serene', 'refined', 'contemplative'],
    },
  },
  {
    id: 'botticelli', name: 'ボッティチェリ', era: 'ルネサンス・イタリア',
    traits: ['美学', '神話', '繊細'],
    portraitUrl: wikimedia('Sandro_Botticelli_083.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['contemplative', 'refined', 'classical'],
    },
  },
  {
    id: 'rembrandt', name: 'レンブラント', era: '近世・オランダ',
    traits: ['光と影', '内省', '人間味'],
    portraitUrl: wikimedia('Rembrandt_Harmensz._van_Rijn_135.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'bushy', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['contemplative', 'weathered', 'dignified'],
    },
  },
  {
    id: 'vermeer', name: 'フェルメール', era: '近世・オランダ',
    traits: ['静謐', '光', '日常'],
    portraitUrl: wikimedia('Jan_Vermeer_van_Delft_002.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'rounded', lipFullness: 'medium', cheekbones: 'rounded',
      overallImpression: ['gentle expression', 'soft facial contours', 'rounded proportions'],
    },
  },
  {
    id: 'bach', name: 'ヨハン・セバスティアン・バッハ', era: '近世・ドイツ',
    traits: ['構築', '信仰', '緻密'],
    portraitUrl: wikimedia('Johann_Sebastian_Bach.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'structured', 'dignified'],
    },
  },
  {
    id: 'mozart', name: 'モーツァルト', era: '近世・オーストリア',
    traits: ['才能', '遊び心', '繊細'],
    portraitUrl: wikimedia('Wolfgang-amadeus-mozart_1.jpg'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['refined profile', 'symmetrical composition', 'delicate features'],
    },
  },
  {
    id: 'beethoven', name: 'ベートーヴェン', era: '近代・ドイツ',
    traits: ['情熱', '不屈', '革新'],
    portraitUrl: wikimedia('Beethoven.jpg'),
    features: {
      faceShape: 'oblong', jawline: 'square', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['stern expression', 'angular structure', 'contemplative gaze'],
    },
  },
  {
    id: 'hokusai', name: '葛飾北斎', era: '江戸時代・日本',
    traits: ['探究心', '生涯現役', '大胆'],
    portraitUrl: wikimedia('Katsushika_Hokusai_001.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated profile', 'stylized linearity', 'contemplative expression'],
    },
  },
  {
    id: 'shakespeare', name: 'シェイクスピア', era: 'ルネサンス・イングランド',
    traits: ['言葉', '人間理解', '劇作'],
    portraitUrl: wikimedia('Shakespeare.jpg'),
    features: {
      faceShape: 'oval', jawline: 'pointed', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['balanced proportions', 'refined features', 'contemplative expression'],
    },
  },
  {
    id: 'goethe', name: 'ゲーテ', era: '近代・ドイツ',
    traits: ['博覧', '自然', '理性'],
    portraitUrl: wikimedia('Goethe_(Stieler_1828).jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated-structure', 'refined-linearity', 'contemplative-expression'],
    },
  },
  {
    id: 'chopin', name: 'ショパン', era: '近代・ポーランド/フランス',
    traits: ['詩情', '繊細', '憂愁'],
    portraitUrl: wikimedia('Frederic_Chopin_photo.jpeg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated', 'austere', 'contemplative'],
    },
  },
  {
    id: 'wagner', name: 'リヒャルト・ワーグナー', era: '近代・ドイツ',
    traits: ['壮大', '革新', '傲岸'],
    portraitUrl: wikimedia('RichardWagner.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated-structure', 'deep-set-eyes', 'prominent-brow-ridge'],
    },
  },
  {
    id: 'tchaikovsky', name: 'チャイコフスキー', era: '近代・ロシア',
    traits: ['情感', '旋律', '苦悩'],
    portraitUrl: wikimedia('Porträt_des_Komponisten_Pjotr_I._Tschaikowski_(1840-1893).jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['angular', 'austere', 'contemplative'],
    },
  },
  {
    id: 'monet', name: 'クロード・モネ', era: '近代・フランス',
    traits: ['光', '自然', '実験'],
    portraitUrl: wikimedia('Claude_Monet_1899_Nadar.jpg'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['angular-structure', 'deep-set-eyes', 'prominent-facial-hair'],
    },
  },
  {
    id: 'renoir', name: 'ルノワール', era: '近代・フランス',
    traits: ['官能', '色彩', '幸福'],
    portraitUrl: wikimedia('Pierre-Auguste_Renoir_-_Bazille.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'rounded', lipFullness: 'medium', cheekbones: 'rounded',
      overallImpression: ['warm', 'jovial', 'approachable'],
    },
  },
  {
    id: 'cezanne', name: 'セザンヌ', era: '近代・フランス',
    traits: ['構成', '頑固', '革新'],
    portraitUrl: wikimedia('Paul_Cézanne_-_Self-Portrait_-_Google_Art_Project.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'contemplative', 'austere'],
    },
  },
  {
    id: 'gogh', name: 'フィンセント・ファン・ゴッホ', era: '近代・オランダ',
    traits: ['情熱', '孤独', '感受性'],
    portraitUrl: wikimedia('Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['angular', 'contemplative', 'defined-facial-structure'],
    },
  },
  {
    id: 'rodin', name: 'オーギュスト・ロダン', era: '近代・フランス',
    traits: ['彫刻', '官能', '力強さ'],
    portraitUrl: wikimedia('Auguste_Rodin_(1840-1917)_in_1893.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['rugged', 'intense', 'sculptural'],
    },
  },
  {
    id: 'picasso', name: 'パブロ・ピカソ', era: '近代・スペイン',
    traits: ['革新', '多産', '実験的'],
    portraitUrl: wikimedia('Pablo_picasso_1.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'lined', 'contemplative'],
    },
  },
  {
    id: 'tolstoy', name: 'トルストイ', era: '近代・ロシア',
    traits: ['壮大', '思索', '良心'],
    portraitUrl: wikimedia('L.N.Tolstoy_Prokudin-Gorsky.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'ascetic', 'contemplative'],
    },
  },
  {
    id: 'dostoevsky', name: 'ドストエフスキー', era: '近代・ロシア',
    traits: ['深淵', '良心', '苦悩'],
    portraitUrl: wikimedia('Vasily_Perov_-_Портрет_Ф.М.Достоевского_-_Google_Art_Project.jpg'),
    features: {
      faceShape: 'oblong', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'contemplative', 'austere'],
    },
  },
  {
    id: 'dickinson', name: 'エミリー・ディキンソン', era: '近代・アメリカ',
    traits: ['内省', '簡潔', '独創'],
    portraitUrl: wikimedia('Black-white_photograph_of_Emily_Dickinson2.png'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated-oval', 'refined-features', 'composed-expression'],
    },
  },
  {
    id: 'woolf', name: 'ヴァージニア・ウルフ', era: '近代・イギリス',
    traits: ['意識', '革新', '繊細'],
    portraitUrl: wikimedia('George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular profile', 'refined features', 'contemplative expression'],
    },
  },
  {
    id: 'hemingway', name: 'アーネスト・ヘミングウェイ', era: '近代・アメリカ',
    traits: ['簡潔', '冒険', '硬骨'],
    portraitUrl: wikimedia('ErnestHemingway.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'roman', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['angular', 'structured', 'defined'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
