import { Timestamp } from 'firebase-admin/firestore';
import { PrivateCoupon } from './PrivateCoupon';

export interface PrivateCouponData
  extends Omit<
    PrivateCoupon,
    'id' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'deletedAt' | 'usageRecords'
  > {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  deletedAt?: Timestamp;
}
