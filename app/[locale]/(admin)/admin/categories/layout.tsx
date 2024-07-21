import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import CategoryRoot from './components/root/CategoryRoot';

interface Params {
  locale: string;
}

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('categories'),
  };
};

const CategoryLayout = ({ children, params: { locale } }: CategoryLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <CategoryRoot />
      {children}
    </>
  );
};
export default CategoryLayout;
