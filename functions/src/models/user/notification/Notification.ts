import { Image } from '../../Image';

export type Notification = OrderNotification | BackInStockNotification | PromotionNotification;

type NotificationCategory = 'Order' | 'Back in Stock' | 'Promotion';

type OrderNotificationType =
  | 'user-Paid'
  | 'admin-Paid'
  | 'user-Delivering'
  | 'user-Delivered'
  | 'user-Ready for Pickup'
  | 'user-Picked Up'
  | 'user-Application for Refund'
  | 'admin-Application for Refund'
  | 'user-Refunded';

interface OrderNotification {
  id: string;
  category: NotificationCategory;
  type: OrderNotificationType;
  // For back in stock only
  productId?: undefined;
  productName?: undefined;
  // For order only
  orderId: string;
  userFullName?: string;
  totalQuantity?: number;
  amountToPay?: number;
  // For promotion only
  subject?: undefined;
  html?: undefined;
  // General field
  message?: string;
  image?: Image;
  imageType?: 'avatar' | 'image';

  // Timestamp
  createdAt: number;
  updatedAt: number;
}

interface BackInStockNotification {
  id: string;
  category: NotificationCategory;
  type: 'Back in Stock';
  // For back in stock only
  productId: string;
  productName: string;
  // For order only
  orderId?: undefined;
  userFullName?: undefined;
  totalQuantity?: undefined;
  amountToPay?: undefined;
  // For promotion only
  subject?: undefined;
  html?: undefined;
  // General field
  message?: string;
  image?: Image;
  imageType?: 'image';

  // Timestamp
  createdAt: number;
  updatedAt: number;
}

interface PromotionNotification {
  id: string;
  category: NotificationCategory;
  type: 'Promotion';
  // For back in stock only
  productId?: undefined;
  productName?: undefined;
  // For order only
  orderId?: undefined;
  userFullName?: undefined;
  totalQuantity?: undefined;
  amountToPay?: undefined;
  // For promotion only
  subject: string;
  html: string;
  // General field
  message?: string;
  image?: Image;
  imageType?: 'image';

  // Timestamp
  createdAt: number;
  updatedAt: number;
}
