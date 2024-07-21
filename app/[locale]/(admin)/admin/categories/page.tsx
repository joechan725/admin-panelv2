import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CategoriesProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('categories'),
  };
};

const Categories = ({ params: { locale } }: CategoriesProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default Categories;
