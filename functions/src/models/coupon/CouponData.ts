import { Timestamp } from 'firebase-admin/firestore';
import { Coupon } from './Coupon';

export interface CouponData
  extends Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'startDate' | 'deletedAt' | 'endDate'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  deletedAt?: Timestamp;
}
