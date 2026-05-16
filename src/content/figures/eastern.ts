import { wikimedia, type HistoricalFigure } from './_shared';

export const EASTERN_FIGURES = [
  {
    id: 'hammurabi', name: 'ハンムラビ', era: '古代・バビロニア',
    traits: ['法', '統治', '威厳'],
    portraitUrl: wikimedia('P1050763_Louvre_code_Hammurabi_face_rwk.JPG'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['imperious', 'bearded', 'lawgiving'],
    },
  },
  {
    id: 'darius1', name: 'ダレイオス1世', era: '古代・ペルシャ',
    traits: ['統治', '組織', '建設'],
    portraitUrl: wikimedia('Darius_In_Parse.JPG'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['regal', 'bearded', 'commanding'],
    },
  },
  {
    id: 'qinshihuang', name: '始皇帝', era: '古代・中国',
    traits: ['統一', '専制', '巨大'],
    portraitUrl: wikimedia('Qinshihuang.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['imperious', 'severe', 'monumental'],
    },
  },
  {
    id: 'liubang', name: '劉邦', era: '古代・中国',
    traits: ['人望', '柔軟', '創業'],
    portraitUrl: wikimedia('Hangaozu.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'full', cheekbones: 'high',
      overallImpression: ['shrewd', 'genial', 'commanding'],
    },
  },
  {
    id: 'xiangyu', name: '項羽', era: '古代・中国',
    traits: ['武勇', '剛胆', '悲劇'],
    portraitUrl: wikimedia('Xiang_Yu.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'round', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'full', cheekbones: 'broad',
      overallImpression: ['fierce', 'imposing', 'tragic'],
    },
  },
  {
    id: 'caocao', name: '曹操', era: '三国時代・中国',
    traits: ['才覚', '冷徹', '詩才'],
    portraitUrl: wikimedia('Cao_Cao_scth.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['cunning', 'piercing', 'magnetic'],
    },
  },
  {
    id: 'zhugeliang', name: '諸葛亮', era: '三国時代・中国',
    traits: ['智謀', '忠誠', '計略'],
    portraitUrl: wikimedia('Zhuge_Liang_Sancai_Tuhui.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['serene', 'astute', 'scholarly'],
    },
  },
  {
    id: 'guanyu', name: '関羽', era: '三国時代・中国',
    traits: ['義', '武勇', '忠誠'],
    portraitUrl: wikimedia('Guan_Yu.jpg'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['heroic', 'bearded', 'principled'],
    },
  },
  {
    id: 'tang_taizong', name: '李世民（唐太宗）', era: '唐・中国',
    traits: ['名君', '武勇', '寛容'],
    portraitUrl: wikimedia('TangTaizong.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['regal', 'composed', 'magnanimous'],
    },
  },
  {
    id: 'wuzetian', name: '武則天', era: '唐・中国',
    traits: ['野心', '統治', '冷徹'],
    portraitUrl: wikimedia('A_Tang_Dynasty_Empress_Wu_Zetian.JPG'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['imperious', 'cunning', 'formidable'],
    },
  },
  {
    id: 'libai', name: '李白', era: '唐・中国',
    traits: ['詩想', '奔放', '酒仙'],
    portraitUrl: wikimedia('Li_Bai_Strolling.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['romantic', 'unfettered', 'lyrical'],
    },
  },
  {
    id: 'dufu', name: '杜甫', era: '唐・中国',
    traits: ['憂国', '人情', '叙事'],
    portraitUrl: wikimedia('Dufu.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['sorrowful', 'compassionate', 'weathered'],
    },
  },
  {
    id: 'ashoka', name: 'アショーカ王', era: '古代・インド',
    traits: ['仏教', '慈悲', '統治'],
    portraitUrl: wikimedia('Ashoka_Bust.JPG'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['repentant', 'magnanimous', 'devout'],
    },
  },
  {
    id: 'genghis', name: 'チンギス・ハン', era: '中世・モンゴル',
    traits: ['征服', '統率', '組織'],
    portraitUrl: wikimedia('YuanEmperorAlbumGenghisPortrait.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['fierce', 'commanding', 'steppe-hardened'],
    },
  },
  {
    id: 'kublai', name: 'フビライ・ハン', era: '中世・モンゴル/元',
    traits: ['広域統治', '寛容', '革新'],
    portraitUrl: wikimedia('YuanEmperorAlbumKhubilaiPortrait.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['imperious', 'shrewd', 'corpulent'],
    },
  },
  {
    id: 'saladin', name: 'サラディン', era: '中世・エジプト/シリア',
    traits: ['騎士道', '寛容', '武勇'],
    portraitUrl: wikimedia('Saladin2.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['noble', 'bearded', 'magnanimous'],
    },
  },
  {
    id: 'hongwu', name: '朱元璋（洪武帝）', era: '明・中国',
    traits: ['立志', '専制', '農民出身'],
    portraitUrl: wikimedia('Hongwu1.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['craggy', 'severe', 'wary'],
    },
  },
  {
    id: 'akbar', name: 'アクバル大帝', era: '中世・ムガル帝国',
    traits: ['寛容', '統治', '宗教融和'],
    portraitUrl: wikimedia('Akbar_(cropped).jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['benevolent', 'shrewd', 'tolerant'],
    },
  },
  {
    id: 'suleiman', name: 'スレイマン1世', era: '近世・オスマン帝国',
    traits: ['立法', '武勇', '芸術擁護'],
    portraitUrl: wikimedia('EmperorSuleiman.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['regal', 'austere', 'magnificent'],
    },
  },
  {
    id: 'kangxi', name: '康熙帝', era: '清・中国',
    traits: ['学問', '統治', '寛容'],
    portraitUrl: wikimedia('Portrait_of_the_Kangxi_Emperor_in_Court_Dress.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'erudite', 'sage'],
    },
  },
  {
    id: 'qianlong', name: '乾隆帝', era: '清・中国',
    traits: ['繁栄', '芸術', '誇り'],
    portraitUrl: wikimedia('The_Qianlong_Emperor_in_Ceremonial_Armour_on_Horseback.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['regal', 'composed', 'opulent'],
    },
  },
  {
    id: 'cixi', name: '西太后', era: '清・中国',
    traits: ['権勢', '保守', '権謀'],
    portraitUrl: wikimedia('The_Ci-Xi_Imperial_Dowager_Empress_(5).JPG'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'arched', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['imperious', 'shrewd', 'severe'],
    },
  },
  {
    id: 'sunyatsen', name: '孫文', era: '近代・中国',
    traits: ['革命', '理想', '建国'],
    portraitUrl: wikimedia('Sun_Yat_Sen_portrait.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['principled', 'composed', 'visionary'],
    },
  },
  {
    id: 'maozedong', name: '毛沢東', era: '現代・中国',
    traits: ['革命', '権勢', '詩才'],
    portraitUrl: wikimedia('Mao_Zedong_1959_(cropped).jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['imposing', 'enigmatic', 'commanding'],
    },
  },
  {
    id: 'rumi', name: 'ルーミー', era: '中世・ペルシャ',
    traits: ['詩想', '愛', '神秘'],
    portraitUrl: wikimedia('Molana.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['mystical', 'serene', 'devout'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
