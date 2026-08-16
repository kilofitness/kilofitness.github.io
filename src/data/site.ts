export type TrainerImage = {
  name: string;
  alt: string;
  width: number;
  height: number;
  jpegWidths: readonly [number, number];
  avifWidth?: number;
};

export type TrainerCredential = {
  title: string;
  subtitle: string;
};

export type TrainerExperience = {
  period: string;
  organization: string;
  location: string;
  role?: string;
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
  credentials: TrainerCredential[];
  specialties: string[];
  experience: TrainerExperience[];
  images: {
    primary: TrainerImage;
    studio: TrainerImage;
    coaching: TrainerImage;
    competition: TrainerImage;
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
    credentials: [
      {
        title: "UBC Bachelor of Kinesiology",
        subtitle: "運動機能學學士",
      },
      {
        title: "NASM-CPT",
        subtitle: "美國國家運動醫學學會私人教練",
      },
      {
        title: "TATHA-SMT",
        subtitle: "運動按摩技術員",
      },
    ],
    specialties: [
      "女性增肌減脂",
      "女性體態雕塑",
      "銀髮族運動與肌力訓練",
      "體態矯正與動作優化",
      "肌肉放鬆與運動恢復",
    ],
    experience: [
      {
        period: "2026–Present",
        organization: "KILO Fitness",
        location: "台中",
        role: "Personal Trainer",
      },
      {
        period: "2025–2026",
        organization: "自由教練",
        location: "溫哥華",
      },
      {
        period: "2025–2026",
        organization: "The Home Court",
        location: "溫哥華",
        role: "Personal Trainer",
      },
      {
        period: "2022–2024",
        organization: "莫耳健身",
        location: "台中",
        role: "Personal Trainer",
      },
    ],
    images: {
      primary: {
        name: "jessica-coaching-primary",
        alt: "KILO Fitness 教練 Jessica 指導學員進行硬舉訓練",
        width: 1179,
        height: 2099,
        jpegWidths: [800, 1179],
        avifWidth: 1000,
      },
      studio: {
        name: "jessica-kilo-portrait",
        alt: "Jessica 於 KILO Fitness 訓練空間",
        width: 1980,
        height: 3520,
        jpegWidths: [800, 1400],
      },
      coaching: {
        name: "jessica-coaching-pullup",
        alt: "教練 Jessica 指導學員進行引體向上訓練",
        width: 1179,
        height: 2091,
        jpegWidths: [800, 1179],
      },
      competition: {
        name: "jessica-competition",
        alt: "Jessica 參與體能競賽中的推雪橇項目",
        width: 4000,
        height: 2666,
        jpegWidths: [1000, 1800],
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
  phone: "",
  address: "",
  mapUrl: "",
  canonicalUrl: "https://kilofitness.github.io/",
  locationLabel: "台中・沙鹿",
  trainers,
  trainingAreas: [
    {
      title: "肌力訓練",
      description: "從動作品質開始，循序建立能真正帶進生活裡的力量。",
    },
    {
      title: "體態改善",
      description: "依照個人目標與狀態，建立可以長期執行的訓練方式。",
    },
    {
      title: "動作品質",
      description: "留意每一個動作細節，在穩定與控制中打好訓練基礎。",
    },
    {
      title: "個人化訓練",
      description: "尊重每個人的起點與步調，讓訓練貼近你的日常與目標。",
    },
  ],
} as const;
