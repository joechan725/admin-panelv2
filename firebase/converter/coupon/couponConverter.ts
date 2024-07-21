import { Coupon } from '@/models/coupon/Coupon';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface CouponData extends Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'deletedAt'> {
  startDate?: Timestamp;
  endDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

export const couponConverter = {
  toFirestore: (coupon: Coupon): DocumentData => {
    return coupon;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Coupon => {
    const couponData = snapshot.data(options) as CouponData;

    return {
      ...couponData,
      id: snapshot.id,
      startDate: couponData.startDate?.toMillis(),
      endDate: couponData.endDate?.toMillis(),
      createdAt: couponData.createdAt.toMillis(),
      updatedAt: couponData.updatedAt.toMillis(),
      deletedAt: couponData.deletedAt?.toMillis(),
    };
  },
};
