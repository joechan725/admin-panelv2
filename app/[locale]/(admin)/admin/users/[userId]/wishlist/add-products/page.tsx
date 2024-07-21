import { Metadata } from 'next';
import AddWishlistItemsModal from '../components/modal/AddWishlistItemsModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface AddWishlistItemsProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('addProductsToUserWishlist'),
  };
};

const AddWishlistItems = ({ params: { locale } }: AddWishlistItemsProps) => {
  unstable_setRequestLocale(locale);

  return <AddWishlistItemsModal />;
};

export default AddWishlistItems;
