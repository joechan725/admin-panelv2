import { StatusHistory } from '@/models/order/StatusHistory';
import { Order } from '@/models/order/Order';
import { SnapshotOptions, Timestamp, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { CouponUsed } from '@/models/coupon/CouponUsed';

interface OrderData
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'paidAt' | 'user' | 'couponsUsed' | 'statusHistories'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
  statusHistories: StatusHistoryData[];
  couponsUsed: CouponUsedData[];
}

interface StatusHistoryData extends Omit<StatusHistory, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface CouponUsedData extends Omit<CouponUsed, 'updatedAt' | 'createdAt' | 'startDate' | 'endDate'> {
  updatedAt: Timestamp;
  createdAt: Timestamp;
  startDate?: Timestamp;
  endDate?: Timestamp;
}

export const orderConverter = {
  toFirestore: (order: Order): DocumentData => {
    return order;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Order => {
    const orderData = snapshot.data(options) as OrderData;

    const statusHistories = orderData.statusHistories.map(
      (historyData): StatusHistory => ({
        ...historyData,
        createdAt: historyData.createdAt?.toMillis(),
        updatedAt: historyData.updatedAt?.toMillis(),
      })
    );

    const couponsUsed = orderData.couponsUsed.map(
      (couponUsedData): CouponUsed => ({
        ...couponUsedData,
        createdAt: couponUsedData.createdAt?.toMillis(),
        updatedAt: couponUsedData.updatedAt?.toMillis(),
        startDate: couponUsedData.startDate?.toMillis(),
        endDate: couponUsedData.endDate?.toMillis(),
      })
    );

    return {
      ...orderData,
      id: snapshot.id,
      statusHistories,
      couponsUsed,
      createdAt: orderData.createdAt?.toMillis(),
      updatedAt: orderData.updatedAt?.toMillis(),
      paidAt: orderData.paidAt?.toMillis(),
    };
  },
};
