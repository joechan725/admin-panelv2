'use client';

import AdminPageSearchQueryBar from './pageSearch/AdminPageSearchQueryBar';
import AdminPageSearchResult from './pageSearch/AdminPageSearchResult';
import clsx from 'clsx/lite';
import { useSearchParams } from 'next/navigation';
import NotificationButton from '@/components/features/notification/NotificationButton';
import HeaderAvatar from '../../header/HeaderAvatar';
import AdminPageCancelSearch from './pageSearch/AdminPageCancelSearch';
import ChangeLanguageButton from '@/components/features/language/ChangeLanguageButton';
import { useTranslations } from 'next-intl';

interface AdminHeaderProps {}

const AdminHeader = ({}: AdminHeaderProps) => {
  const t = useTranslations('Admin.topBar');

  const searchParams = useSearchParams();

  const pageSearch = searchParams.get('page-search') ?? undefined;

  return (
    <div className="relative">
      <div
        className={clsx(
          'px-4 py-2 bg-white rounded-lg border border-slate-500/10 shadow-sm relative',
          pageSearch && 'z-[100]'
        )}
      >
        <div className="flex items-center">
          <div className="flex-1">
            <AdminPageSearchQueryBar placeholder={t('search')} searchParamsKey="page-search" />
          </div>
          <div className="flex-0 flex gap-4 items-center">
            {!pageSearch && (
              <>
                <NotificationButton />
                <ChangeLanguageButton />
                <HeaderAvatar />
              </>
            )}
            {pageSearch && <AdminPageCancelSearch />}
          </div>
        </div>
      </div>
      <AdminPageSearchResult />
    </div>
  );
};

export default AdminHeader;
