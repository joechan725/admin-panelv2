import { ContentBlock } from '@/models/content/ContentBlock';

export const aboutUsEN: ContentBlock[] = [
  {
    type: 'HeroLeft',
    title: 'About Us',
    content:
      "Welcome to 好物の家, where we are dedicated to selecting high-quality lifestyle products to enhance your quality of life. We believe that each carefully chosen item can add a touch of beauty and convenience to your daily routine. Whether it's home goods, personal care, or fashion accessories, we meticulously curate our selection to ensure you enjoy a more refined living experience. Choose 好物の家, and let's pursue a better quality of life together.",
    image: {
      id: crypto.randomUUID(),
      alt: 'books and potted plant on desk',
      url: '/about-us.jpg',
    },
  },
];
