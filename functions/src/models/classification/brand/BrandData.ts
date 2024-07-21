import { Timestamp } from 'firebase-admin/firestore';
import { Brand } from './Brand';

export interface BrandData extends Omit<Brand, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
