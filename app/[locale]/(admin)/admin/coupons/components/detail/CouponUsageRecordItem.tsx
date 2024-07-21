import AvatarShow from '@/components/ui/image/AvatarShow';
import { CouponUsageRecord } from '@/models/coupon/usageRecord/CouponUsageRecord';
import { Link } from '@/navigation';
import { formatDate } from '@/lib/helpers/date/formatDate';
import Td from '@/components/table/Td';
import TrBody from '@/components/table/TrBody';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface CouponUsageRecordItemProps {
  couponUsageRecord: CouponUsageRecord;
}
const CouponUsageRecordItem = ({ couponUsageRecord }: CouponUsageRecordItemProps) => {
  const { convertUserName } = useLanguage();

  const {
    userEmail,
    userFirstName,
    userLastName,
    userAvatar,
    userId,
    discountAmountAtThisOrder,
    orderTotalPriceAfterDiscount,
    orderTotalPriceBeforeDiscount,
    orderId,
    usedAt,
  } = couponUsageRecord;

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
      {/* usedAt */}
      <Td>
        <div className="text-sm font-semibold text-primary-text">{formatDate(usedAt, 'short')}</div>
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
      {/* discount */}
      <Td>
        <div className="text-sm font-medium text-secondary-text"> ${discountAmountAtThisOrder.toFixed(2)}</div>
      </Td>
    </TrBody>
  );
};
export default CouponUsageRecordItem;
