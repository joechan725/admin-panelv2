import { db } from '@/firebase/config';
import { couponConverter } from '@/firebase/converter/coupon/couponConverter';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface GetCouponsProps {
  code: string;
}

export const getCouponByCode = async ({ code }: GetCouponsProps) => {
  const couponsRef = collection(db, `coupons`).withConverter(couponConverter);

  const couponsQuery = query(couponsRef, where('code', '==', code));

  const couponsSnap = await getDocs(couponsQuery);

  const coupon = couponsSnap.docs.at(0)?.data();

  return coupon;
};
