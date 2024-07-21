import Cart from '@/components/icon/Cart';
import Widget from '@/components/layout/container/Widget';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import SmallInfoCard from '../card/SmallInfoCard';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { useTranslations } from 'next-intl';

interface CartItemQuantityProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const CartItemQuantity = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: CartItemQuantityProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const cartDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'addToCartItemCount',
    period: 'daily',
  });
  const cartDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'addToCartItemCount',
    period: 'monthly',
  });
  const cartDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'addToCartItemCount',
    period: 'yearly',
  });
  const cartDataAll = allHistoryStatistic?.addToCartItemCount;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-cyan-300/50 rounded-md">
            <Cart className="text-cyan-500" />
          </div>
        }
        title={t('cartItems')}
        dataDaily={cartDataDaily}
        dataMonthly={cartDataMonthly}
        dataYearly={cartDataYearly}
        dataAll={cartDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default CartItemQuantity;
