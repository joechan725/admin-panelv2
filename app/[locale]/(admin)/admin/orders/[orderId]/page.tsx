import { Metadata } from 'next';
import LoadAdminOrderDetail from '../components/detail/LoadAdminOrderDetail';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
  orderId: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface OrderProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale, orderId } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('orderWithId', { orderId }),
  };
};

const Order = ({ params: { locale } }: OrderProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default Order;
