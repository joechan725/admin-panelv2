import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { privateDeliveryOptionListConverter } from '@/firebase/converter/deliveryOption/privateDeliveryOptionListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const usePrivateDeliveryOptionListsListener = () => {
  const [privateDeliveryOptions, setPrivateDeliveryOptions] = useState<PrivateDeliveryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const privateDeliveryOptionListsRef = collection(db, 'privateDeliveryOptionLists').withConverter(
      privateDeliveryOptionListConverter
    );
    const privateDeliveryOptionListsQuery = query(privateDeliveryOptionListsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      privateDeliveryOptionListsQuery,
      (snapshot) => {
        const privateDeliveryOptionsListsData = snapshot.docs.map((doc) => doc.data());
        const privateDeliveryOptionsData = privateDeliveryOptionsListsData.flat();

        const sortedDeliveryOptionsData = sortObjectsByKey(privateDeliveryOptionsData, 'updatedAt', 'desc');

        setPrivateDeliveryOptions(sortedDeliveryOptionsData);
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
    privateDeliveryOptions,
    isLoading,
    error,
  };
};
