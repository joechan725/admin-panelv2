'use client';

import { useState } from 'react';
import { monthList } from '@/types/Month';
import { AddToCartRecord } from '@/models/statistic/record/AddToCartRecord';
import { accumulateCountOfObjects } from '@/lib/helpers/statistic/accumulateCountOfObjects';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import MostAddToCartList from '../list/MostAddToCartList';
import { useTranslations, useFormatter } from 'next-intl';

interface MostAddToCartCardProps {
  isLoading?: boolean;
  addToCartRecordsDaily: AddToCartRecord[];
  addToCartRecordsMonthly: AddToCartRecord[];
  addToCartRecordsYearly: AddToCartRecord[];
}

const MostAddToCartCard = ({
  isLoading,
  addToCartRecordsDaily,
  addToCartRecordsMonthly,
  addToCartRecordsYearly,
}: MostAddToCartCardProps) => {
  const tTime = useTranslations('Admin.dashboard.time');
  const t = useTranslations('Admin.dashboard.mostAddedToCart');
  const format = useFormatter();

  const [viewOption, setViewOption] = useState('monthly');
  const current = new Date();

  let accumulatedRecords = accumulateCountOfObjects(addToCartRecordsDaily, 'productId', 'timesAddedToCart');
  let sortedRecords = sortObjectsByKey(accumulatedRecords, 'timesAddedToCart', 'desc');
  let recordsToShow = sortedRecords.slice(0, 5);

  if (viewOption === 'monthly') {
    accumulatedRecords = accumulateCountOfObjects(addToCartRecordsMonthly, 'productId', 'timesAddedToCart');
    sortedRecords = sortObjectsByKey(accumulatedRecords, 'timesAddedToCart', 'desc');
    recordsToShow = sortedRecords.slice(0, 5);
  }

  if (viewOption === 'yearly') {
    accumulatedRecords = accumulateCountOfObjects(addToCartRecordsYearly, 'productId', 'timesAddedToCart');
    sortedRecords = sortObjectsByKey(accumulatedRecords, 'timesAddedToCart', 'desc');
    recordsToShow = sortedRecords.slice(0, 5);
  }

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
        <MostAddToCartList addToCartRecords={recordsToShow} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default MostAddToCartCard;
