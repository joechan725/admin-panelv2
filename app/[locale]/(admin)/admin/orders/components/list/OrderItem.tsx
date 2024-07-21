import { Order } from '@/models/order/Order';
import AvatarShow from '@/components/ui/image/AvatarShow';
import UserRole from '@/components/ui/UserRole';
import { Link } from '@/navigation';
import OrderProductList from './OrderedProductPreviewList';
import Eye from '@/components/icon/Eye';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { formatDate } from '@/lib/helpers/date/formatDate';
import OrderStatus from '@/components/features/order/detail/OrderStatus';
import EditOrderInformationButton from './EditOrderInformationButton';
import EditOrderStatusButton from './EditOrderStatusButton';
import Td from '@/components/table/Td';
import IconButton from '@/components/ui/button/IconButton';
import RefundButton from './RefundButton';
import { useLocale, useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const t = useTranslations('Order.adminList');
  const locale = useLocale();
  const { convertAddress, convertUserName } = useLanguage();

  const {
    id,
    // user
    userId,
    userAvatar,
    userEmail,
    userRole,
    userFirstName,
    userLastName,
    // products
    orderItems,
    // price
    amountRefunded,
    amountToPay,
    deliveryChargeAtThisOrder,
    totalPriceBeforeDiscount,
    discountAmount,
    // status
    paidAt,
    status,
    // delivery information
    isPickUp,
    deliveryRegion,
    deliveryDistrict,
    deliveryDetailAddress,
    contactName,
    contactPhoneNumber,
    // delivery option
    deliveryOptionNameEN,
    deliveryOptionEstimatedTimeEN,
    deliveryOptionDeliveryProviderEN,
    deliveryOptionNameZH,
    deliveryOptionEstimatedTimeZH,
    deliveryOptionDeliveryProviderZH,
  } = order;

  const userName = convertUserName({
    firstName: userFirstName,
    lastName: userLastName,
  });

  const deliveryOptionName = locale === 'en' ? deliveryOptionNameEN : deliveryOptionNameZH;
  const deliveryOptionEstimatedTime = locale === 'en' ? deliveryOptionEstimatedTimeEN : deliveryOptionEstimatedTimeZH;
  const deliveryOptionDeliveryProvider =
    locale === 'en' ? deliveryOptionDeliveryProviderEN : deliveryOptionDeliveryProviderZH;

  return (
    <tr className="border-b border-slate-900/10 even:bg-gray-50/50">
      {/* id */}
      <Td>
        <Link href={`/admin/orders/${id}`}>
          <div className="transition-all text-xs text-sky-500 hover:underline underline-offset-1 hover:text-opacity-85 active:text-opacity-70 font-medium">
            {id}
          </div>
        </Link>
      </Td>

      {/* user */}
      <Td>
        <Link href={`/admin/users/${userId}`} className="group hover:opacity-85 active:opacity-70">
          <div className="flex items-center gap-4">
            <AvatarShow sizeClassName="size-10" image={userAvatar} />
            <div className="flex flex-col">
              <div className="truncate text-sm font-semibold text-primary-text group-hover:underline underline-offset-1">
                {userName}
              </div>
              <div className="text-xs truncate font-medium text-gray-500 group-hover:underline underline-offset-1">
                {userEmail ?? 'N/A'}
              </div>
              <UserRole userRole={userRole} />
            </div>
          </div>
        </Link>
      </Td>

      {/* status */}
      <Td>
        <OrderStatus status={status} />
      </Td>

      {/* deliveryAddress */}
      <Td>
        <div className="flex flex-col max-w-64 leading-4">
          {isPickUp && (
            <span className="text-xs py-0.5 px-1 rounded-md max-w-fit font-medium bg-success/10 text-success">
              {t('pickupAtStore')}
            </span>
          )}
          <div>
            <span className="text-xs font-semibold text-primary-text">{t('contactPerson')}</span>
            <span className="text-xs font-medium text-secondary-text">{contactName}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-primary-text">{t('contactNumber')}</span>
            <span className="text-xs font-medium text-secondary-text">{contactPhoneNumber}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-primary-text">
              {isPickUp ? t('pickupAddress') : t('deliveryAddress_')}
            </span>
            <span className="text-xs font-medium text-secondary-text">
              {convertAddress({
                detailAddress: deliveryDetailAddress,
                district: deliveryDistrict,
                region: deliveryRegion,
              })}
            </span>
          </div>
          <div className="text-xs">
            <span className="text-xs font-semibold text-primary-text">{t('deliveryOption')}</span>
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
          <OrderProductList orderItems={orderItems} />
        </div>
      </Td>

      {/* price */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">${totalPriceBeforeDiscount.toFixed(2)}</div>
        {discountAmount !== undefined && discountAmount !== 0 && (
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
      <Td>
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-secondary-text">{t('paidAt')}</div>
          <div className="text-xs font-semibold text-primary-text whitespace-normal">
            {paidAt ? formatDate(paidAt, 'detail') : 'N/A'}
          </div>
        </div>
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message={t('viewDetail')}>
            <IconButton theme="secondary" disabled={false} type="button">
              <Link href={`/admin/orders/${id}`}>
                <Eye sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <EditOrderInformationButton order={order} />
          <EditOrderStatusButton order={order} />
          {(amountRefunded ?? 0) < amountToPay && <RefundButton order={order} />}
        </div>
      </Td>
    </tr>
  );
};

export default OrderItem;
