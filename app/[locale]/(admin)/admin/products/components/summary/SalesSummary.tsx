'use client';

import ArchiveBox from '@/components/icon/ArchiveBox';
import Box from '@/components/icon/Box';
import Dollar from '@/components/icon/Dollar';
import LockOpen from '@/components/icon/LockOpen';
import { useAllHistoryStatisticListener } from '@/lib/hooks/admin/useAllHistoryStatisticListener';
import { useTranslations } from 'next-intl';

interface SalesSummaryProps {}

const SalesSummary = ({}: SalesSummaryProps) => {
  const t = useTranslations('Product.summary');

  const { allHistoryStatistic } = useAllHistoryStatisticListener(true);

  return (
    <div className="grid grid-cols-4 divide-x divide-black/20 w-full">
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.totalProductCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('products')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Box className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.publicProductCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('publicProducts')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <LockOpen className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.sales ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('sales')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <ArchiveBox className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.revenue ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('revenue')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Dollar className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;
