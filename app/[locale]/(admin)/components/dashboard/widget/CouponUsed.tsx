import Ticket from '@/components/icon/Ticket';
import Widget from '@/components/layout/container/Widget';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import SmallInfoCard from '../card/SmallInfoCard';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { useTranslations } from 'next-intl';

interface CouponUsedProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const CouponUsed = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: CouponUsedProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const couponDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'couponUsageCount',
    period: 'daily',
  });
  const couponDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'couponUsageCount',
    period: 'monthly',
  });
  const couponDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'couponUsageCount',
    period: 'yearly',
  });
  const couponDataAll = allHistoryStatistic?.couponUsageCount;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-amber-300/50 rounded-md">
            <Ticket className="text-amber-500" />
          </div>
        }
        title={t('coupons')}
        dataDaily={couponDataDaily}
        dataMonthly={couponDataMonthly}
        dataYearly={couponDataYearly}
        dataAll={couponDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default CouponUsed;
