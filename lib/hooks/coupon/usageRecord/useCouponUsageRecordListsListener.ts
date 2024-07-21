import { db } from '@/firebase/config';
import { couponUsageRecordListConverter } from '@/firebase/converter/coupon/usageRecord/couponUsageRecordListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { CouponUsageRecord } from '@/models/coupon/usageRecord/CouponUsageRecord';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useCouponUsageRecordListsListener = (couponId: string) => {
  const [couponUsageRecords, setCouponUsageRecords] = useState<CouponUsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const couponUsageRecordListsRef = collection(db, `/coupons/${couponId}/usageRecordLists`).withConverter(
      couponUsageRecordListConverter
    );

    const unsubscribe = onSnapshot(
      couponUsageRecordListsRef,
      (snapshot) => {
        const couponUsageRecordListsData = snapshot.docs.map((doc) => doc.data());
        const couponUsageRecordData = couponUsageRecordListsData.flat();

        const sortedData = sortObjectsByKey(couponUsageRecordData, 'updatedAt', 'desc');

        setCouponUsageRecords(sortedData);
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

  return { couponUsageRecords, isLoading, error };
};
