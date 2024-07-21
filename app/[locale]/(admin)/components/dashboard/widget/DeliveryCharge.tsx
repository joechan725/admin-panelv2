import Widget from '@/components/layout/container/Widget';
import Trunk from '@/components/icon/Trunk';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import SmallInfoCard from '../card/SmallInfoCard';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { useTranslations } from 'next-intl';

interface DeliveryChargeProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const DeliveryCharge = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: DeliveryChargeProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const deliveryChargeDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'deliveryCharge',
    period: 'daily',
  });
  const deliveryChargeDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'deliveryCharge',
    period: 'monthly',
  });
  const deliveryChargeDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'deliveryCharge',
    period: 'yearly',
  });
  const deliveryChargeDataAll = allHistoryStatistic?.deliveryCharge;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-blue-300/50 rounded-md">
            <Trunk className="text-blue-500" />
          </div>
        }
        isMoneyField
        title={t('deliveryCharge')}
        dataDaily={deliveryChargeDataDaily}
        dataMonthly={deliveryChargeDataMonthly}
        dataYearly={deliveryChargeDataYearly}
        dataAll={deliveryChargeDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default DeliveryCharge;
