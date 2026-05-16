import { wikimedia, type HistoricalFigure } from './_shared';

export const FICTION_MYTH_FIGURES = [
  {
    id: 'zeus', name: 'ゼウス', era: '神話・ギリシャ',
    traits: ['雷霆', '統治', '威厳'],
    portraitUrl: wikimedia('Zeus_Otricoli_Pio-Clementino_Inv257.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'almond', eyeSpacing: 'wide',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['thundering', 'patriarchal', 'imposing'],
    },
  },
  {
    id: 'athena', name: 'アテナ', era: '神話・ギリシャ',
    traits: ['知恵', '戦略', '工芸'],
    portraitUrl: wikimedia('Athena_Giustiniani_Musei_Capitolini_MC278.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'wide',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['serene', 'wise', 'martial'],
    },
  },
  {
    id: 'apollo', name: 'アポロン', era: '神話・ギリシャ',
    traits: ['芸術', '光', '予言'],
    portraitUrl: wikimedia('Apollo_of_the_Belvedere.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['radiant', 'youthful', 'ideal'],
    },
  },
  {
    id: 'aphrodite', name: 'アフロディーテ', era: '神話・ギリシャ',
    traits: ['美', '愛', '魅惑'],
    portraitUrl: wikimedia('Aphrodite_of_Milos.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['alluring', 'graceful', 'sensual'],
    },
  },
  {
    id: 'hercules', name: 'ヘラクレス', era: '神話・ギリシャ',
    traits: ['怪力', '英雄', '苦難'],
    portraitUrl: wikimedia('Hercules_Farnese_3637104088_9c95d7fe3c_b.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['herculean', 'rugged', 'heroic'],
    },
  },
  {
    id: 'odysseus', name: 'オデュッセウス', era: '神話・ギリシャ',
    traits: ['知略', '冒険', '帰郷'],
    portraitUrl: wikimedia('Head_Odysseus_MAR_Sperlonga.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['cunning', 'weathered', 'restless'],
    },
  },
  {
    id: 'achilles', name: 'アキレス', era: '神話・ギリシャ',
    traits: ['武勇', '誇り', '宿命'],
    portraitUrl: wikimedia('Akhilleus_Patroklos_Antikensammlung_Berlin_F2278.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['proud', 'warlike', 'ill-fated'],
    },
  },
  {
    id: 'odin', name: 'オーディン', era: '神話・北欧',
    traits: ['知恵', '戦', '犠牲'],
    portraitUrl: wikimedia('Georg_von_Rosen_-_Oden_som_vandringsman,_1886_(Odin,_the_Wanderer).jpg'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'hooded', eyeSpacing: 'wide',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['one-eyed', 'wandering', 'sage'],
    },
  },
  {
    id: 'thor', name: 'トール', era: '神話・北欧',
    traits: ['雷', '剛力', '守護'],
    portraitUrl: wikimedia('Mårten_Eskil_Winge_-_Tor\'s_Fight_with_the_Giants_-_Google_Art_Project.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'round', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'full', cheekbones: 'broad',
      overallImpression: ['thunderous', 'red-bearded', 'mighty'],
    },
  },
  {
    id: 'loki', name: 'ロキ', era: '神話・北欧',
    traits: ['策謀', '変身', '反逆'],
    portraitUrl: wikimedia('The_Punishment_of_Loki.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'upturned', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'arched', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['mischievous', 'sly', 'mercurial'],
    },
  },
  {
    id: 'arthur', name: 'アーサー王', era: '伝説・ブリテン',
    traits: ['騎士道', '理想', '宿命'],
    portraitUrl: wikimedia('King_Arthur_(Charles_Ernest_Butler).png'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['regal', 'noble', 'tragic'],
    },
  },
  {
    id: 'merlin', name: 'マーリン', era: '伝説・ブリテン',
    traits: ['魔術', '予言', '導師'],
    portraitUrl: wikimedia('Howard_Pyle_-_Merlin.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['mystical', 'venerable', 'enigmatic'],
    },
  },
  {
    id: 'lancelot', name: 'ランスロット', era: '伝説・ブリテン',
    traits: ['騎士', '愛', '苦悩'],
    portraitUrl: wikimedia('How_Sir_Launcelot_Fought_with_a_Friendly_Knight_(Beardsley).jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['gallant', 'tormented', 'noble'],
    },
  },
  {
    id: 'guinevere', name: 'グィネヴィア', era: '伝説・ブリテン',
    traits: ['美', '愛', '誇り'],
    portraitUrl: wikimedia('How_Queen_Guenever_Made_Her_a_Nun.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['regal', 'graceful', 'sorrowful'],
    },
  },
  {
    id: 'robinhood', name: 'ロビン・フッド', era: '伝説・イングランド',
    traits: ['義賊', '弓', '反骨'],
    portraitUrl: wikimedia('Robin_shoots_with_sir_Guy_by_Louis_Rhead_1912.png'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['roguish', 'agile', 'merry'],
    },
  },
  {
    id: 'hamlet', name: 'ハムレット', era: '戯曲・デンマーク',
    traits: ['懐疑', '内省', '復讐'],
    portraitUrl: wikimedia('Sir_Henry_Irving_as_Hamlet.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['brooding', 'pensive', 'tortured'],
    },
  },
  {
    id: 'donquixote', name: 'ドン・キホーテ', era: '小説・スペイン',
    traits: ['理想', '狂気', '騎士道'],
    portraitUrl: wikimedia('Don_Quijote_and_Sancho_Panza.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['gaunt', 'idealistic', 'eccentric'],
    },
  },
  {
    id: 'beowulf', name: 'ベオウルフ', era: '叙事詩・北欧',
    traits: ['武勇', '誇り', '老雄'],
    portraitUrl: wikimedia('Stories_of_beowulf_grendel.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'broad',
      overallImpression: ['stalwart', 'bearded', 'heroic'],
    },
  },
  {
    id: 'amaterasu', name: 'アマテラス', era: '神話・日本',
    traits: ['太陽', '統治', '慈愛'],
    portraitUrl: wikimedia('Amaterasu_cave_large.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['radiant', 'serene', 'divine'],
    },
  },
  {
    id: 'susanoo', name: 'スサノオ', era: '神話・日本',
    traits: ['荒々しさ', '武勇', '反抗'],
    portraitUrl: wikimedia('Susanoo_no_Mikoto_Yoshitoshi.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'round', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['tempestuous', 'wild', 'fierce'],
    },
  },
  {
    id: 'yamatotakeru', name: 'ヤマトタケル', era: '神話・日本',
    traits: ['武勇', '悲劇', '若き英雄'],
    portraitUrl: wikimedia('Yamato_Takeru_in_woman\'s_dress_LACMA_M.84.31.30.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['youthful', 'tragic', 'heroic'],
    },
  },
  {
    id: 'momotaro', name: '桃太郎', era: '昔話・日本',
    traits: ['勇気', '正義', '仲間'],
    portraitUrl: wikimedia('Momotaro_no_Tanjyo.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'button', browShape: 'thick', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['boyish', 'plucky', 'cheerful'],
    },
  },
  {
    id: 'kaguya', name: 'かぐや姫', era: '昔話・日本',
    traits: ['美', '気高さ', '異郷'],
    portraitUrl: wikimedia('The_Tale_of_the_Bamboo_Cutter_-_Discovery_of_Princess_Kaguya.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['ethereal', 'graceful', 'otherworldly'],
    },
  },
  {
    id: 'sunwukong', name: '孫悟空', era: '小説・中国（西遊記）',
    traits: ['自由', '神通力', '反骨'],
    portraitUrl: wikimedia('Sun_Wukong_at_Beijing_opera_-_Tianjin.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'upturned', eyeSpacing: 'wide',
      noseShape: 'button', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['mischievous', 'agile', 'irrepressible'],
    },
  },
  {
    id: 'rama', name: 'ラーマ', era: '神話・インド',
    traits: ['理想', '徳', '武勇'],
    portraitUrl: wikimedia('Rama_with_arrows.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'wide',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['righteous', 'serene', 'princely'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
