'use client';

import { useState } from 'react';
import BestSellerList from '../list/BestSellerList';
import { accumulateFieldOfObjects } from '@/lib/helpers/statistic/accumulateFieldOfObjects';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';
import { useFormatter, useTranslations } from 'next-intl';

interface BestBrandCardProps {
  isLoading?: boolean;
  salesRecords: SalesRecord[];
}

const BestBrandCard = ({ isLoading, salesRecords }: BestBrandCardProps) => {
  const tTime = useTranslations('Admin.dashboard.time');
  const t = useTranslations('Admin.dashboard.bestSeller');
  const format = useFormatter();

  const [viewOption, setViewOption] = useState('monthly');
  const current = new Date();
  const currentDate = current.getDate();
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();

  let targetDate = new Date(currentYear, currentMonth, currentDate);

  if (viewOption === 'monthly') {
    targetDate = new Date(currentYear, currentMonth, 1);
  }

  if (viewOption === 'yearly') {
    targetDate = new Date(currentYear, 0, 1);
  }

  const recordsFilteredByDate = salesRecords.filter((record) => record.soldAt > targetDate.getTime());
  const accumulatedRecords = accumulateFieldOfObjects(recordsFilteredByDate, 'brandId', ['sales', 'revenue']);
  const sortedRecords = sortObjectsByKey(accumulatedRecords, 'sales', 'desc');
  const recordsToShow = sortedRecords.slice(0, 5);

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="font-semibold text-black/60">{t('title')}</div>
        <div>
          <div>
            <select
              className="text-xs font-semibold text-black/80 hover:cursor-pointer hover:opacity-85 active:opacity-70 focus:opacity-70 text-right outline-none"
              onChange={(e) => setViewOption(e.target.value)}
              value={viewOption}
            >
              <option value="daily">{tTime('daily')}</option>
              <option value="monthly">
                {tTime('fromTime', { time: format.dateTime(current, { month: 'long' }) })}
              </option>
              <option value="yearly">
                {tTime('fromTime', { time: format.dateTime(current, { year: 'numeric' }) })}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="max-h-[340px] overflow-y-auto scrollbar scrollbar-slate">
        <BestSellerList salesRecords={recordsToShow} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BestBrandCard;
