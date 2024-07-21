import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import Widget from '@/components/layout/container/Widget';
import LoadAdminOrders from '@/components/features/order/list/LoadAdminOrders';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface UserOrderProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('userOrder'),
  };
};

const UserOrder = ({ params: { locale } }: UserOrderProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Order');

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Widget className="min-h-60">
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-primary-text mx-2">{t('title')}</div>
            </div>
            <hr className="h-0.5 w-full bg-slate-600/20" />
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
              <LoadAdminOrders />
            </PrintContainer>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default UserOrder;
