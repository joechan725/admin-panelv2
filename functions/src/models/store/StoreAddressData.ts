import { Timestamp } from 'firebase-admin/firestore';
import { StoreAddress } from './StoreAddress';

export interface StoreAddressData extends Omit<StoreAddress, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
