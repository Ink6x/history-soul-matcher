import { wikimedia, type HistoricalFigure } from './_shared';

export const JAPANESE_FIGURES = [
  {
    id: 'himiko', name: '卑弥呼', era: '古代・日本',
    traits: ['神秘', '巫女', 'カリスマ'],
    portraitUrl: wikimedia('Himiko.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'wide',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['mystical', 'ancient', 'enigmatic'],
    },
  },
  {
    id: 'shotoku', name: '聖徳太子', era: '飛鳥時代・日本',
    traits: ['知性', '外交', '慈悲'],
    portraitUrl: wikimedia('Prince_Shotoku.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['stylized portraiture', 'linear definition', 'frontal composition'],
    },
  },
  {
    id: 'michinaga', name: '藤原道長', era: '平安時代・日本',
    traits: ['権勢', '教養', '野心'],
    portraitUrl: wikimedia('Fujiwara_no_Michinaga.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['serene', 'composed', 'refined'],
    },
  },
  {
    id: 'murasaki', name: '紫式部', era: '平安時代・日本',
    traits: ['観察力', '繊細', '文学'],
    portraitUrl: wikimedia('Murasaki_Shikibu.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'rounded',
      overallImpression: ['serene', 'contemplative', 'delicate', 'refined'],
    },
  },
  {
    id: 'ichiyo', name: '樋口一葉', era: '明治時代・日本',
    traits: ['文才', '繊細', '儚さ'],
    portraitUrl: wikimedia('Higuchi_Ichiyo.png'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'downturned', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'thin', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['delicate', 'melancholic', 'refined'],
    },
  },
  {
    id: 'yoritomo', name: '源頼朝', era: '鎌倉時代・日本',
    traits: ['統率', '冷静', '慎重'],
    portraitUrl: wikimedia('Minamoto_no_Yoritomo.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['stoic', 'formal', 'angular', 'composed'],
    },
  },
  {
    id: 'masako', name: '北条政子', era: '鎌倉時代・日本',
    traits: ['気丈', '統率力', '芯の強さ'],
    portraitUrl: wikimedia('Hojomasako.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['composed', 'firm', 'dignified'],
    },
  },
  {
    id: 'yoshimitsu', name: '足利義満', era: '室町時代・日本',
    traits: ['美意識', '権力', '教養'],
    portraitUrl: wikimedia('Ashikaga_Yoshimitsu.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['opulent', 'cultured', 'commanding'],
    },
  },
  {
    id: 'shingen', name: '武田信玄', era: '戦国時代・日本',
    traits: ['戦略', '信義', '威厳'],
    portraitUrl: wikimedia('Takeda_Shingen.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['angular', 'commanding', 'stylized', 'theatrical'],
    },
  },
  {
    id: 'kenshin', name: '上杉謙信', era: '戦国時代・日本',
    traits: ['義', '信仰', '武勇'],
    portraitUrl: wikimedia('Uesugi_Kenshin.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['dignified', 'composed', 'formal'],
    },
  },
  {
    id: 'nobunaga', name: '織田信長', era: '戦国時代・日本',
    traits: ['革新', '決断力', '冷酷'],
    portraitUrl: wikimedia('Odanobunaga.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated', 'angular', 'refined'],
    },
  },
  {
    id: 'hideyoshi', name: '豊臣秀吉', era: '戦国〜安土桃山時代・日本',
    traits: ['機転', '人心掌握', '野心'],
    portraitUrl: wikimedia('Toyotomi_hideyoshi.jpg'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['formal', 'composed', 'stylized'],
    },
  },
  {
    id: 'ieyasu', name: '徳川家康', era: '戦国〜江戸時代・日本',
    traits: ['忍耐', '戦略性', '長期視点'],
    portraitUrl: wikimedia('Tokugawa_Ieyasu2.JPG'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['formal', 'composed', 'dignified'],
    },
  },
  {
    id: 'musashi', name: '宮本武蔵', era: '江戸時代・日本',
    traits: ['求道', '孤高', '剣豪'],
    portraitUrl: wikimedia('Miyamoto_Musashi_Self-Portrait.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['angular', 'austere', 'contemplative'],
    },
  },
  {
    id: 'basho', name: '松尾芭蕉', era: '江戸時代・日本',
    traits: ['風雅', '旅情', '観察'],
    portraitUrl: wikimedia('Matsuo_Basho-Tosen.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thin', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['poetic', 'contemplative', 'wandering'],
    },
  },
  {
    id: 'ryoma', name: '坂本龍馬', era: '幕末・日本',
    traits: ['自由', '行動力', '理想'],
    portraitUrl: wikimedia('Sakamoto_Ryōma.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['composed', 'angular', 'austere'],
    },
  },
  {
    id: 'saigo', name: '西郷隆盛', era: '幕末・日本',
    traits: ['誠実', '信念', '武士道'],
    portraitUrl: wikimedia('Saigo_Takamori.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['stoic', 'structured', 'composed'],
    },
  },
  {
    id: 'kaishu', name: '勝海舟', era: '幕末・日本',
    traits: ['開明', '弁論', '胆力'],
    portraitUrl: wikimedia('Katsu_Kaishu.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'thick', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['witty', 'open-minded', 'audacious'],
    },
  },
  {
    id: 'hirobumi', name: '伊藤博文', era: '明治・日本',
    traits: ['実務', '近代化', '冷静'],
    portraitUrl: wikimedia('Itō_Hirobumi.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated', 'austere', 'composed'],
    },
  },
  {
    id: 'fukuzawa', name: '福沢諭吉', era: '明治・日本',
    traits: ['啓蒙', '独立', '論理'],
    portraitUrl: wikimedia('Fukuzawa_Yukichi_1891.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['composed', 'angular', 'austere'],
    },
  },
  {
    id: 'soseki', name: '夏目漱石', era: '明治・日本',
    traits: ['内省', '知性', '憂愁'],
    portraitUrl: wikimedia('Natsume_Soseki_photo.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'angular', 'contemplative'],
    },
  },
  {
    id: 'akiko', name: '与謝野晶子', era: '明治〜大正・日本',
    traits: ['情熱', '革新', '奔放'],
    portraitUrl: wikimedia('Yosano_Akiko_younger.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'full', cheekbones: 'subtle',
      overallImpression: ['passionate', 'romantic', 'bold'],
    },
  },
  {
    id: 'nitobe', name: '新渡戸稲造', era: '明治・日本',
    traits: ['国際性', '誠実', '教育'],
    portraitUrl: wikimedia('Nitobe_Inazo.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['austere', 'intellectual', 'composed'],
    },
  },
  {
    id: 'raicho', name: '平塚らいてう', era: '明治〜昭和・日本',
    traits: ['自立', '革新', '思想'],
    portraitUrl: wikimedia('Hiratsuka_Raicho.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'high',
      overallImpression: ['bold', 'principled', 'pioneering'],
    },
  },
  {
    id: 'yukawa', name: '湯川秀樹', era: '昭和・日本',
    traits: ['探究', '直感', '謙虚'],
    portraitUrl: wikimedia('Hideki_Yukawa_1949.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'composed', 'intellectual'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
