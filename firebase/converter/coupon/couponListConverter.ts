import { Coupon } from '@/models/coupon/Coupon';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface CouponData extends Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'deletedAt'> {
  startDate?: Timestamp;
  endDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

interface CouponListData {
  coupons: (CouponData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const couponListConverter = {
  toFirestore: (couponList: Coupon[]): DocumentData => {
    return couponList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Coupon[] => {
    const couponListData = snapshot.data(options) as CouponListData;

    const couponsData = couponListData.coupons;

    const coupons: Coupon[] = couponsData.map(
      (couponData): Coupon => ({
        ...couponData,
        createdAt: couponData.createdAt.toMillis(),
        updatedAt: couponData.updatedAt.toMillis(),
        startDate: couponData.startDate?.toMillis(),
        endDate: couponData.endDate?.toMillis(),
        deletedAt: couponData.deletedAt?.toMillis(),
      })
    );

    return coupons;
  },
};
