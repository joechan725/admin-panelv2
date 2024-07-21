import { Order } from '@/models/order/Order';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { orderListConverter } from '@/firebase/converter/order/orderListConverter';
import { useSessionStore } from '@/stores/useSessionStore';

export const useUserOrderListsListener = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useSessionStore((state) => ({ user: state.user }));

  useEffect(() => {
    if (!user) {
      return;
    }

    const userId = user.id;
    const userOrderListsRef = collection(db, `/users/${userId}/orderLists`).withConverter(orderListConverter);
    const unsubscribe = onSnapshot(
      userOrderListsRef,
      (snapshot) => {
        const orderListsData = snapshot.docs.map((doc) => doc.data());
        const ordersData = orderListsData.flat();
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
  }, [user]);

  return { orders, isLoading, error };
};
