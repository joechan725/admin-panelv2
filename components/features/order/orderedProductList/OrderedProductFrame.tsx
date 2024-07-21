import { OrderItem } from '@/models/order/OrderItem';
import OrderedProductList from './OrderedProductList';
import { Order } from '@/models/order/Order';
import { useTranslations } from 'next-intl';

interface OrderedProductFrameProps {
  orderId: string;
  orderItems: OrderItem[];
  commentedProductIds?: string[];
  status?: Order['status'];
  mode: 'admin' | 'user' | 'viewOnly';
}

const OrderedProductFrame = ({
  orderId,
  orderItems,
  commentedProductIds = [],
  status,
  mode,
}: OrderedProductFrameProps) => {
  const t = useTranslations('Order.orderItem');

  const totalQuantity = orderItems.reduce((accumulator, orderItem) => accumulator + orderItem.quantity, 0);
  const totalPrice = orderItems.reduce((accumulator, orderItem) => {
    const { sellingPrice, markedPrice, quantity } = orderItem;
    const unitPrice = sellingPrice ?? markedPrice;
    return accumulator + unitPrice * quantity;
  }, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-primary-text mx-2">{t('title', { itemCount: totalQuantity })}</div>
      </div>
      <hr className="h-0.5 w-full bg-slate-600/20" />
      <div className="max-h-[650px] overflow-y-auto scrollbar scrollbar-slate">
        <OrderedProductList
          orderId={orderId}
          orderItems={orderItems}
          mode={mode}
          commentedProductIds={commentedProductIds}
          status={status}
        />
        <div className="flex justify-end">
          <div>
            <span className="text-xs md:text-sm font-medium text-primary-text">{t('subtotal')}</span>
            <span className="md:text-xl font-semibold text-secondary-text">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductFrame;
