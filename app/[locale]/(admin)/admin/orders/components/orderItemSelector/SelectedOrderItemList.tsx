import { OrderItem } from '@/models/order/OrderItem';
import SelectedOrderItem from './SelectedOrderItem';
import { useTranslations } from 'next-intl';

interface SelectedOrderItemListProps {
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  orderItems: OrderItem[];
  disabled: boolean;
}

const SelectedOrderItemList = ({ orderItems, disabled, setOrderItems }: SelectedOrderItemListProps) => {
  const t = useTranslations('Selector');

  if (!orderItems || orderItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text font-semibold text-slate-600">{t('selectedProducts')}</div>
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            <th className="p-2 text-slate-700 font-medium text-sm">{t('product')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('collection')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('category')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('brand')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('price')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('stock')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('quantity')}</th>
            <th className="p-2 text-slate-700 font-medium text-sm">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {orderItems &&
            orderItems.length > 0 &&
            orderItems.map((orderItem) => (
              <SelectedOrderItem
                key={orderItem.id}
                orderItem={orderItem}
                disabled={disabled}
                setOrderItems={setOrderItems}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedOrderItemList;
