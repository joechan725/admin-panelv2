import OrderedProductPreviewList from './OrderedProductPreviewList';
import Td from '@/components/table/Td';
import TrBody from '@/components/table/TrBody';
import OrderStatus from '@/components/features/order/detail/OrderStatus';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { Order } from '@/models/order/Order';
import { Link } from '@/navigation';
import OrderViewDetailLink from './OrderViewDetailLink';
import { useLocale, useTranslations } from 'next-intl';

interface UserOrderItemProps {
  order: Order;
  mode: 'admin' | 'user';
}

const UserOrderItem = ({ order, mode }: UserOrderItemProps) => {
  const t = useTranslations('Order.list');
  const locale = useLocale();

  const {
    id,
    status,
    orderItems,
    totalPriceBeforeDiscount,
    deliveryChargeAtThisOrder,
    discountAmount,
    amountToPay,
    paidAt,
    contactName,
    contactPhoneNumber,
    isPickUp,
    deliveryDetailAddress,
    deliveryDistrict,
    deliveryRegion,
    deliveryOptionNameEN,
    deliveryOptionNameZH,
    deliveryOptionDeliveryProviderEN,
    deliveryOptionDeliveryProviderZH,
    deliveryOptionEstimatedTimeEN,
    deliveryOptionEstimatedTimeZH,
  } = order;

  const deliveryOptionName = locale === 'en' ? deliveryOptionNameEN : deliveryOptionNameZH;
  const deliveryOptionDeliveryProvider =
    locale === 'en' ? deliveryOptionDeliveryProviderEN : deliveryOptionDeliveryProviderZH;
  const deliveryOptionEstimatedTime = locale === 'en' ? deliveryOptionEstimatedTimeEN : deliveryOptionEstimatedTimeZH;

  return (
    <TrBody>
      {/* id */}
      <Td hidden="xl">
        <Link href={mode === 'user' ? `/orders/${id}` : `/admin/orders/${id}`}>
          <div className="transition-all text-xs text-sky-500 hover:underline underline-offset-1 hover:text-opacity-85 active:text-opacity-70 font-medium">
            {id}
          </div>
        </Link>
      </Td>

      {/* status */}
      <Td>
        <OrderStatus status={status} />
      </Td>

      {/* deliveryAddress */}
      <Td hidden="lg">
        <div className="flex flex-col max-w-64 leading-4">
          {isPickUp && (
            <span className="text-xs py-0.5 px-1 rounded-md max-w-fit font-medium bg-success/10 text-success">
              {t('pickupAtStore')}
            </span>
          )}
          <div className="truncate">
            <span className="text-xs font-semibold text-primary-text">{t('contactPerson')}</span>
            <span className="text-xs font-medium text-secondary-text">{contactName}</span>
          </div>
          <div className="truncate">
            <span className="text-xs font-semibold text-primary-text">{t('contactNumber')}</span>
            <span className="text-xs font-medium text-secondary-text">{contactPhoneNumber}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-primary-text">
              {isPickUp ? t('pickupAddress') : t('deliveryAddress_')}
            </span>
            <span className="text-xs font-medium text-secondary-text">
              {deliveryDetailAddress}, {deliveryDistrict}, {deliveryRegion}
            </span>
          </div>
          <div className="text-xs">
            <span className="text-xs font-semibold text-primary-text">{t('deliveryOption')} </span>
            <span className="text-xs font-medium text-secondary-text">
              {deliveryOptionName}{' '}
              {deliveryOptionDeliveryProvider !== undefined && `by ${deliveryOptionDeliveryProvider}`}{' '}
              {deliveryOptionEstimatedTime! == undefined && `(within ${deliveryOptionEstimatedTime})`}
            </span>
          </div>
        </div>
      </Td>

      {/* orderItems */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">
          <OrderedProductPreviewList orderItems={orderItems} />
        </div>
      </Td>

      {/* price */}
      <Td hidden="sm">
        <div className="text-sm font-medium text-secondary-text">${totalPriceBeforeDiscount.toFixed(2)}</div>
        {discountAmount !== undefined && discountAmount > 0 && (
          <div className="text-xs font-medium text-secondary-text">(-${discountAmount.toFixed(2)})</div>
        )}
        {deliveryChargeAtThisOrder !== undefined && deliveryChargeAtThisOrder !== 0 && (
          <div className="text-xs font-medium text-secondary-text">(+${deliveryChargeAtThisOrder.toFixed(2)})</div>
        )}
        {(discountAmount !== undefined && discountAmount !== 0) ||
          (deliveryChargeAtThisOrder !== undefined && deliveryChargeAtThisOrder !== 0 && (
            <div className="text-sm font-medium text-secondary-text">=${amountToPay.toFixed(2)}</div>
          ))}
      </Td>

      {/* time */}
      <Td hidden="xl">
        <div className="space-y-1 text-xs max-w-24">
          <div className="space-y-0.5">
            <div className="font-medium text-secondary-text">{t('paidAt')}</div>
            <div className="font-semibold text-primary-text whitespace-normal">
              {paidAt ? formatDate(paidAt, 'detail') : 'N/A'}
            </div>
          </div>
        </div>
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <OrderViewDetailLink orderId={id} mode={mode} />
        </div>
      </Td>
    </TrBody>
  );
};

export default UserOrderItem;
