import { db } from '@/firebase/config';
import { deliveryOptionUsageRecordListConverter } from '@/firebase/converter/deliveryOption/usageRecord/deliveryOptionUsageRecordListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { DeliveryOptionUsageRecord } from '@/models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useDeliveryOptionUsageRecordListsListener = (deliveryOptionId: string) => {
  const [deliveryOptionUsageRecords, setDeliveryOptionUsageRecords] = useState<DeliveryOptionUsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const deliveryOptionUsageRecordListsRef = collection(
      db,
      `/deliveryOptions/${deliveryOptionId}/usageRecordLists`
    ).withConverter(deliveryOptionUsageRecordListConverter);

    const unsubscribe = onSnapshot(
      deliveryOptionUsageRecordListsRef,
      (snapshot) => {
        const deliveryOptionUsageRecordListsData = snapshot.docs.map((doc) => doc.data());
        const deliveryOptionUsageRecordData = deliveryOptionUsageRecordListsData.flat();

        const sortedData = sortObjectsByKey(deliveryOptionUsageRecordData, 'updatedAt', 'desc');

        setDeliveryOptionUsageRecords(sortedData);
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
  }, [deliveryOptionId]);

  return { deliveryOptionUsageRecords, isLoading, error };
};
