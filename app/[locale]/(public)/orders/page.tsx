import { Metadata } from 'next';
import SearchOrderForm from './components/search/SearchOrderForm';
import ShadowBorder from '@/components/layout/container/ShadowBorder';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface OrdersProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('searchOrder'),
  };
};

const Orders = ({ params: { locale } }: OrdersProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="flex h-screen justify-center items-center">
        <ShadowBorder sizeClassName="max-w-lg w-full">
          <SearchOrderForm />
        </ShadowBorder>
      </div>
    </PublicPageContainer>
  );
};

export default Orders;
