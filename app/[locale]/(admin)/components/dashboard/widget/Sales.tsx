import ArchiveBox from '@/components/icon/ArchiveBox';
import Widget from '@/components/layout/container/Widget';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import SmallInfoCard from '../card/SmallInfoCard';
import { useTranslations } from 'next-intl';

interface SalesProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const Sales = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: SalesProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const salesDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'sales',
    period: 'daily',
  });
  const salesDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'sales',
    period: 'monthly',
  });
  const salesDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'sales',
    period: 'yearly',
  });
  const salesDataAll = allHistoryStatistic?.sales;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-violet-300/50 rounded-md">
            <ArchiveBox className="text-violet-500" />
          </div>
        }
        title={t('sales')}
        dataDaily={salesDataDaily}
        dataMonthly={salesDataMonthly}
        dataYearly={salesDataYearly}
        dataAll={salesDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default Sales;
