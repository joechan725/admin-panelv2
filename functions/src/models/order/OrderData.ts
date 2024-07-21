import { Timestamp } from 'firebase-admin/firestore';
import { Order } from './Order';
import { StatusHistoryData } from './StatusHistoryData';
import { CouponUsedData } from '../coupon/CouponUsedData';

export interface OrderData
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'paidAt' | 'couponsUsed' | 'statusHistories'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
  statusHistories: StatusHistoryData[];
  couponsUsed: (CouponUsedData & { id: string })[];
}
