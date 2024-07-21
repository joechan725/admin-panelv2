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

export const privateCouponConverter = {
  toFirestore: (privateCoupon: PrivateCoupon): DocumentData => {
    return privateCoupon;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateCoupon => {
    const couponData = snapshot.data(options) as PrivateCouponData;

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
