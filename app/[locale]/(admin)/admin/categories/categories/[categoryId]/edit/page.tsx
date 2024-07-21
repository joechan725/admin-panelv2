import { Metadata } from 'next';
import EditCategoryModal from '../../../components/category/modal/EditCategoryModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditCategoryProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editCategory'),
  };
};

const EditCategory = ({ params: { locale } }: EditCategoryProps) => {
  unstable_setRequestLocale(locale);

  return <EditCategoryModal />;
};
export default EditCategory;
