export interface Coupon {
  id: string;
  code: string; // Unique identifier for the coupon
  discountType: 'fixed' | 'percentage'; // Type of discount
  discountAmount: number; // The discount amount (could be a fixed amount or percentage)
  maximumDiscount?: number; // The maximum discount amount that can be applied using the coupon. (for percentage type)
  minimumSpend?: number; // Optional minimum purchase amount to apply the coupon
  startDate?: number; // Optional start date for coupon validity
  endDate?: number; // Optional end date for coupon validity
  usageLimit?: number; // The maximum number of times the coupon can be used in total
  usageLimitPerUser?: number; // Optional limit of how many times a User can use this coupon
  registeredUserOnly: boolean; // Whether the coupon is open to all user.
  isPublic: boolean; // Whether the coupon is currently available
  canBeUsedTogether: boolean; // Whether the coupon could be used with other coupon

  // Timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
