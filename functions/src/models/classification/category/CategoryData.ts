import { Timestamp } from 'firebase-admin/firestore';
import { Category } from './Category';

export interface CategoryData extends Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
