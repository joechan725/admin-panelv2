import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface PrivateCouponData
  extends Omit<PrivateCoupon, 'id' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'deletedAt'> {
  startDate?: Timestamp;
  endDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

interface PrivateCouponListData {
  coupons: (PrivateCouponData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const privateCouponListConverter = {
  toFirestore: (privateCouponList: PrivateCoupon[]): DocumentData => {
    return privateCouponList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateCoupon[] => {
    const privateCouponListData = snapshot.data(options) as PrivateCouponListData;

    const couponsData = privateCouponListData.coupons;

    const privateCoupons: PrivateCoupon[] = couponsData.map((couponData): PrivateCoupon => {
      return {
        ...couponData,
        createdAt: couponData.createdAt.toMillis(),
        updatedAt: couponData.updatedAt.toMillis(),
        startDate: couponData.startDate?.toMillis(),
        endDate: couponData.endDate?.toMillis(),
        deletedAt: couponData.deletedAt?.toMillis(),
      };
    });

    return privateCoupons;
  },
};
