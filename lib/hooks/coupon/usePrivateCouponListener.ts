import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { privateCouponConverter } from '@/firebase/converter/coupon/privateCouponConverter';

export const usePrivateCouponListener = (couponId: string) => {
  const [privateCoupon, setPrivateCoupon] = useState<PrivateCoupon | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const privateCouponListRef = doc(db, `/coupons/${couponId}`).withConverter(privateCouponConverter);
    const unsubscribe = onSnapshot(
      privateCouponListRef,
      (snapshot) => {
        const privateCouponData = snapshot.data();
        setPrivateCoupon(privateCouponData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [couponId]);

  return {
    privateCoupon,
    isLoading,
    error,
  };
};
