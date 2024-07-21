import Widget from '@/components/layout/container/Widget';
import { Metadata } from 'next';
import DeliveryOptionFrame from './components/frame/DeliveryOptionFrame';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface DeliveryOptionsProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('deliveryOptions'),
  };
};

const DeliveryOptions = ({ params: { locale } }: DeliveryOptionsProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default DeliveryOptions;
