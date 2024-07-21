'use client';

import { dayList } from '@/types/Day';
import ReactBarChart from '@/components/chart/ReactBarChart';
import UpArrow from '@/components/icon/UpArrow';
import clsx from 'clsx/lite';
import { useSearchParams } from 'next/navigation';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { convertFromDateTimeLocalString } from '@/lib/helpers/date/convertFromDateTimeLocalString';
import { useTranslations } from 'next-intl';

interface WeeklyCardWithBarChartProps {
  title: string;
  sizeClassName?: string;
  dataDaily: (number | undefined)[];
  xAxis: string;
  yAxis: string;
  fill?: string;
}

const WeeklyCardWithBarChart = ({
  title,
  sizeClassName = 'w-44 h-28',
  dataDaily,
  xAxis,
  yAxis,
  fill = '#48de80',
}: WeeklyCardWithBarChartProps) => {
  const t = useTranslations('Admin.dashboard.time');

  const searchParams = useSearchParams();
  const date = searchParams.get('date') ?? convertToDateTimeLocalString(new Date(), 'yyyy-mm-dd');
  const targetDate = convertFromDateTimeLocalString(date, 'yyyy-mm-dd');

  const reversedDays = Array.from({ length: 7 })
    .map((_, index) => {
      const current = new Date(targetDate);
      const day = new Date(current.getTime() - index * 24 * 60 * 60 * 1000).getDay();

      return dayList[day];
    })
    .reverse();

  const reversedData = [...dataDaily].reverse();

  const dataToShow = reversedData.slice(-7).map((data, index) => {
    return {
      [xAxis]: reversedDays[index].slice(0, 1),
      [yAxis]: data ?? 0,
    };
  });

  // Divide the 14 days data into 2 weekly
  const dataThisWeek =
    dataDaily.reduce((accumulator = 0, data = 0, index): number => {
      if (index < 7) {
        return accumulator + data;
      }
      return accumulator;
    }, 0) ?? 0;

  const data1WeekAgo =
    dataDaily.reduce((accumulator = 0, data = 0, index): number => {
      if (index >= 7) {
        return accumulator + data;
      }
      return accumulator;
    }, 0) ?? 0;
  const weeklyDifferent = +(((dataThisWeek - data1WeekAgo) / data1WeekAgo) * 100).toFixed(0);

  let percentDifferent = weeklyDifferent;

  // Turn percentDifferent to 0 if it is NaN
  if (isNaN(percentDifferent)) {
    percentDifferent = 0;
  }

  // Turn percentDifferent to 100 if it is infinity
  if (percentDifferent === Infinity) {
    percentDifferent = 100;
  }

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-black/60">{title}</div>
        <div>
          <div className="text-xs font-semibold text-black/60">{t('weekly')}</div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-2 items-end">
          <div className={clsx('flex gap-2 items-center', percentDifferent < 0 ? 'text-red-500' : 'text-green-500')}>
            <UpArrow sizeClassName="size-4 inline" className={clsx('inline', percentDifferent < 0 && 'rotate-180')} />{' '}
            {percentDifferent}%
          </div>
        </div>
        <ReactBarChart data={dataToShow} sizeClassName={sizeClassName} xAxis={xAxis} yAxis={yAxis} fill={fill} />
      </div>
    </div>
  );
};

export default WeeklyCardWithBarChart;
