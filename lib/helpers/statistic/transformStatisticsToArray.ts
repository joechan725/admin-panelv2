import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';

interface TransformStatisticsToArrayParameters<T extends DailyStatistic | MonthlyStatistic | YearlyStatistic> {
  statistic?: T;
  field: string;
  period: 'daily' | 'monthly' | 'yearly';
}

export const transformStatisticsToArray = <T extends DailyStatistic | MonthlyStatistic | YearlyStatistic>({
  statistic,
  field,
  period,
}: TransformStatisticsToArrayParameters<T>) => {
  if (!statistic) {
    return [];
  }

  const lengthOfArray = period === 'daily' ? 14 : period === 'monthly' ? 12 : period === 'yearly' ? 2 : 0;

  const data = [];

  for (let i = 0; i < lengthOfArray; i++) {
    const keySuffix =
      i === 0
        ? period === 'daily'
          ? 'Today'
          : period === 'monthly'
          ? 'ThisMonth'
          : period === 'yearly'
          ? 'ThisYear'
          : ''
        : `${i}${period === 'daily' ? 'Day' : period === 'monthly' ? 'Month' : period === 'yearly' ? 'Year' : ''}Ago`;

    const key = `${field}${keySuffix}` as keyof T;
    data.push(statistic[key] as number | undefined);
  }

  return data;
};
