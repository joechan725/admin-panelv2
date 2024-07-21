import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { privateCouponListConverter } from '@/firebase/converter/coupon/privateCouponListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const usePrivateCouponListsListener = () => {
  const [privateCoupons, setPrivateCoupons] = useState<PrivateCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const privateCouponListsRef = collection(db, '/privateCouponLists').withConverter(privateCouponListConverter);
    const privateCouponListsQuery = query(privateCouponListsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      privateCouponListsQuery,
      (snapshot) => {
        const privateCouponsListsData = snapshot.docs.map((doc) => doc.data());
        const privateCouponsData = privateCouponsListsData.flat();

        const sortedCouponsData = sortObjectsByKey(privateCouponsData, 'updatedAt', 'desc');

        setPrivateCoupons(sortedCouponsData);
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
  }, []);

  return {
    privateCoupons,
    isLoading,
    error,
  };
};
