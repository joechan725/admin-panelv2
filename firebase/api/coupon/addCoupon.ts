import { addDoc, collection, FieldValue } from 'firebase/firestore';
import { db } from '../../config';
import { Coupon } from '@/models/coupon/Coupon';

export interface CreateCouponFirestoreData
  extends Omit<Coupon, 'createdAt' | 'updatedAt' | 'id' | 'usageCount' | 'usageRecords' | 'startDate' | 'endDate'> {
  startDate?: Date;
  endDate?: Date;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addCoupon = async (couponFirestoreData: CreateCouponFirestoreData) => {
  // prepare
  const couponsRef = collection(db, 'coupons');

  // Upload the new coupon
  const res = await addDoc(couponsRef, couponFirestoreData);

  // return the uploaded doc id
  const id = res.id;

  return id;
};
