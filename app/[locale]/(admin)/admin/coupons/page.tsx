import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CouponsProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('coupons'),
  };
};

const Coupons = ({ params: { locale } }: CouponsProps) => {
  unstable_setRequestLocale(locale);

  return null;
};
export default Coupons;
