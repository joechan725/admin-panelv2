'use client';

import Widget from '@/components/layout/container/Widget';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import MonthlyCardWithComposeChart from '../card/MonthlyCardWithComposedChart';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import { useTranslations } from 'next-intl';

interface TotalRevenueStatProps {
  monthlyStatistic: MonthlyStatistic | undefined;
}

const TotalRevenueStat = ({ monthlyStatistic }: TotalRevenueStatProps) => {
  const t = useTranslations('Admin.dashboard.revenueChart');

  return (
    <Widget sizeFull className="min-h-[400px] h-full">
      <MonthlyCardWithComposeChart
        title1={t('totalRevenue')}
        title2={t('totalOrders')}
        xAxis="Month"
        yAxis1={t('revenue')}
        yAxis2={t('order')}
        monthlyData1={transformStatisticsToArray({
          statistic: monthlyStatistic,
          field: 'revenue',
          period: 'monthly',
        })}
        monthlyData2={transformStatisticsToArray({
          statistic: monthlyStatistic,
          field: 'orderCount',
          period: 'monthly',
        })}
      />
    </Widget>
  );
};

export default TotalRevenueStat;
