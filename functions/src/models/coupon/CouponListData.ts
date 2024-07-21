import { Timestamp } from 'firebase-admin/firestore';
import { CouponData } from './CouponData';

export interface CouponListData {
  coupons: (CouponData & { id: string })[];
  ids: string[];
  codes: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
