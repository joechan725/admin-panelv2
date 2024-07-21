'use client';

import { useAllHistoryStatisticListener } from '@/lib/hooks/admin/useAllHistoryStatisticListener';
import { useDailyStatisticListener } from '@/lib/hooks/admin/useDailyStatisticListener';
import { useMonthlyStatisticListener } from '@/lib/hooks/admin/useMonthlyStatisticListener';
import { useYearlyStatisticListener } from '@/lib/hooks/admin/useYearlyStatisticListener';
import DashboardGird from './DashboardGird';
import { useSalesRecordListsListener } from '@/lib/hooks/salesRecord/useSalesRecordListsListener';

interface LoadStatisticsProps {}
const LoadStatistics = ({}: LoadStatisticsProps) => {
  const { dailyStatistic } = useDailyStatisticListener(true);
  const { monthlyStatistic } = useMonthlyStatisticListener(true);
  const { yearlyStatistic, loadYearlyStatistic } = useYearlyStatisticListener(false);
  const { allHistoryStatistic, loadAllHistoryStatistic } = useAllHistoryStatisticListener(false);
  const { salesRecords } = useSalesRecordListsListener();

  return (
    <DashboardGird
      allHistoryStatistic={allHistoryStatistic}
      dailyStatistic={dailyStatistic}
      monthlyStatistic={monthlyStatistic}
      yearlyStatistic={yearlyStatistic}
      loadYearlyStatistic={loadYearlyStatistic}
      loadAllHistoryStatistic={loadAllHistoryStatistic}
      salesRecords={salesRecords}
    />
  );
};
export default LoadStatistics;
