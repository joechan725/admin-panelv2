import { Timestamp } from 'firebase-admin/firestore';
import { PrivateCollection } from './PrivateCollection';

export interface PrivateCollectionData extends Omit<PrivateCollection, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
