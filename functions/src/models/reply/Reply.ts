import { Image } from '../Image';

export interface Reply {
  id: string;
  productId: string;
  commentId: string;
  userId: string;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userAvatar?: Image;
  userRole: 'anonymous' | 'user' | 'admin';
  title: string;
  content: string;
  images: Image[];

  // Timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
