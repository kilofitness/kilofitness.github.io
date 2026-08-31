export type TrainerImage = {
  name: string;
  alt: string;
  width: number;
  height: number;
  jpegWidths: readonly number[];
  avifWidth?: number;
};

export type TrainerCredential = {
  title: string;
  titleDetail?: string;
  subtitle: string;
};

export type TrainerExperience = {
  period: string;
  organization: string;
  location: string;
  role?: string;
};

export type TrainerSpecialty = {
  title: string;
  description?: string;
};

export type TrainerImageCaptions = {
  primary: string;
  studio: string;
  coaching: string;
  actionLabel: string;
  actionText: string;
};

export type Trainer = {
  id: string;
  name: string;
  chineseName: string;
  role: string;
  roleZh: string;
  educationSummary: string;
  educationSummaryZh: string;
  intro: string;
  quote?: string;
  highlights: string[];
  biography?: string[];
  credentials: TrainerCredential[];
  specialties: TrainerSpecialty[];
  experience: TrainerExperience[];
  imageCaptions: TrainerImageCaptions;
  images: {
    primary: TrainerImage;
    studio: TrainerImage;
    coaching: TrainerImage;
    action: TrainerImage;
  };
};

const trainers = [
  {
    id: "jessica",
    name: "Jessica",
    chineseName: "西卡",
    role: "Personal Trainer",
    roleZh: "私人教練",
    educationSummary: "Kinesiology Graduate",
    educationSummaryZh: "運動機能學學士",
    intro: "擁有台灣與加拿大健身教學經驗，專注於女性增肌減脂、體態雕塑與動作品質改善。",
    highlights: ["台灣 × 加拿大", "英屬哥倫比亞大學運動機能學"],
    credentials: [
      {
        title: "UBC Bachelor of Kinesiology",
        subtitle: "加拿大英屬哥倫比亞大學 運動機能學學士",
      },
      {
        title: "NASM-CPT",
        titleDetail: "NASM-Certified Personal Trainer",
        subtitle: "美國國家運動醫學學會私人教練",
      },
      {
        title: "TATHA-SMT",
        titleDetail: "TATHA - Sports Massage Technician",
        subtitle: "台灣運動保健學會 運動按摩技術員",
      },
    ],
    specialties: [
      { title: "女性增肌減脂" },
      { title: "女性體態雕塑" },
      { title: "銀髮族運動與肌力訓練" },
      { title: "體態矯正與動作優化" },
      { title: "肌肉放鬆與運動恢復" },
    ],
    experience: [
      {
        period: "2026–至今",
        organization: "KILO Fitness",
        location: "台灣",
        role: "私人教練",
      },
      {
        period: "2025–2026",
        organization: "自由教練",
        location: "加拿大",
      },
      {
        period: "2025–2026",
        organization: "The Home Court",
        location: "加拿大",
        role: "私人教練",
      },
      {
        period: "2022–2024",
        organization: "莫耳健身",
        location: "台灣",
        role: "私人教練",
      },
    ],
    imageCaptions: {
      primary: "KILO · SHALU",
      studio: "UBC · KINESIOLOGY",
      coaching: "COACHING · ATTENTION TO DETAIL",
      actionLabel: "IN MOTION",
      actionText: "Training is personal.",
    },
    images: {
      primary: {
        name: "jessica-kilo-selfie",
        alt: "KILO Fitness 教練 Jessica 於沙鹿訓練空間留影",
        width: 1980,
        height: 3520,
        jpegWidths: [640, 800, 1179],
      },
      studio: {
        name: "jessica-ubc-graduation",
        alt: "Jessica 於加拿大英屬哥倫比亞大學畢業留影",
        width: 7008,
        height: 3944,
        jpegWidths: [640, 1000, 1600],
      },
      coaching: {
        name: "jessica-specialties",
        alt: "教練 Jessica 協助學員進行伸展與動作調整",
        width: 3944,
        height: 7008,
        jpegWidths: [640, 1000, 1600],
      },
      action: {
        name: "jessica-competition",
        alt: "Jessica 參與體能競賽中的推雪橇項目",
        width: 4000,
        height: 2666,
        jpegWidths: [640, 1000, 1800],
      },
    },
  },
  {
    id: "loswei",
    name: "LosWei",
    chineseName: "偉政老師",
    role: "Personal Trainer",
    roleZh: "私人教練",
    educationSummary: "Movement & Strength Coach",
    educationSummaryZh: "動作與肌力教練",
    intro: "擁有 10 年以上運動教學經驗，具備台灣與加拿大跨國教學背景，專注於體態改善、肌力訓練與結構調整。",
    quote: "對我而言，訓練不只是改變外在體態，更重要的是讓身體能夠真正支持你的生活。",
    highlights: ["10 年以上教學經驗", "台灣 × 加拿大"],
    biography: [
      "曾擔任加拿大保齡球國家代表隊隊員體適能指導員，將肌力訓練、足踝動作與動力鏈整合於訓練之中，協助球員遠離職業傷害，建立更穩定、更有可控能力的身體。",
    ],
    credentials: [
      {
        title: "TPFDA-FFI",
        subtitle: "台灣體適能運動發展協會 健身指導員",
      },
      {
        title: "TPFDA-BFFSF",
        subtitle: "台灣體適能運動發展協會 足踝動作訓練實作",
      },
      {
        title: "TATHA-SMT",
        subtitle: "台灣運動保健協會 運動按摩技術員",
      },
      {
        title: "CPR+AED",
        subtitle: "社團法人台中市紅十字會",
      },
    ],
    specialties: [
      {
        title: "肌力與身體機能提升",
        description: "建立肌力基礎，提升身體整體活動能力。",
      },
      {
        title: "銀髮族運動與傷害預防",
        description: "強化肌力與平衡，守住長期生活品質。",
      },
      {
        title: "體態與動作品質優化",
        description: "改善身體姿勢，遠離酸痛文明病。",
      },
      {
        title: "肌肉放鬆與運動恢復",
        description: "緩解肌肉緊繃，加速訓練後身體恢復，改善關節活動度。",
      },
    ],
    experience: [
      {
        period: "2026–至今",
        organization: "KILO Fitness",
        location: "台灣",
        role: "私人教練",
      },
      {
        period: "2025–2026",
        organization: "The Home Court",
        location: "加拿大",
        role: "自由接案私人教練",
      },
      {
        period: "2024–2025",
        organization: "Burning Hormone Fitness",
        location: "加拿大",
        role: "私人教練｜運動按摩技術員",
      },
      {
        period: "2023–2024",
        organization: "健身工廠",
        location: "台灣",
        role: "私人教練",
      },
      {
        period: "2016–2021",
        organization: "VIA琢璞藝術學院、PariJ Studio、IO 動態娛樂",
        location: "台灣",
        role: "體能發展指導",
      },
      {
        period: "2017–2019",
        organization: "世界健身、極限健身、永豐棧酒店",
        location: "台灣",
        role: "體適能指導員",
      },
    ],
    imageCaptions: {
      primary: "MOVEMENT · STRENGTH · COACHING",
      studio: "COACHING · CLEAR GUIDANCE",
      coaching: "SUPPORT · EVERY STAGE",
      actionLabel: "MOVEMENT PRACTICE",
      actionText: "Strength that supports life.",
    },
    images: {
      primary: {
        name: "loswei-kilo-portrait",
        alt: "KILO Fitness 教練 LosWei 在訓練空間示範棍棒動作",
        width: 3944,
        height: 7008,
        jpegWidths: [640, 1000, 1400],
      },
      studio: {
        name: "loswei-coaching-detail",
        alt: "教練 LosWei 於 KILO Fitness 專注說明動作細節",
        width: 3944,
        height: 7008,
        jpegWidths: [640, 1000, 1400],
      },
      coaching: {
        name: "loswei-senior-coaching",
        alt: "教練 LosWei 陪伴銀髮學員進行棍棒動作練習",
        width: 3944,
        height: 7008,
        jpegWidths: [640, 1000, 1400],
      },
      action: {
        name: "loswei-movement-coaching",
        alt: "教練 LosWei 示範足踝與動作控制訓練",
        width: 3944,
        height: 7008,
        jpegWidths: [640, 1000, 1400],
      },
    },
  },
] satisfies Trainer[];

export const site = {
  name: "KILO Fitness",
  chineseName: "KILO Fitness 海線健身｜沙鹿健身",
  instagram: "https://www.instagram.com/kilo.tw/",
  threads: "https://www.threads.com/@kilo.tw?xmt=AQG0Zbr9ofGXyp0i_lFwqXKsOxd9_Dw7cFs7ZQnOmaRq7fY",
  facebook: "https://www.facebook.com/profile.php?id=61591039843285&ref=PROFILE_EDIT_xav_ig_profile_page_web#",
  lineUrl: "https://line.me/R/ti/p/@106esgcf?oat_content=url&ts=07161849",
  phone: "0928475851",
  phoneDisplay: "0928 475 851",
  address: "433 台中市沙鹿區台灣大道七段303巷7號",
  mapUrl: "https://maps.app.goo.gl/xW347tKsff9i4Fos5",
  canonicalUrl: "https://kilofitness.github.io/",
  locationLabel: "台中・沙鹿",
  trainers,
  trainingAreas: [
    {
      icon: "strength",
      title: "肌力訓練",
      description: "從動作品質開始，循序建立能真正帶進生活裡的力量。",
    },
    {
      icon: "posture",
      title: "體態改善",
      description: "依照個人目標與狀態，建立可以長期執行的訓練方式。",
    },
    {
      icon: "movement",
      title: "動作品質",
      description: "留意每一個動作細節，在穩定與控制中打好訓練基礎。",
    },
    {
      icon: "personal",
      title: "個人化訓練",
      description: "尊重每個人的起點與步調，讓訓練貼近你的日常與目標。",
    },
  ],
} as const;
