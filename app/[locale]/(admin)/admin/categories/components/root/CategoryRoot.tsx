import Widget from '@/components/layout/container/Widget';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import LoadClassificationList from '../frame/LoadClassificationList';

interface CategoryRootProps {}

const CategoryRoot = ({}: CategoryRootProps) => {
  const t = useTranslations('Category.list');

  return (
    <div className="space-y-6">
      <div className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</div>
      <Widget className="pb-24">
        <PrintContainer
          heading={
            <div className="max-w-96">
              <SearchQueryBarSuspense />
            </div>
          }
        >
          <Suspense>
            <LoadClassificationList />
          </Suspense>
        </PrintContainer>
      </Widget>
    </div>
  );
};

export default CategoryRoot;
