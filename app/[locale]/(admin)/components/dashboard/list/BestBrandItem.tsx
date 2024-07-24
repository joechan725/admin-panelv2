import ImageShow from '@/components/ui/image/ImageShow';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';
import { useLocale } from 'next-intl';

interface BestSellerItemProps {
  salesRecord: Omit<SalesRecord, 'orderId'>;
}

const BestSellerItem = ({ salesRecord }: BestSellerItemProps) => {
  const locale = useLocale();

  const { revenue, sales, brandNameEN, brandNameZH } = salesRecord;

  const brandName = locale === 'en' ? brandNameZH : brandNameEN;

  return (
    <tr>
      {/* Brand Details */}
      <td className="p-2">
        <div className="text-sm text-slate-500 font-medium transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-hover:underline underline-offset-1">
          {brandName}
        </div>
      </td>
      {/* Sales */}
      <td className="p-2">
        <div className="text-sm text-slate-500 font-medium">{sales ?? 0}</div>
      </td>
      {/* Revenue */}
      <td className="p-2">
        <div className="text-sm text-slate-500 font-medium">${(revenue ?? 0).toFixed(2)}</div>
      </td>
    </tr>
  );
};

export default BestSellerItem;
