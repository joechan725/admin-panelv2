import AvatarShow from '@/components/ui/image/AvatarShow';
import { DeliveryOptionUsageRecord } from '@/models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';
import { Link } from '@/navigation';
import { formatDate } from '@/lib/helpers/date/formatDate';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface DeliveryOptionUsageRecordItemProps {
  deliveryOptionUsageRecord: DeliveryOptionUsageRecord;
}

const DeliveryOptionUsageRecordItem = ({ deliveryOptionUsageRecord }: DeliveryOptionUsageRecordItemProps) => {
  const { convertUserName } = useLanguage();

  const {
    userEmail,
    userFirstName,
    userLastName,
    userAvatar,
    userId,
    orderedAt,
    deliveryChargeAtThisOrder,
    orderTotalPriceAfterDiscount,
    orderTotalPriceBeforeDiscount,
    orderId,
  } = deliveryOptionUsageRecord;

  const userName = convertUserName({
    firstName: userFirstName,
    lastName: userLastName,
  });

  return (
    <TrBody>
      {/* User */}
      <Td>
        <div className="flex gap-4 items-center">
          <AvatarShow image={userAvatar} sizeClassName="size-12" />
          <div className="max-w-70 overflow-hidden truncate">
            <Link
              href={`/admin/users/${userId}`}
              className="underline underline-offset-1 text-link transition-all hover:text-opacity-85 active:text-opacity-70 text-sm"
            >
              <span className="truncate">{userName}</span>
            </Link>
            <div className="text-sm">{userEmail ?? 'N/A'}</div>
          </div>
        </div>
      </Td>
      {/* orderedAt */}
      <Td>
        <div className="text-sm font-semibold text-primary-text">{formatDate(orderedAt, 'short')}</div>
      </Td>
      {/* orderId */}
      <Td>
        <Link
          href={`/admin/orders/${orderId}`}
          className="underline underline-offset-1 text-link transition-all hover:text-opacity-85 active:text-opacity-70 max-w-40 truncate text-sm"
        >
          {orderId}
        </Link>
      </Td>
      {/* totalPriceBeforeDisCount */}
      <Td>
        <div className="text-sm font-medium text-secondary-text"> ${orderTotalPriceBeforeDiscount.toFixed(2)}</div>
      </Td>
      {/* totalPriceAfterDisCount */}
      <Td>
        <div className="text-sm font-medium text-secondary-text"> ${orderTotalPriceAfterDiscount.toFixed(2)}</div>
      </Td>
      {/* deliveryCharge */}
      <Td>
        <div className="text-sm font-medium text-secondary-text"> ${deliveryChargeAtThisOrder.toFixed(2)}</div>
      </Td>
    </TrBody>
  );
};

export default DeliveryOptionUsageRecordItem;
