import { Metadata } from 'next';
import CreateCouponModal from '../components/modal/CreateCouponModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateCouponProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createCoupon'),
  };
};

const CreateCoupon = ({ params: { locale } }: CreateCouponProps) => {
  unstable_setRequestLocale(locale);

  return <CreateCouponModal />;
};

export default CreateCoupon;
