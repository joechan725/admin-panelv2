export interface AllHistoryStatistic {
  // product related
  totalProductCount?: number;
  publicProductCount?: number;
  privateProductCount?: number;

  // delivery option related
  totalDeliveryOptionCount?: number;
  publicDeliveryOptionCount?: number;
  privateDeliveryOptionCount?: number;

  // Coupon related
  totalCouponCount?: number;
  publicCouponCount?: number;
  privateCouponCount?: number;

  // classification related
  brandCount?: number;
  categoryCount?: number;
  collectionCount?: number;

  // order related
  revenue?: number;
  sales?: number;
  orderCount?: number;

  // order - coupon related
  discountAmount?: number;
  couponUsageCount?: number;

  // order - deliveryOption related
  deliveryCharge?: number;

  // comment related
  commentCount?: number;

  // cartItem related
  addToCartItemCount?: number;

  // user related
  userCount?: number;
  firstTimeVisitorCount?: number;
  anonymousUserCount?: number;
  registeredUserCount?: number;

  visitorCount?: number;
  anonymousVisitorCount?: number;
  registeredVisitorCount?: number;
}
