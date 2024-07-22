import { Image } from '../Image';
import { Reply } from '../reply/Reply';

export interface Comment {
  id: string;
  orderId: string;
  productId: string;
  productNameZH: string;
  productNameEN: string;
  productDescriptionZH?: string;
  productDescriptionEN?: string;
  productImage?: Image;
  boughtQuantity: number;
  userId: string;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userAvatar?: Image;
  userRole: 'anonymous' | 'user' | 'admin';
  title: string;
  content: string;
  images: Image[];
  rating: 1 | 2 | 3 | 4 | 5;

  published: boolean;

  replies?: Reply[];

  // Timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
