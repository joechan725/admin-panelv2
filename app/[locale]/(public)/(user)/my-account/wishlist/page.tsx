import LoadUserWishlist from '@/components/features/wishlist/LoadUserWishlist';
import LightBorder from '@/components/layout/container/LightBorder';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface WishlistProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('wishlist'),
  };
};

const Wishlist = ({ params: { locale } }: WishlistProps) => {
  unstable_setRequestLocale(locale);

  return (
    <LightBorder className="min-h-60 p-6 w-full">
      <LoadUserWishlist />
    </LightBorder>
  );
};

export default Wishlist;
