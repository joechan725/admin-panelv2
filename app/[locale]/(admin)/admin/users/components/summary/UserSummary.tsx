'use client';

import Eye from '@/components/icon/Eye';
import Globe from '@/components/icon/Globe';
import User from '@/components/icon/User';
import UserGroup from '@/components/icon/UserGroup';
import { useAllHistoryStatisticListener } from '@/lib/hooks/admin/useAllHistoryStatisticListener';
import { useTranslations } from 'next-intl';

interface UserSummaryProps {}

const UserSummary = ({}: UserSummaryProps) => {
  const t = useTranslations('User.summary');

  const { allHistoryStatistic } = useAllHistoryStatisticListener(true);

  return (
    <div className="grid grid-cols-4 divide-x divide-black/20">
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.userCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('userCount')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <UserGroup className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.registeredUserCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('registeredUserCount')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <User className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.anonymousUserCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('anonymousUserCount')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Globe className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.visitorCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('visitorCount')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Eye className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
