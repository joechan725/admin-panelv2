import { db } from '@/firebase/config';
import { generateFakeCoupon } from './generateFakeCoupon';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeCoupons = async (numberOfCoupons: number) => {
  const couponsRef = collection(db, '/coupons');
  for (let i = 0; i < numberOfCoupons; i++) {
    const coupon = generateFakeCoupon();
    await addDoc(couponsRef, coupon);
    console.log(`Create Fake Coupons ${i + 1}/${numberOfCoupons}`);
  }
};
