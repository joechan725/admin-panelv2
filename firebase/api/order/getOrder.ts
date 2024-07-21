import { db } from '@/firebase/config';
import { orderConverter } from '@/firebase/converter/order/orderConverter';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';

export const getOrder = async (orderId: string) => {
  // prepare
  const orderRef = doc(db, `orders/${orderId}`).withConverter(orderConverter);

  // get
  const orderSnap = await getDoc(orderRef);

  // return
  const orderData = orderSnap.data();
  return orderData;
};
