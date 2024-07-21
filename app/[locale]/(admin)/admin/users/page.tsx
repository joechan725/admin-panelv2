import { Metadata } from 'next';
import PrintContainer from '@/components/search/PrintContainer';
import Widget from '@/components/layout/container/Widget';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import SelectSearchSuspense from '@/components/search/SelectSearchSuspense';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import UserSummary from './components/summary/UserSummary';
import LoadUsers from './components/list/LoadUsers';
import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface UsersProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('users'),
  };
};

const Users = ({ params: { locale } }: UsersProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('User.list');

  return (
    <div className="space-y-5">
      <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      <div className="space-y-6">
        <Widget className="p-4">
          <UserSummary />
        </Widget>
        <Widget className="p-4">
          <PrintContainer
            heading={
              <div className="flex justify-between items-center">
                <div className="max-w-96">
                  <SearchQueryBarSuspense />
                </div>
                <div className="flex-0 flex items-center gap-4">
                  <ItemsPerPageSelector />
                  <SelectSearchSuspense
                    searchParamsKey="role"
                    title={t('all')}
                    selectOptions={[
                      { option: t('anonymous'), searchParamsValue: 'anonymous' },
                      { option: t('user'), searchParamsValue: 'user' },
                      { option: t('admin'), searchParamsValue: 'admin' },
                    ]}
                  />
                </div>
              </div>
            }
          >
            <Suspense>
              <LoadUsers />
            </Suspense>
          </PrintContainer>
        </Widget>
      </div>
    </div>
  );
};

export default Users;
