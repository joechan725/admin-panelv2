import { Timestamp } from 'firebase-admin/firestore';
import { CouponUsageRecord } from './CouponUsageRecord';

export interface CouponUsageRecordData
  extends Omit<CouponUsageRecord, 'id' | 'usedAt' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  // timestamp
  usedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
