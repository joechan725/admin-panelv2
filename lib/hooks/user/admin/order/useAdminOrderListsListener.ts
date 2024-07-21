import { db } from '@/firebase/config';
import { orderListConverter } from '@/firebase/converter/order/orderListConverter';
import { Order } from '@/models/order/Order';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useAdminOrderListsListener = (userId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const orderListRef = collection(db, `/users/${userId}/orderLists`).withConverter(orderListConverter);
    const unsubscribe = onSnapshot(
      orderListRef,
      (snapshot) => {
        const ordersListsData = snapshot.docs.map((doc) => doc.data());
        const ordersData = ordersListsData.flat();

        setOrders(ordersData);
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
  }, [userId]);

  return {
    orders,
    isLoading,
    error,
  };
};
