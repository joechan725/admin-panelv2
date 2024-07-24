import { OrderStatus as OrderStatusModel } from '@/models/order/OrderStatus';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface OrderStatusProps {
  status: OrderStatusModel;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const t = useTranslations('Order.statusHistory');

  return (
    <div
      className={clsx(
        'text-xs py-0.5 px-1 rounded-md max-w-max whitespace-nowrap font-medium',
        status === 'Placed' && 'bg-gray-500/10 text-gray-500',
        status === 'Paid' && 'bg-success/10 text-success',
        status === 'Delivering' && 'bg-warning/10 text-warning',
        status === 'Ready for Pickup' && 'bg-warning/10 text-warning',
        status === 'Delivered' && 'bg-safe/10 text-safe',
        status === 'Picked Up' && 'bg-safe/10 text-safe',
        status === 'Application for Refund' && 'bg-danger/10 text-danger',
        status === 'Refund Request Reject' && 'bg-danger/10 text-danger',
        status === 'Refund Pending' && 'bg-warning/10 text-warning',
        status === 'Refund Failed' && 'bg-danger/10 text-danger',
        status === 'Refund Cancelled' && 'bg-danger/10 text-danger',
        status === 'Refunded' && 'bg-warning/10 text-warning'
      )}
    >
      {status === 'Placed' && t('placed')}
      {status === 'Paid' && t('paid')}
      {status === 'Delivering' && t('delivering')}
      {status === 'Ready for Pickup' && t('readyForPickup')}
      {status === 'Delivered' && t('delivered')}
      {status === 'Picked Up' && t('pickedUp')}
      {status === 'Application for Refund' && t('applicationForRefund')}
      {status === 'Refund Request Reject' && t('refundRequestReject')}
      {status === 'Refund Pending' && t('refundPending')}
      {status === 'Refund Failed' && t('refundFailed')}
      {status === 'Refund Cancelled' && t('refundCancelled')}
      {status === 'Refunded' && t('refunded')}
    </div>
  );
};

export default OrderStatus;
