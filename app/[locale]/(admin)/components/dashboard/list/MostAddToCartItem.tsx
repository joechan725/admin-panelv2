import ImageShow from '@/components/ui/image/ImageShow';
import { AddToCartRecord } from '@/models/statistic/record/AddToCartRecord';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface MostAddToCartItemProps {
  addToCartRecord: AddToCartRecord & { timesAddedToCart: number };
}

const MostAddToCartItem = ({ addToCartRecord }: MostAddToCartItemProps) => {
  const locale = useLocale();

  const {
    productNameZH,
    productNameEN,
    productDescriptionZH,
    productDescriptionEN,
    productImage,
    productId,
    timesAddedToCart,
  } = addToCartRecord;

  const productName = locale === 'en' ? productNameEN : productNameZH;
  const productDescription = locale === 'en' ? productDescriptionEN : productDescriptionZH;

  return (
    <tr>
      {/* Product Details */}
      <td className="p-2">
        <Link className="flex gap-2 group" href={`/products/${productId}`}>
          <div className="flex-0">
            <ImageShow image={productImage} sizeClassName="size-12" />
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
      {/* Quantity */}
      <td className="p-2">
        <div className="text-sm text-slate-500 font-medium">{timesAddedToCart ?? 0}</div>
      </td>
    </tr>
  );
};

export default MostAddToCartItem;
