import { Timestamp } from 'firebase-admin/firestore';
import { Collection } from './Collection';

export interface CollectionData extends Omit<Collection, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
