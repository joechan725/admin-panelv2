import Chat from '@/components/icon/Chat';
import Widget from '@/components/layout/container/Widget';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import SmallInfoCard from '../card/SmallInfoCard';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { useTranslations } from 'next-intl';

interface CommentCountProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const CommentCount = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: CommentCountProps) => {
  const t = useTranslations('Admin.dashboard.widget');

  const commentDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'commentCount',
    period: 'daily',
  });
  const commentDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'commentCount',
    period: 'monthly',
  });
  const commentDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'commentCount',
    period: 'yearly',
  });
  const commentDataAll = allHistoryStatistic?.commentCount;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <SmallInfoCard
        icon={
          <div className="p-1.5 bg-teal-300/50 rounded-md">
            <Chat className="text-teal-500" />
          </div>
        }
        title={t('comments')}
        dataDaily={commentDataDaily}
        dataMonthly={commentDataMonthly}
        dataYearly={commentDataYearly}
        dataAll={commentDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default CommentCount;
