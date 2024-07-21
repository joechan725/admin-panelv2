import { Image } from '../../Image';

export interface DeliveryOptionUsageRecord {
  id: string;

  // delivery option information
  deliveryOptionId: string;
  deliveryOptionNameZH: string;
  deliveryOptionNameEN: string;
  deliveryOptionDescriptionZH?: string;
  deliveryOptionDescriptionEN?: string;
  deliveryOptionDeliveryCharge: number;
  deliveryOptionFreeDeliveryThreshold?: number;

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

  // order - deliveryOptions information
  deliveryChargeAtThisOrder: number;

  // timestamp
  orderedAt: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
