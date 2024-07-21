import { Timestamp } from 'firebase-admin/firestore';
import { CouponUsageRecordData } from './CouponUsageRecordData';

export interface CouponUsageRecordListData {
  couponUsageRecords: (CouponUsageRecordData & { id: string })[];
  ids: string[];
  userIds: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
