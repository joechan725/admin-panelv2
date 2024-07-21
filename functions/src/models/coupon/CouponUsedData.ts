import { Timestamp } from 'firebase-admin/firestore';
import { CouponUsed } from './CouponUsed';

export interface CouponUsedData extends Omit<CouponUsed, 'id' | 'updatedAt' | 'createdAt' | 'startDate' | 'endDate'> {
  updatedAt: Timestamp;
  createdAt: Timestamp;
  startDate?: Timestamp;
  endDate?: Timestamp;
}
