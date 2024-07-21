'use client';

import Widget from '@/components/layout/container/Widget';
import WeeklyCardWithBarChart from '../card/WeeklyCardWithBarChart';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { useTranslations } from 'next-intl';

interface TotalVisitorStatProps {
  dailyStatistic: DailyStatistic | undefined;
}

const TotalVisitorStat = ({ dailyStatistic }: TotalVisitorStatProps) => {
  const t = useTranslations('Admin.dashboard.visitor');

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <div className="flex divide-x divide-black/20">
        <div className="flex-1 pr-4">
          <WeeklyCardWithBarChart
            title={t('visitors')}
            xAxis="Day"
            yAxis={t('visitors')}
            fill="#0EA5E9"
            dataDaily={transformStatisticsToArray({
              statistic: dailyStatistic,
              field: 'visitorCount',
              period: 'daily',
            })}
          />
        </div>
        <div className="flex-1 pl-4">
          <WeeklyCardWithBarChart
            title={t('newVisitors')}
            xAxis="Day"
            yAxis={t('newVisitors')}
            fill="#48de80"
            dataDaily={transformStatisticsToArray({
              statistic: dailyStatistic,
              field: 'firstTimeVisitorCount',
              period: 'daily',
            })}
          />
        </div>
      </div>
    </Widget>
  );
};

export default TotalVisitorStat;
