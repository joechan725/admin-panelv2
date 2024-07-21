import { Order } from '@/models/order/Order';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { orderListConverter } from '@/firebase/converter/order/orderListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const usePrivateOrderListsListener = () => {
  const [privateOrders, setPrivateOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const privateOrderListsRef = collection(db, 'privateOrderLists').withConverter(orderListConverter);
  const privateOrderListsQuery = query(privateOrderListsRef, orderBy('createdAt', 'desc'));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      privateOrderListsQuery,
      (snapshot) => {
        const privateOrdersListsData = snapshot.docs.map((doc) => doc.data());
        const privateOrdersData = privateOrdersListsData.flat();

        const sortedOrdersData = sortObjectsByKey(privateOrdersData, 'updatedAt', 'desc');

        setPrivateOrders(sortedOrdersData);
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
    privateOrders,
    isLoading,
    error,
  };
};
