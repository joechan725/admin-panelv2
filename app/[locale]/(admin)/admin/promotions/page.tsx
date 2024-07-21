import { Metadata } from 'next';
import LoadPromotions from './components/list/LoadPromotions';
import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { Link } from '@/navigation';
import { Suspense } from 'react';
import Widget from '@/components/layout/container/Widget';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface PromotionProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('promotions'),
  };
};

const Promotion = ({ params: { locale } }: PromotionProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Promotion.list');

  return (
    <div className="space-y-5">
      <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      <Widget className="p-4">
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
          ending={
            <div>
              <Link href="/admin/promotions/create">
                <BoxButton disabled={false} type="button" theme="primary">
                  <Plus sizeClassName="size-4" />
                  {t('newPromotion')}
                </BoxButton>
              </Link>
            </div>
          }
        >
          <Suspense>
            <LoadPromotions />
          </Suspense>
        </PrintContainer>
      </Widget>
    </div>
  );
};

export default Promotion;
