import { Image } from '../../Image';

export interface CouponUsageRecord {
  id: string;
  // coupon information
  couponId: string;
  couponCode: string;
  couponDescription: string;
  couponDiscountType: 'fixed' | 'percentage';
  couponDiscountAmount: number;
  couponMaximumDiscount?: number;
  couponMinimumSpend?: number;

  // user information
  userRole: 'anonymous' | 'user' | 'admin';
  userId: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userAvatar?: Image;

  // order information
  orderId: string;
  orderTotalPriceAfterDiscount: number;
  orderTotalPriceBeforeDiscount: number;
  orderAmountToPay: number;

  // order - coupon information
  discountAmountAtThisOrder: number;

  // timestamp
  usedAt: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
