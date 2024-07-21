import { Timestamp } from 'firebase-admin/firestore';
import { SalesRecord } from './SalesRecord';

export interface SalesRecordData extends Omit<SalesRecord, 'id' | 'soldAt' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  soldAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
