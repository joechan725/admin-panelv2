import { Metadata } from 'next';
import DeliveryOptionDetailModal from '../components/modal/DeliveryOptionDetailModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface ViewDeliveryOptionDetailProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('viewDeliveryOptionDetail'),
  };
};

const ViewDeliveryOptionDetail = ({ params: { locale } }: ViewDeliveryOptionDetailProps) => {
  unstable_setRequestLocale(locale);

  return <DeliveryOptionDetailModal />;
};

export default ViewDeliveryOptionDetail;
