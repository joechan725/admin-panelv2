import { formatDate } from '@/lib/helpers/date/formatDate';
import { StatusHistory } from '@/models/order/StatusHistory';
import { Link } from '@/navigation';
import OrderStatus from './OrderStatus';
import ImageShow from '@/components/ui/image/ImageShow';
import EnlargeImageButton from '@/components/ui/image/EnlargeImageButton';
import AdminDeleteStatusHistoryButton from './AdminDeleteStatusHistoryButton';
import { useTranslations } from 'next-intl';

interface StatusHistoryItemProps {
  statusHistory: StatusHistory;
  deliveryProvider?: string;
  mode: 'user' | 'admin';
}

const StatusHistoryItem = ({ statusHistory, deliveryProvider, mode }: StatusHistoryItemProps) => {
  const t = useTranslations('Order.statusHistory');

  const { status, message, referenceUrl, updatedAt, referenceNumber, images } = statusHistory;

  return (
    <div className="relative group">
      <div className="absolute w-0.5 h-full -translate-x-1/2 left-0 -top-3 group-first:top-0 bg-primary-text" />
      <div className="absolute size-2.5 bottom-0 -translate-x-1/2 rounded-full bg-primary-text ring ring-slate-300" />
      <div className="space-y-3 ml-6">
        <div className="space-y-1">
          <OrderStatus status={status} />
          <div className="text-sm font-medium text-secondary-text">
            {status === 'Placed' && t('placedDescription')}
            {status === 'Paid' && t('paidDescription')}
            {status === 'Delivering' && t('deliveringDescription')}
            {status === 'Ready for Pickup' && t('readyForPickupDescription')}
            {status === 'Delivered' && t('deliveredDescription')}
            {status === 'Picked Up' && t('pickedUpDescription')}
            {status === 'Application for Refund' && t('applicationForRefundDescription')}
            {status === 'Refund Request Reject' && t('refundRequestRejectDescription')}
            {status === 'Refund Pending' && t('refundPendingDescription')}
            {status === 'Refund Failed' && t('refundFailedDescription')}
            {status === 'Refund Cancelled' && t('refundCancelledDescription')}
            {status === 'Refunded' && t('refundedDescription')}
          </div>
          {message !== undefined && <div className="text-sm font-medium text-secondary-text">{message}</div>}
          {referenceNumber !== undefined && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('referenceNumber')}</span>
              <span className="text-sm font-medium text-secondary-text"> {referenceNumber}</span>
            </div>
          )}
          {referenceUrl !== undefined && (
            <div>
              <span className="text-sm font-semibold text-primary-text">{t('detail')}</span>
              <Link
                href={referenceUrl}
                className="text-sm font-medium text-secondary-text underline underline-offset-1 transition-all hover:text-opacity-85 active:text-opacity-70"
              >
                {referenceUrl}
              </Link>
            </div>
          )}
          {images !== undefined && images.length > 0 && (
            <div className="flex gap-1">
              {images.map((image) => (
                <EnlargeImageButton key={image.id} image={image}>
                  <ImageShow image={image} sizeClassName="size-14 sm:size-20" />
                </EnlargeImageButton>
              ))}
            </div>
          )}
        </div>
        <div className="text-sm font-medium text-secondary-text">{formatDate(updatedAt, 'detail')}</div>
      </div>
      {mode === 'admin' && (
        <div className="absolute right-2 top-2">
          <AdminDeleteStatusHistoryButton statusHistory={statusHistory} />
        </div>
      )}
    </div>
  );
};

export default StatusHistoryItem;
