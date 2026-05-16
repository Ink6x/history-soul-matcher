import { wikimedia, type HistoricalFigure } from './_shared';

export const SCIENCE_FIGURES = [
  {
    id: 'pythagoras', name: 'ピタゴラス', era: '古代・ギリシャ',
    traits: ['数理', '神秘', '探究'],
    portraitUrl: wikimedia('Kapitolinischer_Pythagoras_adjusted.jpg'),
    features: {
      faceShape: 'long', jawline: 'pointed', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['classical', 'austere', 'contemplative'],
    },
  },
  {
    id: 'hippocrates', name: 'ヒポクラテス', era: '古代・ギリシャ',
    traits: ['医学', '倫理', '観察'],
    portraitUrl: wikimedia('HippocratesRubens.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['venerable', 'observant', 'measured'],
    },
  },
  {
    id: 'archimedes', name: 'アルキメデス', era: '古代・ギリシャ',
    traits: ['発明', '応用', '集中'],
    portraitUrl: wikimedia('Domenico-Fetti_Archimedes_1620.jpg'),
    features: {
      faceShape: 'long', jawline: 'pointed', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'bushy', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['angular', 'contemplative', 'scholarly'],
    },
  },
  {
    id: 'hypatia', name: 'ヒュパティア', era: '古代・アレクサンドリア',
    traits: ['哲学', '数学', '自由'],
    portraitUrl: wikimedia('Hypatia_portrait.png'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['classical profile', 'refined contours', 'delicate features'],
    },
  },
  {
    id: 'davinci', name: 'レオナルド・ダ・ヴィンチ', era: 'ルネサンス・イタリア',
    traits: ['多才', '観察力', '美意識'],
    portraitUrl: wikimedia('Francesco_Melzi_-_Portrait_of_Leonardo.png'),
    features: {
      faceShape: 'long', jawline: 'pointed', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'straight', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['contemplative', 'angular', 'piercing'],
    },
  },
  {
    id: 'copernicus', name: 'コペルニクス', era: 'ルネサンス・ポーランド',
    traits: ['革新', '観測', '勇気'],
    portraitUrl: wikimedia('Nikolaus_Kopernikus.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'austere', 'contemplative'],
    },
  },
  {
    id: 'galileo', name: 'ガリレオ・ガリレイ', era: 'ルネサンス・イタリア',
    traits: ['観測', '実証', '反骨'],
    portraitUrl: wikimedia('Justus_Sustermans_-_Portrait_of_Galileo_Galilei,_1636.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['scholarly', 'austere', 'focused'],
    },
  },
  {
    id: 'kepler', name: 'ヨハネス・ケプラー', era: 'ルネサンス・ドイツ',
    traits: ['数理', '神秘', '粘り'],
    portraitUrl: wikimedia('Johannes_Kepler_1610.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['scholarly', 'intense', 'angular'],
    },
  },
  {
    id: 'newton', name: 'アイザック・ニュートン', era: '近世・イギリス',
    traits: ['探究心', '集中力', '内向性'],
    portraitUrl: wikimedia('GodfreyKneller-IsaacNewton-1689.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['contemplative', 'elongated proportions', 'refined features'],
    },
  },
  {
    id: 'lavoisier', name: 'ラヴォアジエ', era: '近代・フランス',
    traits: ['化学', '計量', '精密'],
    portraitUrl: wikimedia('David_-_Portrait_of_Monsieur_Lavoisier_and_His_Wife.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['refined', 'symmetrical', 'delicate', 'composed'],
    },
  },
  {
    id: 'faraday', name: 'マイケル・ファラデー', era: '近代・イギリス',
    traits: ['実験', '謙虚', '直感'],
    portraitUrl: wikimedia('M_Faraday_Th_Phillips_oil_1842.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'refined', 'contemplative'],
    },
  },
  {
    id: 'darwin', name: 'チャールズ・ダーウィン', era: '近代・イギリス',
    traits: ['観察', '忍耐', '変革'],
    portraitUrl: wikimedia('Charles_Darwin_seated_crop.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['austere', 'angular', 'contemplative'],
    },
  },
  {
    id: 'mendel', name: 'グレゴール・メンデル', era: '近代・オーストリア',
    traits: ['観察', '統計', '信仰'],
    portraitUrl: wikimedia('Gregor_Mendel_2.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['structured', 'austere', 'intellectual'],
    },
  },
  {
    id: 'pasteur', name: 'ルイ・パスツール', era: '近代・フランス',
    traits: ['実証', '革新', '勤勉'],
    portraitUrl: wikimedia('Louis_Pasteur,_foto_av_Paul_Nadar,_Crisco_edit.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'austere', 'composed'],
    },
  },
  {
    id: 'mendeleev', name: 'メンデレーエフ', era: '近代・ロシア',
    traits: ['体系化', '直感', '頑固'],
    portraitUrl: wikimedia('Dmitri_Mendeleev_1890s.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated', 'austere', 'contemplative'],
    },
  },
  {
    id: 'edison', name: 'トーマス・エジソン', era: '近代・アメリカ',
    traits: ['発明', '勤勉', '商才'],
    portraitUrl: wikimedia('Thomas_Edison2.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['angular', 'austere', 'linear'],
    },
  },
  {
    id: 'tesla', name: 'ニコラ・テスラ', era: '近代・セルビア/アメリカ',
    traits: ['天才', '孤高', '先見性'],
    portraitUrl: wikimedia('Tesla_circa_1890.jpeg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'austere', 'defined'],
    },
  },
  {
    id: 'curie', name: 'マリ・キュリー', era: '近代・ポーランド/フランス',
    traits: ['粘り強さ', '探究心', '謙虚'],
    portraitUrl: wikimedia('Marie_Curie_c1920.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['austere', 'angular', 'composed'],
    },
  },
  {
    id: 'lovelace', name: 'エイダ・ラブレス', era: '近代・イギリス',
    traits: ['先駆', '想像力', '数理'],
    portraitUrl: wikimedia('Ada_Lovelace_portrait.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['delicate', 'refined', 'frontal-gaze', 'symmetrical'],
    },
  },
  {
    id: 'einstein', name: 'アルベルト・アインシュタイン', era: '近代・ドイツ',
    traits: ['知性', '好奇心', '独創性'],
    portraitUrl: wikimedia('Albert_Einstein_Head.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['contemplative', 'angular', 'refined'],
    },
  },
  {
    id: 'bohr', name: 'ニールス・ボーア', era: '近代・デンマーク',
    traits: ['対話', '直感', '量子'],
    portraitUrl: wikimedia('Niels_Bohr.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'austere', 'composed'],
    },
  },
  {
    id: 'fermi', name: 'エンリコ・フェルミ', era: '近代・イタリア/アメリカ',
    traits: ['実験', '理論', '集中'],
    portraitUrl: wikimedia('Enrico_Fermi_1943-49.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['composed', 'angular-structure', 'measured-expression'],
    },
  },
  {
    id: 'turing', name: 'アラン・チューリング', era: '近代・イギリス',
    traits: ['抽象', '創造', '孤独'],
    portraitUrl: wikimedia('Alan_Turing_Aged_16.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'composed', 'structured'],
    },
  },
  {
    id: 'pauling', name: 'ライナス・ポーリング', era: '近代・アメリカ',
    traits: ['多分野', '平和', '雄弁'],
    portraitUrl: wikimedia('Linus_Pauling.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'intellectual', 'balanced'],
    },
  },
  {
    id: 'hawking', name: 'スティーブン・ホーキング', era: '現代・イギリス',
    traits: ['宇宙', '不屈', 'ユーモア'],
    portraitUrl: wikimedia('Stephen_Hawking.StarChild.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'intellectual', 'composed'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
