import { db } from '@/firebase/config';
import { orderAggregatorConverter } from '@/firebase/converter/admin/orderAggregatorConverter';
import { OrderAggregator } from '@/models/admin/OrderAggregator';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useOrderAggregatorListener = () => {
  const [orderAggregator, setOrderAggregator] = useState<OrderAggregator | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const orderAggregatorRef = doc(db, 'admin/orderAggregator').withConverter(orderAggregatorConverter);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      orderAggregatorRef,
      (snapshot) => {
        const orderAggregatorData = snapshot.data();
        setOrderAggregator(orderAggregatorData);
        setIsLoading(false);
      },
      (error) => {
        setError('Unexpected error. Please try again later.');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { orderAggregator, error, isLoading };
};
