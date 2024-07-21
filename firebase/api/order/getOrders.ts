import { db } from '@/firebase/config';
import { orderConverter } from '@/firebase/converter/order/orderConverter';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export const getOrders = async (userId?: string) => {
  // prepare
  const ordersRef = collection(db, 'orders').withConverter(orderConverter);
  let ordersQuery = query(ordersRef, orderBy('updatedAt', 'desc'));

  // specified if a user id is passed.
  if (userId) {
    ordersQuery = query(ordersQuery, where('userId', '==', userId));
  }

  // get
  const ordersSnap = await getDocs(ordersQuery);
  const orders = ordersSnap.docs.map((doc) => doc.data());

  // return the data
  return orders;
};
