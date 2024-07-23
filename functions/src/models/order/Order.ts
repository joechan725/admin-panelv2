import Stripe from 'stripe';
import { Image } from '../Image';
import { OrderItem } from './OrderItem';
import { CouponUsed } from '../coupon/CouponUsed';
import { StatusHistory } from './StatusHistory';
import { Region } from '../../types/Region';
import { District } from '../../types/District';
import { OrderStatus } from './OrderStatus';

export interface Order {
  id: string;
  queryCode: string;

  // user information
  userId: string;
  userRole: 'anonymous' | 'user' | 'admin';
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userAvatar?: Image;
  userPhoneNumber?: string;
  // user: User;

  error?: string;

  // order information
  totalQuantity: number;
  // products
  orderItems: OrderItem[];
  // comment
  commentedProductIds: string[];
  // coupons
  couponsUsed: CouponUsed[];
  // price
  totalPriceBeforeDiscount: number;
  totalPriceAfterDiscount: number;
  discountAmount?: number;
  deliveryChargeAtThisOrder: number;
  amountToPay: number;
  amountRefunded?: number;

  // delivery information
  isPickUp: boolean;
  deliveryAddressId?: string;
  deliveryRegion: Region;
  deliveryDistrict: District;
  deliveryDetailAddress: string;
  contactName: string;
  contactPhoneNumber: string;
  addressRemark?: string;
  storeName?: string;
  storePhoneNumber?: string;
  storeBusinessHours?: string;

  // delivery option
  deliveryOptionId: string;
  deliveryOptionNameZH: string;
  deliveryOptionNameEN: string;
  deliveryOptionDescriptionEN?: string;
  deliveryOptionDescriptionZH?: string;
  deliveryOptionDeliveryCharge: number;
  deliveryOptionEstimatedTimeEN?: string;
  deliveryOptionEstimatedTimeZH?: string;
  deliveryOptionFreeDeliveryThreshold?: number;
  deliveryOptionApplyThresholdBeforeCoupons: boolean;
  deliveryOptionDeliveryProviderEN?: string;
  deliveryOptionDeliveryProviderZH?: string;

  // refund
  applicationForRefund: boolean;
  refundReason?: string;
  refundImages: Image[];

  // status
  status: OrderStatus;
  statusHistories: StatusHistory[];
  isPaid?: boolean;

  // timestamp
  createdAt: number;
  updatedAt: number;
  paidAt?: number;

  // stripe related
  chargeInfo?: Stripe.Charge;
  chargeId?: string;
  amountCaptured?: number;
  amountCapturedCurrent?: string;
  paymentIntentId?: string;
  paymentMethodId?: string;
  paymentMethodDetails?: Stripe.Charge.PaymentMethodDetails | null;
  stripeRefunds?: Stripe.Refund[];
}
