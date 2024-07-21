import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import CheckoutProcess from './components/CheckoutProcess';
import { Metadata } from 'next';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface CheckoutProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('checkout'),
  };
};

const Checkout = ({ params: { locale } }: CheckoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <CheckoutProcess />
    </PublicPageContainer>
  );
};

export default Checkout;
