import Dollar from '@/components/icon/Dollar';
import Widget from '@/components/layout/container/Widget';
import SmallInfoCard from '../card/SmallInfoCard';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import { useTranslations } from 'next-intl';

interface RevenueProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const Revenue = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: RevenueProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const revenueDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'revenue',
    period: 'daily',
  });
  const revenueDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'revenue',
    period: 'monthly',
  });
  const revenueDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'revenue',
    period: 'yearly',
  });
  const revenueDataAll = allHistoryStatistic?.revenue;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-indigo-300/50 rounded-md">
            <Dollar className="text-indigo-500" />
          </div>
        }
        isMoneyField
        title={t('revenue')}
        dataDaily={revenueDataDaily}
        dataMonthly={revenueDataMonthly}
        dataYearly={revenueDataYearly}
        dataAll={revenueDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default Revenue;
