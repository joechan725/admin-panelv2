import BankNotes from '@/components/icon/BankNotes';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import SmallInfoCard from '../card/SmallInfoCard';
import Widget from '@/components/layout/container/Widget';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { useTranslations } from 'next-intl';

interface DiscountProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const Discount = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: DiscountProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const discountDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'discountAmount',
    period: 'daily',
  });
  const discountDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'discountAmount',
    period: 'monthly',
  });
  const discountDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'discountAmount',
    period: 'yearly',
  });
  const discountDataAll = allHistoryStatistic?.discountAmount;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-yellow-300/50 rounded-md">
            <BankNotes className="text-yellow-500" />
          </div>
        }
        isMoneyField
        title={t('discount')}
        dataDaily={discountDataDaily}
        dataMonthly={discountDataMonthly}
        dataYearly={discountDataYearly}
        dataAll={discountDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default Discount;
