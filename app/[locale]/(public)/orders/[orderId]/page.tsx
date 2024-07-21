import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  orderId: string;
  locale: string;
}

interface GenerateMetadataParameters {
  params: Params;
}

interface OrderProps {
  params: Params;
}

export const generateMetadata = async ({
  params: { locale, orderId },
}: GenerateMetadataParameters): Promise<Metadata> => {
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
