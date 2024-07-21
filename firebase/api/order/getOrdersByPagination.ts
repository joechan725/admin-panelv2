import { db } from '@/firebase/config';
import { orderConverter } from '@/firebase/converter/order/orderConverter';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';

interface GetOrdersByPaginationParameters {
  userId?: string;
  lastSnap?: QueryDocumentSnapshot;
  limitNum?: number;
}

export const getOrdersByPagination = async ({ userId, lastSnap, limitNum }: GetOrdersByPaginationParameters) => {
  // prepare
  const ordersRef = collection(db, 'orders').withConverter(orderConverter);
  let ordersQuery = query(ordersRef, orderBy('updatedAt', 'desc'));

  // specified if a user id is passed.
  if (userId) {
    ordersQuery = query(ordersQuery, where('userId', '==', userId));
  }

  // start after previous fetched.
  if (lastSnap) {
    ordersQuery = query(ordersQuery, startAfter(lastSnap));
  }

  // limit the number fetch.
  if (limitNum) {
    ordersQuery = query(ordersQuery, limit(limitNum));
  }

  // get
  const ordersSnap = await getDocs(ordersQuery);
  const orders = ordersSnap.docs.map((doc) => ({ ...doc.data() }));

  // lastSnap for next time fetching
  const nextLastSnap = ordersSnap.docs.at(-1);
  // return the data
  return { orders, nextLastSnap };
};
