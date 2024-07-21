import Document from '@/components/icon/Document';
import Widget from '@/components/layout/container/Widget';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import SmallInfoCard from '../card/SmallInfoCard';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { useTranslations } from 'next-intl';

interface OrderCountProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const OrderCount = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: OrderCountProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const orderCountDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'orderCount',
    period: 'daily',
  });
  const orderCountDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'orderCount',
    period: 'monthly',
  });
  const orderCountDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'orderCount',
    period: 'yearly',
  });
  const orderCountDataAll = allHistoryStatistic?.orderCount;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-sky-300/50 rounded-md">
            <Document className="text-sky-500" />
          </div>
        }
        title={t('orders')}
        dataDaily={orderCountDataDaily}
        dataMonthly={orderCountDataMonthly}
        dataYearly={orderCountDataYearly}
        dataAll={orderCountDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default OrderCount;
