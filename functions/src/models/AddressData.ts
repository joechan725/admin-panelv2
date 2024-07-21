import { Timestamp } from 'firebase-admin/firestore';
import { Address } from './Address';

export interface AddressData extends Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
