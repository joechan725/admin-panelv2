import { Timestamp } from 'firebase-admin/firestore';
import { PrivateCategory } from './PrivateCategory';

export interface PrivateCategoryData extends Omit<PrivateCategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
