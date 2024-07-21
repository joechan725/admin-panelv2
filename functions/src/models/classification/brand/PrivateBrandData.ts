import { Timestamp } from 'firebase-admin/firestore';
import { PrivateBrand } from './PrivateBrand';

export interface PrivateBrandData extends Omit<PrivateBrand, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
