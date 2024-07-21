import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { privateDeliveryOptionConverter } from '@/firebase/converter/deliveryOption/privateDeliveryOptionConverter';

export const usePrivateDeliveryOptionListener = (deliveryOptionId: string) => {
  const [privateDeliveryOption, setPrivateDeliveryOption] = useState<PrivateDeliveryOption | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const privateDeliveryOptionListRef = doc(db, `deliveryOptions/${deliveryOptionId}`).withConverter(
      privateDeliveryOptionConverter
    );

    const unsubscribe = onSnapshot(
      privateDeliveryOptionListRef,
      (snapshot) => {
        const privateDeliveryOptionData = snapshot.data();
        setPrivateDeliveryOption(privateDeliveryOptionData);
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
    privateDeliveryOption,
    isLoading,
    error,
  };
};
