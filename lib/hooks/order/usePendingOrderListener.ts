import { Order } from '@/models/order/Order';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { orderConverter } from '@/firebase/converter/order/orderConverter';

export const usePendingOrderListener = (pendingOrderId: string) => {
  const [pendingOrder, setPendingOrder] = useState<Order | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const pendingOrderRef = doc(db, `/pendingOrders/${pendingOrderId}`).withConverter(orderConverter);
    const unsubscribe = onSnapshot(
      pendingOrderRef,
      (snapshot) => {
        const pendingOrderData = snapshot.data();
        setPendingOrder(pendingOrderData);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        if (error instanceof Error) {
          if (error.message.includes('Null value error')) {
            setError('orderNotFound');
            setIsLoading(false);
            return;
          }
          if (
            error.message.toLowerCase().includes('admin is undefined') ||
            error.message.toLowerCase().includes('false')
          ) {
            setError('orderNoPermission');
            setIsLoading(false);
            return;
          }
        }
        setError('unexpectedError');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [pendingOrderId]);

  return {
    pendingOrder,
    isLoading,
    error,
  };
};
