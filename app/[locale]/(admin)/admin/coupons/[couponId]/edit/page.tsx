import { Metadata } from 'next';
import EditCouponModal from '../../components/modal/EditCouponModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditCouponProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editCoupon'),
  };
};

export const metadata: Metadata = {
  title: 'Edit a coupon',
};

const EditCoupon = ({ params: { locale } }: EditCouponProps) => {
  unstable_setRequestLocale(locale);

  return <EditCouponModal />;
};

export default EditCoupon;
