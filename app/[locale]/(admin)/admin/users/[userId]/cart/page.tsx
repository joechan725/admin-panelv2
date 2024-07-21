import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface UserCartProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('userCart'),
  };
};

const UserCart = ({ params: { locale } }: UserCartProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default UserCart;
