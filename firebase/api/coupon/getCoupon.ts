import { db } from '@/firebase/config';
import { couponConverter } from '@/firebase/converter/coupon/couponConverter';
import { doc, getDoc } from 'firebase/firestore';

interface GetCouponsProps {
  couponId: string;
}

export const getCoupon = async ({ couponId }: GetCouponsProps) => {
  const couponRef = doc(db, `coupons/${couponId}`).withConverter(couponConverter);

  const couponSnap = await getDoc(couponRef);

  const coupon = couponSnap.data();

  return coupon;
};
