import { ContentBlock } from '@/models/content/ContentBlock';

export const aboutUsZH: ContentBlock[] = [
  {
    type: 'HeroRight',
    title: '關於我們',
    content:
      '歡迎來到好物の家，我們致力於為您挑選高品質的生活精品，提升您的生活水平。我們相信，每一件精心挑選的好物都能為您的生活增添一份美好和便利。無論是家居用品、個人護理還是時尚配件，我們都精挑細選，只為讓您享受更有質感的生活。選擇好物の家，讓我們一起追求更好的生活品質。',
    image: {
      id: crypto.randomUUID(),
      alt: 'books and potted plant on desk',
      url: '/about-us.jpg',
    },
  },
];
