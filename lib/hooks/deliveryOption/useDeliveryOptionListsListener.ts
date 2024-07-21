import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { deliveryOptionListConverter } from '@/firebase/converter/deliveryOption/deliveryOptionListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const useDeliveryOptionListsListener = () => {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const deliveryOptionListsRef = collection(db, 'deliveryOptionLists').withConverter(deliveryOptionListConverter);
    const deliveryOptionListsQuery = query(deliveryOptionListsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      deliveryOptionListsQuery,
      (snapshot) => {
        const deliveryOptionsListData = snapshot.docs.map((doc) => doc.data());
        const deliveryOptionsData = deliveryOptionsListData.flat();

        const sortedDeliveryOptionsData = sortObjectsByKey(deliveryOptionsData, 'updatedAt', 'desc');

        setDeliveryOptions(sortedDeliveryOptionsData);
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
    deliveryOptions,
    isLoading,
    error,
  };
};
