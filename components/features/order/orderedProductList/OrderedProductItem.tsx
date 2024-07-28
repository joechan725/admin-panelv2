import ImageShow from '@/components/ui/image/ImageShow';
import { OrderItem } from '@/models/order/OrderItem';
import { Order } from '@/models/order/Order';
import RemoveItemFromOrderButton from './RemoveItemFromOrderButton';
import CreateCommentButton from './CreateCommentButton';
import clsx from 'clsx/lite';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { useLocale, useTranslations } from 'next-intl';

interface OrderedProductItemProps {
  orderId: string;
  orderItem: OrderItem;
  commentedProductIds?: string[];
  status?: Order['status'];
  mode: 'admin' | 'user' | 'viewOnly';
}

const OrderedProductItem = ({
  orderId,
  orderItem,
  commentedProductIds = [],
  status,
  mode,
}: OrderedProductItemProps) => {
  const t = useTranslations('Order.orderItem');
  const locale = useLocale();

  const {
    id,
    nameZH,
    nameEN,
    quantity,
    productId,
    commentId,
    image,
    sellingPrice,
    markedPrice,
    descriptionZH,
    descriptionEN,
  } = orderItem;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;

  return (
    <div className="flex items-center gap-4 md:gap-8 border-b border-gray-600/15 py-4 px-2 relative">
      <div className="flex-0">
        <ImageShow image={image} sizeClassName="size-12 md:size-32" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex-1">
            <div className="font-semibold text-primary-text text-sm md:text-base">{name}</div>
            <div className="text-xs font-medium text-secondary-text line-clamp-2 text-ellipsis leading-4">
              {splitNewLine(description)}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <div>
                <span className="text-xs md:text-sm font-medium text-primary-text">{t('quantity')}</span>
                <span className="text-xs md:text-sm font-semibold text-secondary-text"> {quantity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-0">
        <div className="flex flex-col items-end ml-4">
          {sellingPrice !== undefined && (
            <div className="font-semibold text-secondary-text text-xs line-through">{markedPrice.toFixed(2)}</div>
          )}
          <div
            className={clsx(
              sellingPrice !== undefined ? 'text-danger' : 'text-secondary-text',
              'font-semibold text-sm md:text-lg'
            )}
          >
            ${(sellingPrice ?? markedPrice).toFixed(2)}
          </div>
          <hr className="bg-slate-600/20 h-0.5 w-[calc(100%+10px)]" />
          <div className="md:text-xl font-semibold text-secondary-text">
            ${((sellingPrice ?? markedPrice) * quantity).toFixed(2)}
          </div>
        </div>
      </div>
      {mode === 'admin' && (
        <div className="absolute right-2 top-2">
          <RemoveItemFromOrderButton orderId={orderId} orderItemId={id} productName={name} />
        </div>
      )}
      {mode === 'user' &&
        (status === 'Delivered' || status === 'Picked Up') &&
        !commentedProductIds.includes(productId) &&
        commentId !== undefined && (
          <div className="absolute right-2 top-2">
            <CreateCommentButton productId={productId} commentId={commentId} />
          </div>
        )}
    </div>
  );
};

export default OrderedProductItem;
