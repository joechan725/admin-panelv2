import { Metadata } from 'next';
import LoadEditProductForm from '../../components/form/LoadEditProductForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditProductProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editProduct'),
  };
};

const EditProduct = ({ params: { locale } }: EditProductProps) => {
  unstable_setRequestLocale(locale);

  return <LoadEditProductForm />;
};

export default EditProduct;
