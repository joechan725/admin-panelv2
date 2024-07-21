import { Metadata } from 'next';
import CreateCategoryModal from '../../components/category/modal/CreateCategoryModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateCategoryProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createCategory'),
  };
};

const CreateCategory = ({ params: { locale } }: CreateCategoryProps) => {
  unstable_setRequestLocale(locale);

  return <CreateCategoryModal />;
};
export default CreateCategory;
