import ReactComposedChart from '@/components/chart/ReactComposedChart';
import { useSearchParams } from 'next/navigation';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { convertFromDateTimeLocalString } from '@/lib/helpers/date/convertFromDateTimeLocalString';
import { isValidDateString } from '@/lib/helpers/date/isValidDateString';
import { useFormatter } from 'next-intl';

interface MonthlyCardWithComposedChartProps {
  title1: string;
  title2: string;
  sizeClassName?: string;
  xAxis: string;
  yAxis1: string;
  yAxis2: string;
  monthlyData1: (number | undefined)[];
  monthlyData2: (number | undefined)[];
}

const MonthlyCardWithComposedChart = ({
  title1,
  title2,
  sizeClassName = 'w-full h-80',
  xAxis = 'Month',
  yAxis1,
  yAxis2,
  monthlyData1,
  monthlyData2,
}: MonthlyCardWithComposedChartProps) => {
  const format = useFormatter();

  const searchParams = useSearchParams();
  const searchDate = searchParams.get('date');

  const date =
    isValidDateString(searchDate, 'yyyy-mm-dd') && searchDate
      ? searchDate
      : convertToDateTimeLocalString(new Date(), 'yyyy-mm-dd');
  const targetDate = convertFromDateTimeLocalString(date, 'yyyy-mm-dd');

  const reversedMonths = Array.from({ length: 12 })
    .map((_, index) => {
      const current = new Date(targetDate);
      const before = new Date(new Date().setMonth(current.getMonth() - index));

      return format.dateTime(before, { month: 'short' });
    })
    .reverse();

  const length = Math.max(monthlyData2.length, monthlyData1.length);
  const reversedMonthlyData1 = monthlyData1.reverse();
  const reversedMonthlyData2 = monthlyData2.reverse();

  const dataToShow: { [x: string]: string | number }[] = [];

  for (let i = 0; i < length; i++) {
    dataToShow.push({
      [xAxis]: reversedMonths[i],
      [yAxis1]: reversedMonthlyData1[i] ?? 0,
      [yAxis2]: reversedMonthlyData2[i] ?? 0,
    });
  }

  return (
    <div className="flex divide-x divide-black/20">
      <div className="w-full pr-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold text-black/60">{title1}</div>
          <div className="font-semibold text-black/60">{title2}</div>
        </div>
        <div>
          <ReactComposedChart
            data={dataToShow}
            sizeClassName={sizeClassName}
            xAxis={xAxis}
            yAxis1={yAxis1}
            yAxis2={yAxis2}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyCardWithComposedChart;
