import Widget from '@/components/layout/container/Widget';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import OrderSummary from './components/summary/OrderSummary';
import { Metadata } from 'next';
import LoadOrders from './components/list/LoadOrders';
import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface OrdersProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('orders'),
  };
};

const Orders = ({ params: { locale } }: OrdersProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Order.adminList');

  return (
    <div className="space-y-5">
      <div className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</div>
      <div className="space-y-6">
        <Widget className="p-4">
          <OrderSummary />
        </Widget>
        <Widget className="p-4">
          <PrintContainer
            heading={
              <div className="flex items-center justify-between">
                <div>
                  <SearchQueryBarSuspense />
                </div>
                <div className="flex items-center gap-4">
                  <ItemsPerPageSelector />
                </div>
              </div>
            }
          >
            <Suspense>
              <LoadOrders />
            </Suspense>
          </PrintContainer>
        </Widget>
      </div>
    </div>
  );
};

export default Orders;
