import { Metadata } from 'next';
import LoadCreateProductForm from '../components/form/LoadCreateProductForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface ProductCreateProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createProduct'),
  };
};

const ProductCreate = ({ params: { locale } }: ProductCreateProps) => {
  unstable_setRequestLocale(locale);

  return <LoadCreateProductForm />;
};

export default ProductCreate;
