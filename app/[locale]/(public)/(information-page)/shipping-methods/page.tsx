import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import LoadDeliveryOptions from './components/LoadDeliveryOptions';
import { PlainTextBlock } from '@/models/content/PlainTextBlock';
import ContentBlockList from '@/components/content/ContentBlockList';
import { Metadata } from 'next';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface ShippingMethodsProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('shippingMethods'),
  };
};

const titleBlockEN: PlainTextBlock[] = [{ type: 'PlainText', title: 'Shipping Methods' }];
const titleBlockZH: PlainTextBlock[] = [{ type: 'PlainText', title: '送貨方式' }];

const ShippingMethods = ({ params: { locale } }: ShippingMethodsProps) => {
  unstable_setRequestLocale(locale);
  const localeHook = useLocale();

  return (
    <PublicPageContainer>
      <div className="max-w-screen-lg mx-auto px-4 space-y-8">
        <ContentBlockList contentBlocks={localeHook === 'en' ? titleBlockEN : titleBlockZH} />
        <Suspense>
          <LoadDeliveryOptions />
        </Suspense>
      </div>
    </PublicPageContainer>
  );
};

export default ShippingMethods;
