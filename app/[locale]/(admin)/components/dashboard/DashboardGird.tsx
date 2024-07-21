import TotalVisitorStat from './widget/TotalVisitorStat';
import Sales from './widget/Sales';
import Revenue from './widget/Revenue';
import OrderCount from './widget/OrderCount';
import Discount from './widget/Discount';
import CartItemQuantity from './widget/CartItemQuantity';
import CommentCount from './widget/CommentCount';
import TotalRevenueStat from './widget/TotalRevenueStat';
import VisitedCount from './widget/VisitorCount';
import CouponUsed from './widget/CouponUsed';
import DeliveryCharge from './widget/DeliveryCharge';
import BestSeller from './widget/BestSeller';
import MostAddToCart from './widget/MostAddToCart';
import DateSearchSuspense from '@/components/search/DateSearchSuspense';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';

interface DashboardGirdProps {
  dailyStatistic: DailyStatistic | undefined;
  monthlyStatistic: MonthlyStatistic | undefined;
  yearlyStatistic: YearlyStatistic | undefined;
  allHistoryStatistic: AllHistoryStatistic | undefined;
  salesRecords: SalesRecord[];
  loadYearlyStatistic: () => void;
  loadAllHistoryStatistic: () => void;
}

const DashboardGird = ({
  allHistoryStatistic,
  dailyStatistic,
  monthlyStatistic,
  yearlyStatistic,
  salesRecords,
  loadAllHistoryStatistic,
  loadYearlyStatistic,
}: DashboardGirdProps) => {
  return (
    <div>
      <div className="flex justify-end">
        <DateSearchSuspense canBeAfterToday={false} />
      </div>
      <div className="grid min-w-[768px] grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="col-span-4 xl:col-span-2">
          <VisitedCount
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div className="col-span-4">
          <TotalVisitorStat dailyStatistic={dailyStatistic} />
        </div>
        <div className="col-span-4 row-span-2">
          <TotalRevenueStat monthlyStatistic={monthlyStatistic} />
        </div>
        <div>
          <Revenue
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div>
          <Sales
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div>
          <Discount
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div>
          <CouponUsed
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div className="col-span-2 row-span-2">
          <BestSeller salesRecords={salesRecords} />
        </div>
        <div className="col-span-2 row-span-2">
          <MostAddToCart
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
          />
        </div>
        <div>
          <DeliveryCharge
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div>
          <OrderCount
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div>
          <CartItemQuantity
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
        <div>
          <CommentCount
            allHistoryStatistic={allHistoryStatistic}
            dailyStatistic={dailyStatistic}
            monthlyStatistic={monthlyStatistic}
            yearlyStatistic={yearlyStatistic}
            loadAllHistoryStatistic={loadAllHistoryStatistic}
            loadYearlyStatistic={loadYearlyStatistic}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardGird;
