import { wikimedia, type HistoricalFigure } from './_shared';

export const WESTERN_POLITICAL_FIGURES = [
  {
    id: 'alexander', name: 'アレクサンドロス大王', era: '古代・マケドニア',
    traits: ['野心', '征服', 'カリスマ'],
    portraitUrl: wikimedia('Alexander_the_Great_mosaic.jpg'),
    features: {
      faceShape: 'oval', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['angular', 'classical', 'defined'],
    },
  },
  {
    id: 'caesar', name: 'ユリウス・カエサル', era: '古代・ローマ',
    traits: ['野心', '弁論', '戦略'],
    portraitUrl: wikimedia('Gaius_Julius_Caesar_(Vatican_Museum).jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'straight', lipFullness: 'thin', cheekbones: 'high',
      overallImpression: ['imperial', 'calculating', 'magnetic'],
    },
  },
  {
    id: 'augustus', name: 'アウグストゥス', era: '古代・ローマ',
    traits: ['冷静', '統治', '長期視点'],
    portraitUrl: wikimedia('Statue-Augustus.jpg'),
    features: {
      faceShape: 'oval', jawline: 'square', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['classical', 'idealized', 'authoritative'],
    },
  },
  {
    id: 'cleopatra', name: 'クレオパトラ', era: '古代・エジプト',
    traits: ['知略', '魅力', '語学'],
    portraitUrl: wikimedia('Kleopatra-VII.-Altes-Museum-Berlin1.jpg'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['classical', 'refined', 'idealized'],
    },
  },
  {
    id: 'charlemagne', name: 'カール大帝', era: '中世・フランク王国',
    traits: ['統合', '信仰', '威厳'],
    portraitUrl: wikimedia('Albrecht_Dürer_-_Portrait_of_Charlemagne_-_WGA07025.jpg'),
    features: {
      faceShape: 'long', jawline: 'square', eyeShape: 'round', eyeSpacing: 'wide',
      noseShape: 'aquiline', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['imposing', 'regal', 'commanding'],
    },
  },
  {
    id: 'jeanne', name: 'ジャンヌ・ダルク', era: '中世・フランス',
    traits: ['信念', '勇敢', '純粋'],
    portraitUrl: wikimedia('Joan_of_Arc_miniature_graded.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['serene', 'composed', 'refined', 'frontal'],
    },
  },
  {
    id: 'henry8', name: 'ヘンリー8世', era: 'ルネサンス・イングランド',
    traits: ['権勢', '剛胆', '気まぐれ'],
    portraitUrl: wikimedia('Hans_Holbein,_the_Younger,_Around_1497-1543_-_Portrait_of_Henry_VIII_of_England_-_Google_Art_Project.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'frontal-gaze', 'bearded'],
    },
  },
  {
    id: 'elizabeth1', name: 'エリザベス1世', era: 'ルネサンス・イングランド',
    traits: ['知略', '独立', '威厳'],
    portraitUrl: wikimedia('Elizabeth_I_in_coronation_robes.jpg'),
    features: {
      faceShape: 'oval', jawline: 'narrow', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'narrow', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['pale complexion', 'symmetrical features', 'refined delicate structure'],
    },
  },
  {
    id: 'louis14', name: 'ルイ14世', era: '近世・フランス',
    traits: ['絶対王政', '美意識', '権威'],
    portraitUrl: wikimedia('Louis_XIV_of_France.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'dignified', 'formal'],
    },
  },
  {
    id: 'peter1', name: 'ピョートル大帝', era: '近世・ロシア',
    traits: ['改革', '威圧', '探究心'],
    portraitUrl: wikimedia('Peter_der-Grosse_1838.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['elongated-face', 'prominent-mustache', 'refined-features'],
    },
  },
  {
    id: 'catherine2', name: 'エカチェリーナ2世', era: '近世・ロシア',
    traits: ['知略', '啓蒙', '権勢'],
    portraitUrl: wikimedia('Catherine_II_of_Russia.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'almond', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['profile view', 'refined proportions', 'classical engraving technique'],
    },
  },
  {
    id: 'frederick2', name: 'フリードリヒ大王', era: '近世・プロイセン',
    traits: ['軍才', '啓蒙', '芸術'],
    portraitUrl: wikimedia('Friedrich_Zweite_Alt.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'aquiline', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['angular', 'dignified', 'contemplative'],
    },
  },
  {
    id: 'washington', name: 'ジョージ・ワシントン', era: '近世・アメリカ',
    traits: ['誠実', '統率', '謙虚'],
    portraitUrl: wikimedia('Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['composed', 'refined', 'dignified'],
    },
  },
  {
    id: 'jefferson', name: 'トマス・ジェファソン', era: '近世・アメリカ',
    traits: ['理想', '知性', '多才'],
    portraitUrl: wikimedia('Thomas_Jefferson_by_Rembrandt_Peale,_1800.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['composed', 'austere', 'dignified'],
    },
  },
  {
    id: 'napoleon', name: 'ナポレオン・ボナパルト', era: '近世・フランス',
    traits: ['野心', '戦術眼', 'カリスマ'],
    portraitUrl: wikimedia('Jacques-Louis_David_017.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['composed', 'frontal-gaze', 'structured'],
    },
  },
  {
    id: 'robespierre', name: 'ロベスピエール', era: '近代・フランス',
    traits: ['理念', '冷徹', '雄弁'],
    portraitUrl: wikimedia('Robespierre.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['refined', 'symmetrical', 'composed'],
    },
  },
  {
    id: 'antoinette', name: 'マリー・アントワネット', era: '近代・フランス',
    traits: ['華麗', '純真', '悲劇'],
    portraitUrl: wikimedia('Marie_Antoinette_Adult.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'arched', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['refined elegance', 'delicate features', 'aristocratic bearing'],
    },
  },
  {
    id: 'lincoln', name: 'エイブラハム・リンカーン', era: '近代・アメリカ',
    traits: ['誠実', '理想主義', '弁論'],
    portraitUrl: wikimedia('Abraham_Lincoln_O-77_matte_collodion_print.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'deep-set', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['angular', 'gaunt', 'austere'],
    },
  },
  {
    id: 'bismarck', name: 'オットー・フォン・ビスマルク', era: '近代・ドイツ',
    traits: ['策謀', '剛腕', '現実主義'],
    portraitUrl: wikimedia('BSMV2.jpg'),
    features: {
      faceShape: 'square', jawline: 'square', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'thick', lipFullness: 'medium', cheekbones: 'broad',
      overallImpression: ['imposing', 'stern', 'authoritative'],
    },
  },
  {
    id: 'garibaldi', name: 'ガリバルディ', era: '近代・イタリア',
    traits: ['情熱', '統一', '英雄'],
    portraitUrl: wikimedia('Giuseppe_Garibaldi_(1866).jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'prominent',
      overallImpression: ['angular', 'austere', 'dignified'],
    },
  },
  {
    id: 'victoria', name: 'ヴィクトリア女王', era: '近代・イギリス',
    traits: ['威厳', '節度', '長治'],
    portraitUrl: wikimedia('Queen_Victoria_by_Bassano.jpg'),
    features: {
      faceShape: 'round', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['dignified', 'composed', 'structured', 'symmetrical'],
    },
  },
  {
    id: 'troosevelt', name: 'セオドア・ローズベルト', era: '近代・アメリカ',
    traits: ['活力', '改革', '冒険'],
    portraitUrl: wikimedia('President_Roosevelt_-_Pach_Bros.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['angular', 'structured', 'dignified'],
    },
  },
  {
    id: 'churchill', name: 'ウィンストン・チャーチル', era: '近代・イギリス',
    traits: ['不屈', '雄弁', 'ユーモア'],
    portraitUrl: wikimedia('Sir_Winston_Churchill.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'hooded', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'subtle',
      overallImpression: ['authoritative', 'angular', 'determined'],
    },
  },
  {
    id: 'fdr', name: 'フランクリン・ローズベルト', era: '近代・アメリカ',
    traits: ['楽観', '指導力', '改革'],
    portraitUrl: wikimedia('FDR_in_1933.jpg'),
    features: {
      faceShape: 'rectangular', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['structured', 'composed', 'angular'],
    },
  },
  {
    id: 'degaulle', name: 'シャルル・ド・ゴール', era: '近代・フランス',
    traits: ['気位', '愛国', '威厳'],
    portraitUrl: wikimedia('De_Gaulle-OWI.jpg'),
    features: {
      faceShape: 'long', jawline: 'narrow', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'thin', cheekbones: 'subtle',
      overallImpression: ['elongated', 'austere', 'composed'],
    },
  },
  {
    id: 'jfk', name: 'ジョン・F・ケネディ', era: '現代・アメリカ',
    traits: ['若さ', '理想', '雄弁'],
    portraitUrl: wikimedia('John_F._Kennedy,_White_House_color_photo_portrait.jpg'),
    features: {
      faceShape: 'oval', jawline: 'square', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['structured', 'symmetrical', 'angular', 'defined'],
    },
  },
  {
    id: 'mlk', name: 'マーティン・ルーサー・キング', era: '現代・アメリカ',
    traits: ['信念', '弁論', '非暴力'],
    portraitUrl: wikimedia('Martin_Luther_King,_Jr..jpg'),
    features: {
      faceShape: 'oval', jawline: 'square', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['dignified', 'structured', 'composed'],
    },
  },
  {
    id: 'mandela', name: 'ネルソン・マンデラ', era: '現代・南アフリカ',
    traits: ['寛容', '不屈', '和解'],
    portraitUrl: wikimedia('Nelson_Mandela_1994.jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'broad', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['dignified', 'angular-contours', 'expressive-gaze'],
    },
  },
  {
    id: 'guevara', name: 'チェ・ゲバラ', era: '近代・アルゼンチン/キューバ',
    traits: ['情熱', '反骨', '理想'],
    portraitUrl: wikimedia('CheHigh.jpg'),
    features: {
      faceShape: 'long', jawline: 'sharp', eyeShape: 'narrow', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium', cheekbones: 'prominent',
      overallImpression: ['angular', 'intense', 'austere'],
    },
  },
  {
    id: 'thatcher', name: 'マーガレット・サッチャー', era: '現代・イギリス',
    traits: ['剛腕', '信念', '改革'],
    portraitUrl: wikimedia('Margaret_Thatcher_(1983).jpg'),
    features: {
      faceShape: 'oval', jawline: 'soft', eyeShape: 'round', eyeSpacing: 'average',
      noseShape: 'straight', browShape: 'straight', lipFullness: 'medium-thin', cheekbones: 'subtle',
      overallImpression: ['composed', 'structured', 'dignified'],
    },
  },
] as const satisfies readonly HistoricalFigure[];
