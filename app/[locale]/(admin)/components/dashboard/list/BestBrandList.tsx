import { useTranslations } from 'next-intl';
import BestSellerItem from './BestSellerItem';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';
import BestSellerSkeleton from './BestSellerSkeleton';

interface BestSellerListProps {
  isLoading?: boolean;
  salesRecords: SalesRecord[];
}

const BestSellerList = ({ isLoading, salesRecords }: BestSellerListProps) => {
  const t = useTranslations('Admin.dashboard.bestBrand');

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10">
            <th className="p-2 text-sm text-slate-600 font-semibold">{t('brand')}</th>
            <th className="p-2 text-sm text-slate-600 font-semibold">{t('sales')}</th>
            <th className="p-2 text-sm text-slate-600 font-semibold">{t('revenue')}</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <BestSellerSkeleton />}
          {!isLoading &&
            salesRecords.length > 0 &&
            salesRecords.slice(0, 5).map((record) => <BestSellerItem salesRecord={record} key={record.productId} />)}
        </tbody>
      </table>
      {!isLoading && (!salesRecords || salesRecords.length === 0) && (
        <div className="mt-4 text-sm font-semibold text-gray-500">{t('noItems')}</div>
      )}
    </div>
  );
};

export default BestSellerList;
