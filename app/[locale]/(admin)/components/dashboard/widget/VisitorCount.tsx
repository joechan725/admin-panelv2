import Widget from '@/components/layout/container/Widget';
import Eye from '@/components/icon/Eye';
import MiddleInfoCard from '../card/MiddleInfoCard';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { transformStatisticsToArray } from '@/lib/helpers/statistic/transformStatisticsToArray';
import { useTranslations } from 'next-intl';

interface VisitorCountProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const VisitorCount = ({
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  allHistoryStatistic,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: VisitorCountProps) => {
  const t = useTranslations('Admin.dashboard.visitor');

  const icon = (
    <div className="p-1.5 bg-slate-300/50 rounded-md">
      <Eye className="text-slate-500" />
    </div>
  );

  const visitorDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'visitorCount',
    period: 'daily',
  });
  const visitorDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'visitorCount',
    period: 'monthly',
  });
  const visitorDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'visitorCount',
    period: 'yearly',
  });
  const visitorDataAll = allHistoryStatistic?.visitorCount;

  const anonymousVisitorDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'anonymousVisitorCount',
    period: 'daily',
  });
  const anonymousVisitorDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'anonymousVisitorCount',
    period: 'monthly',
  });
  const anonymousVisitorDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'anonymousVisitorCount',
    period: 'yearly',
  });
  const anonymousVisitorDataAll = allHistoryStatistic?.anonymousVisitorCount;

  const registeredVisitorDataDaily = transformStatisticsToArray({
    statistic: dailyStatistic,
    field: 'registeredVisitorCount',
    period: 'daily',
  });
  const registeredVisitorDataMonthly = transformStatisticsToArray({
    statistic: monthlyStatistic,
    field: 'registeredVisitorCount',
    period: 'monthly',
  });
  const registeredVisitorDataYearly = transformStatisticsToArray({
    statistic: yearlyStatistic,
    field: 'registeredVisitorCount',
    period: 'yearly',
  });
  const registeredVisitorDataAll = allHistoryStatistic?.registeredVisitorCount;

  return (
    <Widget sizeFull className="min-h-[200px] h-full">
      <MiddleInfoCard
        icon={icon}
        mainTitle={t('visitors')}
        mainDataDaily={visitorDataDaily}
        mainDataMonthly={visitorDataMonthly}
        mainDataYearly={visitorDataYearly}
        mainDataAll={visitorDataAll}
        subTitle1={t('anonymous')}
        subData1Daily={anonymousVisitorDataDaily}
        subData1Monthly={anonymousVisitorDataMonthly}
        subData1Yearly={anonymousVisitorDataYearly}
        subData1All={anonymousVisitorDataAll}
        subTitle2={t('registered')}
        subData2Daily={registeredVisitorDataDaily}
        subData2Monthly={registeredVisitorDataMonthly}
        subData2Yearly={registeredVisitorDataYearly}
        subData2All={registeredVisitorDataAll}
        loadAllHistoryStatistic={loadAllHistoryStatistic}
        loadYearlyStatistic={loadYearlyStatistic}
      />
    </Widget>
  );
};

export default VisitorCount;
