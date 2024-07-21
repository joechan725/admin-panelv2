import { Timestamp } from 'firebase-admin/firestore';
import { Product } from './Product';

export interface ProductData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
