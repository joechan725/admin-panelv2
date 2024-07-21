import { Coupon } from './Coupon';

export interface PrivateCoupon extends Coupon {
  // Statistics
  usageCount?: number; // The current number of times the coupon has been used.
  accumulativeDiscountAmount?: number;
}
