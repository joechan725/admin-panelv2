import { Metadata } from 'next';
import LightBorder from '@/components/layout/container/LightBorder';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import LoadUserOrders from '@/components/features/order/list/LoadUserOrders';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

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
    title: t('myOrders'),
  };
};

const Orders = ({ params: { locale } }: OrdersProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Order');

  return (
    <LightBorder className="min-h-60 p-6 w-full">
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-primary-text mx-2">{t('title')}</div>
        </div>
        <hr className="h-0.5 w-full bg-slate-600/20" />
      </div>
      <PrintContainer
        heading={
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="max-w-96">
                <SearchQueryBarSuspense />
              </div>
            </div>
            <div>
              <ItemsPerPageSelector />
            </div>
          </div>
        }
      >
        <LoadUserOrders />
      </PrintContainer>
    </LightBorder>
  );
};

export default Orders;
