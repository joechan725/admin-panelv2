import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import CouponItem from './CouponItem';

interface CouponListProps {
  coupons: PrivateCoupon[];
  onSelect?: (id: string) => void;
  selectedCouponIds?: string[];
}

const CouponList = ({ coupons, onSelect, selectedCouponIds }: CouponListProps) => {
  return (
    coupons &&
    coupons.length > 0 &&
    coupons.map((coupon) => (
      <CouponItem
        key={coupon.id}
        privateCoupon={coupon}
        onSelect={onSelect}
        isSelect={selectedCouponIds && selectedCouponIds.includes(coupon.id)}
      />
    ))
  );
};
export default CouponList;
