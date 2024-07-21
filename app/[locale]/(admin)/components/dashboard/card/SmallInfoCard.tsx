'use client';

import clsx from 'clsx/lite';
import { useEffect, useState } from 'react';
import UpArrow from '@/components/icon/UpArrow';
import { monthList } from '@/types/Month';
import { convertDataArrayToDisplay } from '@/lib/helpers/statistic/convertDataArrayToDisplay';
import { useFormatter, useTranslations } from 'next-intl';

interface SmallInfoCardProps {
  icon: React.ReactNode;
  title: string;
  dataDaily: (number | undefined)[];
  dataMonthly: (number | undefined)[];
  dataYearly: (number | undefined)[];
  dataAll: number | undefined;
  isMoneyField?: boolean;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const SmallInfoCard = ({
  icon,
  title,
  dataDaily,
  dataMonthly,
  dataYearly,
  dataAll,
  isMoneyField,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: SmallInfoCardProps) => {
  const t = useTranslations('Admin.dashboard.time');
  const format = useFormatter();

  const [viewOption, setViewOption] = useState('daily');
  const current = new Date();

  const { dataToShow, percentDifferent } = convertDataArrayToDisplay({
    dataDaily,
    dataMonthly,
    dataYearly,
    dataAll,
    viewOption,
  });

  useEffect(() => {
    if (viewOption === 'yearly') {
      loadYearlyStatistic();
    }
    if (viewOption === 'all') {
      loadAllHistoryStatistic();
    }
  }, [viewOption]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        {icon}
        <div>
          <div>
            <select
              className="text-xs font-semibold text-black/80 hover:cursor-pointer hover:opacity-85 active:opacity-70 focus:opacity-70 text-right outline-none"
              onChange={(e) => setViewOption(e.target.value)}
              value={viewOption}
            >
              <option value="daily">{t('daily')}</option>
              <option value="weekly">{t('weekly')}</option>
              <option value="monthly">{t('fromTime', { time: format.dateTime(current, { month: 'long' }) })}</option>
              <option value="yearly">{t('fromTime', { time: format.dateTime(current, { year: 'numeric' }) })}</option>
              <option value="all">{t('all')}</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-black/60">{title}</div>
        <div className="text-2xl font-semibold text-black/70">
          {isMoneyField && '$'}
          {dataToShow}
        </div>
      </div>
      {viewOption !== 'all' && (
        <div className="flex items-end gap-2">
          <div className={clsx('flex items-center gap-2', percentDifferent < 0 ? 'text-red-500' : 'text-green-500')}>
            <UpArrow sizeClassName="size-4" className={clsx('inline', percentDifferent < 0 && 'rotate-180')} />
            {percentDifferent}%
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallInfoCard;
