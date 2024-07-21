import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { ContentBlock } from '@/models/content/ContentBlock';
import ContentBlockList from '@/components/content/ContentBlockList';
import { useLocale } from 'next-intl';

interface Params {
  locale: string;
}

interface HomeProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('home'),
  };
};

const contentBlocksEN: ContentBlock[] = [
  {
    type: 'HeroCover',
    image: {
      id: crypto.randomUUID(),
      alt: 'Notebook and smart phone on a desk',
      url: '/home.jpg',
    },
    title: 'Elevating Your Quality of Life',
    content: '好物の家',
    link: '/products/page/1',
    linkDescription: 'Start Shopping',
  },
];

const contentBlocksZH: ContentBlock[] = [
  {
    type: 'HeroCover',
    image: {
      id: crypto.randomUUID(),
      alt: 'Notebook and smart phone on a desk',
      url: '/home.jpg',
    },
    title: '讓生活更有質感',
    content: '好物の家',
    link: '/products/page/1',
    linkDescription: '開始購物',
  },
];

const Home = ({ params: { locale } }: HomeProps) => {
  unstable_setRequestLocale(locale);
  const localeHook = useLocale();

  return <ContentBlockList contentBlocks={localeHook === 'en' ? contentBlocksEN : contentBlocksZH} />;
};

export default Home;
