import { wikimedia, type HistoricalFigure } from './_shared';

export const RELIGION_PHILOSOPHY_FIGURES = [
  {
    id: 'laozi', name: '老子', era: '古代・中国',
    traits: ['無為', '自然', '深淵'],
    portraitUrl: wikimedia('Laozi_002.jpg'),
    features: {
      faceShape: 'long', jawline: 'pointed', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'bushy', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['dignified', 'contemplative', 'weathered'],
    },
  },
  {
    id: 'confucius', name: '孔子', era: '古代・中国',
    traits: ['礼節', '教育', '徳'],
    portraitUrl: wikimedia('Konfuzius-1770.jpg'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['dignified', 'composed', 'authoritative'],
    },
  },
  {
    id: 'mencius', name: '孟子', era: '古代・中国',
    traits: ['性善', '弁論', '倫理'],
    portraitUrl: wikimedia('Half_Portraits_of_the_Great_Sage_and_Virtuous_Men_of_Old_-_Meng_Ke_(孟軻).jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['didactic', 'principled', 'composed'],
    },
  },
  {
    id: 'zhuangzi', name: '荘子', era: '古代・中国',
    traits: ['自由', '寓話', '逍遥'],
    portraitUrl: wikimedia('Zhuangzi.gif'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thin', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['playful', 'detached', 'whimsical'],
    },
  },
  {
    id: 'buddha', name: '釈迦', era: '古代・インド',
    traits: ['内省', '慈悲', '悟り'],
    portraitUrl: wikimedia('Gautama_Buddha_in_Sarnath_Museum_(Dhammajak_Mutra).jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'wide',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['serene', 'compassionate', 'introspective'],
    },
  },
  {
    id: 'socrates', name: 'ソクラテス', era: '古代・ギリシャ',
    traits: ['問答', '謙虚', '真理'],
    portraitUrl: wikimedia('Socrates_Louvre.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'full', cheekbones: 'broad',
      overallImpression: ['homely', 'inquisitive', 'venerable'],
    },
  },
  {
    id: 'plato', name: 'プラトン', era: '古代・ギリシャ',
    traits: ['理想', '対話', '形而上学'],
    portraitUrl: wikimedia('Plato_Silanion_Musei_Capitolini_MC1377.jpg'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['noble', 'lofty', 'philosophical'],
    },
  },
  {
    id: 'aristotle', name: 'アリストテレス', era: '古代・ギリシャ',
    traits: ['体系', '観察', '論理'],
    portraitUrl: wikimedia('Aristotle_Altemps_Inv8575.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['analytical', 'composed', 'erudite'],
    },
  },
  {
    id: 'augustine', name: 'アウグスティヌス', era: '古代・ローマ',
    traits: ['告白', '信仰', '内省'],
    portraitUrl: wikimedia('Saint_Augustine_by_Philippe_de_Champaigne.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['devout', 'intense', 'searching'],
    },
  },
  {
    id: 'aquinas', name: 'トマス・アクィナス', era: '中世・イタリア',
    traits: ['神学', '体系', '理性'],
    portraitUrl: wikimedia('St-thomas-aquinas.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['portly', 'serene', 'meditative'],
    },
  },
  {
    id: 'luther', name: 'マルティン・ルター', era: '近世・ドイツ',
    traits: ['改革', '信念', '雄弁'],
    portraitUrl: wikimedia('Lucas_Cranach_d.Ä._-_Martin_Luther,_1528_(Veste_Coburg)_(cropped).jpg'),
    features: {
      faceShape: 'round', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['stocky', 'defiant', 'earnest'],
    },
  },
  {
    id: 'calvin', name: 'ジャン・カルヴァン', era: '近世・フランス',
    traits: ['厳格', '神学', '禁欲'],
    portraitUrl: wikimedia('John_Calvin_by_Holbein.png'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['austere', 'severe', 'ascetic'],
    },
  },
  {
    id: 'spinoza', name: 'スピノザ', era: '近世・オランダ',
    traits: ['汎神論', '理性', '寡欲'],
    portraitUrl: wikimedia('Spinoza.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['tranquil', 'thoughtful', 'gentle'],
    },
  },
  {
    id: 'kant', name: 'イマヌエル・カント', era: '近代・ドイツ',
    traits: ['義務', '理性', '規律'],
    portraitUrl: wikimedia('Immanuel_Kant_(painted_portrait).jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['precise', 'disciplined', 'austere'],
    },
  },
  {
    id: 'hegel', name: 'ヘーゲル', era: '近代・ドイツ',
    traits: ['弁証法', '体系', '歴史'],
    portraitUrl: wikimedia('Hegel_portrait_by_Schlesinger_1831.jpg'),
    features: {
      faceShape: 'long', jawline: 'soft', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['ponderous', 'serious', 'analytical'],
    },
  },
  {
    id: 'schopenhauer', name: 'ショーペンハウアー', era: '近代・ドイツ',
    traits: ['意志', '悲観', '芸術'],
    portraitUrl: wikimedia('Arthur_Schopenhauer.jpg'),
    features: {
      faceShape: 'square', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'broad',
      overallImpression: ['scowling', 'shaggy', 'pessimistic'],
    },
  },
  {
    id: 'kierkegaard', name: 'キェルケゴール', era: '近代・デンマーク',
    traits: ['実存', '不安', '信仰'],
    portraitUrl: wikimedia('Søren_Kierkegaard_(1813-1855)_-_(cropped).jpg'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'arched', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['anxious', 'introspective', 'sensitive'],
    },
  },
  {
    id: 'marx', name: 'カール・マルクス', era: '近代・ドイツ',
    traits: ['革命', '分析', '理想'],
    portraitUrl: wikimedia('Karl_Marx_001.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'thin', cheekbones: 'broad',
      overallImpression: ['shaggy', 'fierce', 'prophetic'],
    },
  },
  {
    id: 'nietzsche', name: 'ニーチェ', era: '近代・ドイツ',
    traits: ['超人', '反骨', '詩想'],
    portraitUrl: wikimedia('Nietzsche187a.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['intense', 'piercing', 'tortured'],
    },
  },
  {
    id: 'gandhi', name: 'マハトマ・ガンジー', era: '近代・インド',
    traits: ['非暴力', '信念', '質素'],
    portraitUrl: wikimedia('Portrait_Gandhi.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['nonviolent', 'humble', 'resolute'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
