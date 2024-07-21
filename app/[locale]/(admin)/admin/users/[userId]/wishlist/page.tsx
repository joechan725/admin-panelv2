import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface UserWishlistProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('userWishlist'),
  };
};

const UserWishlist = ({ params: { locale } }: UserWishlistProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default UserWishlist;
