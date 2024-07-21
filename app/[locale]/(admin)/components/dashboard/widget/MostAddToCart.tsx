'use client';

import Widget from '@/components/layout/container/Widget';
import MostAddToCartCard from '../card/MostAddToCartCard';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';

interface MostAddToCartProps {
  isLoading?: boolean;
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
}

const MostAddToCart = ({ isLoading, dailyStatistic, monthlyStatistic, yearlyStatistic }: MostAddToCartProps) => {
  return (
    <Widget sizeFull className="min-h-[200px] max-h-[420px] h-full">
      <MostAddToCartCard
        isLoading={isLoading}
        addToCartRecordsDaily={dailyStatistic?.addToCartRecords ?? []}
        addToCartRecordsMonthly={monthlyStatistic?.addToCartRecords ?? []}
        addToCartRecordsYearly={yearlyStatistic?.addToCartRecords ?? []}
      />
    </Widget>
  );
};

export default MostAddToCart;
