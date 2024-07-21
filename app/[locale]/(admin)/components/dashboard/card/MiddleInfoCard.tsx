'use client';

import clsx from 'clsx/lite';
import { useEffect, useState } from 'react';
import UpArrow from '@/components/icon/UpArrow';
import { convertDataArrayToDisplay } from '@/lib/helpers/statistic/convertDataArrayToDisplay';
import { useFormatter, useTranslations } from 'next-intl';

interface MiddleInfoCardProps {
  icon: React.ReactNode;
  mainTitle: string;
  subTitle1: string;
  subTitle2: string;
  mainDataDaily: (number | undefined)[];
  mainDataMonthly: (number | undefined)[];
  mainDataYearly: (number | undefined)[];
  mainDataAll: number | undefined;
  subData1Daily: (number | undefined)[];
  subData1Monthly: (number | undefined)[];
  subData1Yearly: (number | undefined)[];
  subData1All: number | undefined;
  subData2Daily: (number | undefined)[];
  subData2Monthly: (number | undefined)[];
  subData2Yearly: (number | undefined)[];
  subData2All: number | undefined;
  mainIsMoneyField?: boolean;
  sub1IsMoneyField?: boolean;
  sub2IsMoneyField?: boolean;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const MiddleInfoCard = ({
  icon,
  mainTitle,
  subTitle1,
  subTitle2,
  mainDataDaily,
  mainDataMonthly,
  mainDataYearly,
  mainDataAll,
  subData1Daily,
  subData1Monthly,
  subData1Yearly,
  subData1All,
  subData2Daily,
  subData2Monthly,
  subData2Yearly,
  subData2All,
  mainIsMoneyField,
  sub1IsMoneyField,
  sub2IsMoneyField,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: MiddleInfoCardProps) => {
  const t = useTranslations('Admin.dashboard.time');
  const format = useFormatter();

  const [viewOption, setViewOption] = useState('daily');
  const current = new Date();

  const { dataToShow: mainDataToShow, percentDifferent: mainPercentDifferent } = convertDataArrayToDisplay({
    dataDaily: mainDataDaily,
    dataMonthly: mainDataMonthly,
    dataYearly: mainDataYearly,
    dataAll: mainDataAll,
    viewOption,
  });

  const { dataToShow: subData1ToShow, percentDifferent: sub1PercentDifferent } = convertDataArrayToDisplay({
    dataDaily: subData1Daily,
    dataMonthly: subData1Monthly,
    dataYearly: subData1Yearly,
    dataAll: subData1All,
    viewOption,
  });

  const { dataToShow: subData2ToShow, percentDifferent: sub2PercentDifferent } = convertDataArrayToDisplay({
    dataDaily: subData2Daily,
    dataMonthly: subData2Monthly,
    dataYearly: subData2Yearly,
    dataAll: subData2All,
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
      <div className="flex gap-2 justify-between">
        <div>
          <div className="font-semibold text-black/60">{mainTitle}</div>
          <div className="text-2xl font-semibold text-black/70">
            {mainIsMoneyField && '$'}
            {mainDataToShow}
          </div>
        </div>
        <div className="space-y-0.5 text-right">
          <div className="flex gap-2 items-end">
            <div className="font-semibold text-sm text-black/60">{subTitle1}</div>
            <div className="text-xl font-semibold text-black/70">
              {sub1IsMoneyField && '$'}
              {subData1ToShow}
            </div>
            {viewOption !== 'all' && (
              <div
                className={clsx(
                  'flex gap-2 items-center',
                  sub1PercentDifferent < 0 ? 'text-red-500' : 'text-green-500'
                )}
              >
                <UpArrow
                  sizeClassName="size-3.5"
                  className={clsx('inline', sub1PercentDifferent < 0 && 'rotate-180')}
                />
                {sub1PercentDifferent}%
              </div>
            )}
          </div>
          <div className="flex gap-2 items-end">
            <div className="font-semibold text-sm text-black/60">{subTitle2}</div>
            <div className="text-xl font-semibold text-black/70">
              {sub2IsMoneyField && '$'}
              {subData2ToShow}
            </div>
            {viewOption !== 'all' && (
              <div
                className={clsx(
                  'flex gap-2 items-center',
                  sub2PercentDifferent < 0 ? 'text-red-500' : 'text-green-500'
                )}
              >
                <UpArrow
                  sizeClassName="size-3.5"
                  className={clsx('inline', sub2PercentDifferent < 0 && 'rotate-180')}
                />
                {sub2PercentDifferent}%
              </div>
            )}
          </div>
        </div>
      </div>
      {viewOption !== 'all' && (
        <div className="flex gap-2 items-end">
          <div
            className={clsx('flex gap-2 items-center', mainPercentDifferent < 0 ? 'text-red-500' : 'text-green-500')}
          >
            <UpArrow sizeClassName="size-4" className={clsx('inline', mainPercentDifferent < 0 && 'rotate-180')} />
            {mainPercentDifferent}%
          </div>
        </div>
      )}
    </div>
  );
};

export default MiddleInfoCard;
