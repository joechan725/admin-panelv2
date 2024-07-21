import { OrderItem } from '@/models/order/OrderItem';
import OrderedProductItem from './OrderedProductItem';
import { Order } from '@/models/order/Order';
import { useTranslations } from 'next-intl';

interface OrderedProductListProps {
  orderId: string;
  orderItems: OrderItem[];
  commentedProductIds?: string[];
  status?: Order['status'];
  mode: 'admin' | 'user' | 'viewOnly';
}

const OrderedProductList = ({
  orderId,
  orderItems,
  commentedProductIds = [],
  status,
  mode,
}: OrderedProductListProps) => {
  const t = useTranslations('Order.orderItem');

  return (
    <div>
      {(!orderItems || orderItems.length === 0) && (
        <div className="text-sm font-semibold text-gray-500">{t('noItems')}</div>
      )}
      {orderItems &&
        orderItems.length > 0 &&
        orderItems.map((orderItem) => (
          <OrderedProductItem
            key={orderItem.id}
            orderId={orderId}
            orderItem={orderItem}
            commentedProductIds={commentedProductIds}
            status={status}
            mode={mode}
          />
        ))}
    </div>
  );
};

export default OrderedProductList;
