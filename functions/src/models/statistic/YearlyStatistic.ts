import { AddToCartRecord } from './record/AddToCartRecord';

export interface YearlyStatistic {
  // order related
  revenueThisYear?: number;
  revenue1YearAgo?: number;

  salesThisYear?: number;
  sales1YearAgo?: number;

  orderCountThisYear?: number;
  orderCount1YearAgo?: number;

  // order - coupon related
  discountAmountThisYear?: number;
  discountAmount1YearAgo?: number;

  couponUsageCountThisYear?: number;
  couponUsageCount1YearAgo?: number;

  // order - deliveryOption related
  deliveryChargeThisYear?: number;
  deliveryCharge1YearAgo?: number;

  // comment related
  commentCountThisYear?: number;
  commentCount1YearAgo?: number;

  // cartItem related
  addToCartItemCountThisYear?: number;
  addToCartItemCount1YearAgo?: number;

  addToCartRecords?: AddToCartRecord[];

  // user related
  firstTimeVisitorCountThisYear?: number;
  firstTimeVisitorCount1YearAgo?: number;

  visitorCountThisYear?: number;
  visitorCount1YearAgo?: number;

  anonymousVisitorCountThisYear?: number;
  anonymousVisitorCount1YearAgo?: number;

  registeredVisitorCountThisYear?: number;
  registeredVisitorCount1YearAgo?: number;
}
