import { Metadata } from 'next';
import CouponDetailModal from '../components/modal/CouponDetailModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface ViewCouponDetailProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('viewCouponDetail'),
  };
};

const ViewCouponDetail = ({ params: { locale } }: ViewCouponDetailProps) => {
  unstable_setRequestLocale(locale);

  return <CouponDetailModal />;
};

export default ViewCouponDetail;
