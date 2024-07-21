import { Timestamp } from 'firebase-admin/firestore';
import { PrivateProduct } from './PrivateProduct';

export interface PrivateProductData extends Omit<PrivateProduct, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
