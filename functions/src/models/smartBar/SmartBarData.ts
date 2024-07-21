import { Timestamp } from 'firebase-admin/firestore';
import { SmartBar } from './SmartBar';

export interface SmartBarData extends Omit<SmartBar, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
