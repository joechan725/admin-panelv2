import { Timestamp } from 'firebase-admin/firestore';
import { PrivateCouponData } from './PrivateCouponData';

export interface PrivateCouponListData {
  coupons: (PrivateCouponData & { id: string })[];
  ids: string[];
  codes: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
