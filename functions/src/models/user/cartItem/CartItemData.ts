import { Timestamp } from 'firebase-admin/firestore';
import { CartItem } from './CartItem';

export interface CartItemData extends Omit<CartItem, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
