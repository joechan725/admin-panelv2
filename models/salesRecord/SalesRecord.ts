import { Image } from '../Image';

export interface SalesRecord {
  id: string;
  // product information
  productId: string;
  productNameZH: string;
  productNameEN: string;
  productDescriptionZH?: string;
  productDescriptionEN?: string;
  productImage?: Image;

  // brand information
  brandId?: string;
  brandNameZH?: string;
  brandNameEN?: string;

  // category information
  categoryId?: string;
  categoryNameZH?: string;
  categoryNameEN?: string;

  // collection information
  collectionId?: string;
  collectionNameZH?: string;
  collectionNameEN?: string;

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

  // order sales
  sales: number;
  revenue: number;

  // timestamp
  soldAt: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
