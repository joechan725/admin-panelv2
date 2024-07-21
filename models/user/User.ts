import { UserInfo } from 'firebase/auth';
import { Image } from '../Image';

export interface User {
  id: string;

  // user information
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  gender?: 'Men' | 'Women' | 'NotWilling';
  phoneNumber?: string;
  avatar?: Image;

  // subscription
  subscribeToPromotion?: boolean;

  // session and role
  isAdmin: boolean;
  isAnonymous: boolean;
  role: 'anonymous' | 'user' | 'admin';
  emailVerified?: boolean;
  providerData?: UserInfo[];
  providerId?: string;

  // timestamp
  dateOfBirth?: number;
  createdAt: number;
  registeredAt?: number;
  updatedAt: number;
  lastLoggedInAt: number;

  // user - order statistic
  totalSpent?: number;
  orderCount?: number;
  totalDiscountAmount?: number;
  couponUsedCount?: number;
}
