import { db } from '@/firebase/config';
import { couponConverter } from '@/firebase/converter/coupon/couponConverter';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export const getCoupons = async () => {
  const couponsRef = collection(db, 'coupons').withConverter(couponConverter);
  let couponsQuery = query(couponsRef, orderBy('updatedAt', 'desc'));

  const couponsSnap = await getDocs(couponsQuery);

  const coupons = couponsSnap.docs.map((doc) => ({ ...doc.data() }));
  return coupons;
};
