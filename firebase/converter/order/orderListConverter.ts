import { CouponUsed } from '@/models/coupon/CouponUsed';
import { Order } from '@/models/order/Order';
import { StatusHistory } from '@/models/order/StatusHistory';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface OrderData
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'paidAt' | 'couponsUsed' | 'statusHistories'> {
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

interface OrderListData {
  orders: (OrderData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const orderListConverter = {
  toFirestore: (orders: Order[]): DocumentData => {
    return orders;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Order[] => {
    const orderListData = snapshot.data(options) as OrderListData;

    const ordersData = orderListData.orders;

    const orders: Order[] = ordersData.map((orderData): Order => {
      const statusHistories = orderData.statusHistories.map(
        (historyData): StatusHistory => ({
          ...historyData,
          createdAt: historyData.createdAt.toMillis(),
          updatedAt: historyData.updatedAt.toMillis(),
        })
      );

      const couponsUsed = orderData.couponsUsed.map(
        (couponUsedData): CouponUsed => ({
          ...couponUsedData,
          createdAt: couponUsedData.createdAt.toMillis(),
          updatedAt: couponUsedData.updatedAt.toMillis(),
          startDate: couponUsedData.startDate?.toMillis(),
          endDate: couponUsedData.endDate?.toMillis(),
        })
      );

      return {
        ...orderData,
        statusHistories,
        couponsUsed,
        createdAt: orderData.createdAt.toMillis(),
        updatedAt: orderData.updatedAt.toMillis(),
        paidAt: orderData.paidAt?.toMillis(),
      };
    });

    return orders;
  },
};
