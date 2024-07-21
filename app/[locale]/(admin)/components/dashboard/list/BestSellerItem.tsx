import ImageShow from '@/components/ui/image/ImageShow';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface BestSellerItemProps {
  salesRecord: Omit<SalesRecord, 'orderId'>;
}

const BestSellerItem = ({ salesRecord }: BestSellerItemProps) => {
  const locale = useLocale();

  const {
    productNameZH,
    productNameEN,
    revenue,
    sales,
    productDescriptionZH,
    productDescriptionEN,
    productImage,
    productId,
  } = salesRecord;

  const productName = locale === 'en' ? productNameZH : productNameEN;
  const productDescription = locale === 'en' ? productDescriptionZH : productDescriptionEN;

  return (
    <tr>
      {/* Product Details */}
      <td className="p-2">
        <Link className="flex gap-2 group" href={`/products/${productId}`}>
          <div className="flex-0">
            <ImageShow image={productImage} sizeClassName="size-16" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-hover:underline underline-offset-1">
              {productName}
            </div>
            <div className="text-xs text-gray-500 font-medium text-ellipsis max-w-72 line-clamp-2 group-hover:text-opacity-85 group-active:text-opacity-70">
              {productDescription ?? 'N/A'}
            </div>
          </div>
        </Link>
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
