# KILO Fitness Website

KILO Fitness 的單頁品牌形象網站，使用 Vite、React 與 TypeScript 製作。

## 開發

```bash
npm install
npm run dev
```

正式建置：

```bash
npm run build
npm run preview
```

## 更新店家與教練資料

所有可變動的店家資訊都集中在 `src/data/site.ts`：

- `instagram`：Instagram 網址
- `threads`：Threads 網址
- `facebook`：Facebook 專頁網址
- `lineUrl`：LINE 諮詢網址；留空時不顯示
- `phone`：電話；留空時不顯示
- `address`：完整地址；確認前請保持空白
- `mapUrl`：Google Maps 網址；留空時不顯示
- `canonicalUrl`：網站正式網址，上線時填入
- `trainers`：教練姓名、職稱、專長、介紹與照片；可放一位或多位

教練照片建議放在 `public/images/`，並在資料中使用 `/images/檔名`。

## 圖片

網站使用 `public/images/` 內的已最佳化圖片。首屏載入響應式 JPEG，其餘圖片延遲載入；直式照片另提供 AVIF。原始攝影檔保留在 `Gym Images/`。
