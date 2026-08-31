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

export type ValueProp = { title: string; text: string };
export type Audience = { title: string; text: string };
export type FirstVisitStep = { title: string; text: string };
export type Faq = { question: string; answer: string };
export type Testimonial = {
  id: string;
  name?: string;
  label?: string;
  quote: string;
  source?: "google" | "instagram" | "client";
  sourceUrl?: string;
};

export type TrialSession = {
  enabled: boolean;
  price?: number;
  durationMinutes?: number;
  description?: string;
  includes?: readonly string[];
};

export type GoogleRating = { rating: number; reviewCount: number; url: string };
export type BusinessHours = {
  days: string;
  hours: string;
  schemaDays?: string | string[];
  opens?: string;
  closes?: string;
};
export type Parking = { car?: string; scooter?: string };

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
      "曾擔任加拿大保齡球國家代表隊隊員體適能指導員，將肌力訓練、足踝動作與動力鏈整合於訓練之中，協助球員建立更穩定、更有可控能力的身體。",
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
        title: "銀髮族運動與肌力訓練",
        description: "以肌力與平衡為核心，建立日常活動需要的身體功能。",
      },
      {
        title: "體態與動作品質優化",
        description: "從動作控制與訓練習慣出發，建立更好的訓練基礎。",
      },
      {
        title: "肌肉放鬆與運動恢復",
        description: "協助訓練後的放鬆與恢復安排。",
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

const trialSession: TrialSession = { enabled: true };
// Add confirmed local-business details here when they are available. Undefined values stay hidden on the site.
const optionalGoogleRating = (): GoogleRating | undefined => undefined;
const optionalBusinessHours = (): readonly BusinessHours[] | undefined => undefined;
const optionalParking = (): Parking | undefined => undefined;
const optionalBoolean = (): boolean | undefined => undefined;
const optionalText = (): string | undefined => undefined;
const googleRating = optionalGoogleRating();
const businessHours = optionalBusinessHours();
const parking = optionalParking();
const appointmentOnly = optionalBoolean();
const nearbyLandmark = optionalText();

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
  positioning: {
    eyebrow: "KILO FITNESS · SHALU",
    title: "沙鹿一對一私人教練",
    headline: "為你的身體、目標與生活，打造真正適合你的訓練。",
    services: "增肌減脂 · 體態改善 · 肌力訓練 · 銀髮訓練",
    brandLine: "你的進步，按照你的節奏。",
  },
  valueStrip: ["一對一私人訓練", "台灣 × 加拿大教學經驗", "專業私人教練", "台中 · 沙鹿"],
  valueProps: [
    { title: "每一堂，都為你調整", text: "依照你的目標、訓練經驗與當天狀態，安排適合你的內容與強度。" },
    { title: "每一個動作，都有人看", text: "從姿勢、節奏、重量到活動度，教練即時觀察並協助你建立更好的動作品質。" },
    { title: "不是套用同一張課表", text: "每個人的身體與生活不同，訓練方式也應該不同。" },
    { title: "知道自己為什麼這樣練", text: "不只是完成訓練，也逐步了解自己的身體、動作與進步方式。" },
  ] satisfies readonly ValueProp[],
  audiences: [
    { title: "想開始健身，卻不知道怎麼開始", text: "從基本動作與訓練觀念開始，逐步建立自己的節奏。" },
    { title: "女性增肌減脂與體態雕塑", text: "依照個人目標安排訓練，建立更有力量、也更自在的身體。" },
    { title: "想改善體態與動作品質", text: "從日常姿勢、活動度與動作控制開始，建立更好的訓練基礎。" },
    { title: "想提升肌力與身體機能", text: "循序漸進建立力量，讓訓練真正回到生活。" },
    { title: "銀髮族與中高齡訓練", text: "以肌力、平衡與身體功能為核心，建立能長期維持的活動能力。" },
  ] satisfies readonly Audience[],
  firstVisitSteps: [
    { title: "LINE 聊聊你的目標", text: "告訴我們你目前的狀態、訓練經驗，以及想改善的方向。" },
    { title: "了解身體與動作", text: "教練先了解你的訓練背景與基本動作狀況。" },
    { title: "實際進行一對一訓練", text: "透過實際訓練感受 KILO 的教學方式與節奏。" },
    { title: "找到適合你的訓練安排", text: "根據你的目標與需求，討論後續適合的訓練方向。" },
  ] satisfies readonly FirstVisitStep[],
  testimonials: [] satisfies readonly Testimonial[],
  trialSession,
  googleRating,
  businessHours,
  parking,
  appointmentOnly,
  nearbyLandmark,
  faqs: [
    { question: "完全沒有健身經驗，也適合嗎？", answer: "可以。教練會依照你的訓練經驗與當下狀態安排內容，不需要先具備健身基礎。" },
    { question: "一堂課大約多久？", answer: "課程時間依目前方案為準，歡迎透過 LINE 詢問。" },
    { question: "我要怎麼知道哪位教練適合我？", answer: "可以先透過 LINE 告訴我們你的目標與需求，我們會協助你了解不同教練的訓練方向。" },
    { question: "KILO 在哪裡？", answer: "台中市沙鹿區台灣大道七段303巷7號，可直接透過 Google Maps 導航。" },
    { question: "如何預約體驗？", answer: "點擊網站上的 LINE 預約按鈕，告訴我們你的目標與方便的時間即可開始了解。" },
  ] satisfies readonly Faq[],
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
      description: "從訓練習慣、肌力與動作控制出發，建立更穩定、更自在的身體。",
    },
    {
      icon: "movement",
      title: "動作品質",
      description: "留意每一個動作細節，在穩定與控制中打好訓練基礎。",
    },
    {
      icon: "personal",
      title: "個人化訓練",
      description: "依照你的起點、目標與生活節奏，調整訓練內容與進度。",
    },
  ],
} as const;
