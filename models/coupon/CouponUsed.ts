import { Coupon } from './Coupon';

export interface CouponUsed extends Coupon {
  discountAmountAtThisOrder: number;
}
