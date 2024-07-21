import { AddToCartRecord } from '@/models/statistic/record/AddToCartRecord';
import MostAddToCartItem from './MostAddToCartItem';
import { useTranslations } from 'next-intl';

interface MostAddToCartListProps {
  isLoading?: boolean;
  addToCartRecords: (AddToCartRecord & { timesAddedToCart: number })[];
}

const MostAddToCartList = ({ isLoading, addToCartRecords }: MostAddToCartListProps) => {
  const t = useTranslations('Admin.dashboard.mostAddedToCart');

  return (
    <div>
      {!isLoading && addToCartRecords && addToCartRecords.length > 0 && (
        <table className="w-full">
          <thead>
            <tr className="border-y border-slate-900/10">
              <th className="p-2 text-sm text-slate-600 font-semibold">{t('product')}</th>
              <th className="p-2 text-sm text-slate-600 font-semibold">{t('times')}</th>
            </tr>
          </thead>
          <tbody>
            {addToCartRecords.slice(0, 5).map((record) => (
              <MostAddToCartItem addToCartRecord={record} key={record.productId} />
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && (!addToCartRecords || addToCartRecords.length === 0) && (
        <div className="mt-4 text-sm font-semibold text-gray-500">{t('noItems')}</div>
      )}
    </div>
  );
};

export default MostAddToCartList;
