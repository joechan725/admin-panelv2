import { Metadata } from 'next';
import AddCartItemsModal from '../components/modal/AddCartItemsModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface AddCartItemsProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('addProductsToUserCart'),
  };
};

const AddCartItems = ({ params: { locale } }: AddCartItemsProps) => {
  unstable_setRequestLocale(locale);

  return <AddCartItemsModal />;
};

export default AddCartItems;
