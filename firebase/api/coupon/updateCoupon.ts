import { doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Coupon } from '@/models/coupon/Coupon';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';

export interface UpdateCouponFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<Coupon, 'createdAt' | 'updatedAt' | 'id' | 'startDate' | 'endDate'>>> {
  updatedAt: FieldValue;
  startDate?: Date | FieldValue;
  endDate?: Date | FieldValue;
}

interface UpdateCouponParameters {
  couponId: string;
  couponFirestoreData: UpdateCouponFirestoreData;
}

export const updateCoupon = async ({ couponId, couponFirestoreData }: UpdateCouponParameters) => {
  // Prepare
  const couponRef = doc(db, `/coupons/${couponId}`);

  const updatedCoupon = {
    ...couponFirestoreData,
  };

  // Update the smart bar
  await updateDoc(couponRef, updatedCoupon);
};
