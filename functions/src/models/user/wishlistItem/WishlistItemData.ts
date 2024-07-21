import { Timestamp } from 'firebase-admin/firestore';
import { WishlistItem } from './WishlistItem';

export interface WishlistItemData extends Omit<WishlistItem, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
