export type Trainer = {
  name: string;
  englishName?: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
  imageAlt: string;
};

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
  canonicalUrl: "",
  locationLabel: "台中・沙鹿",
  // TODO: 確認教練姓名、介紹與照片後，依照 Trainer 格式加入；支援多位教練。
  trainers: [] as Trainer[],
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
