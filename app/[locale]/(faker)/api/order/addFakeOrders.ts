import { db } from '@/firebase/config';
import { generateFakeOrder } from './generateFakeOrder';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getUsers } from '@/firebase/api/user/getUsers';
import { getDeliveryOptions } from '@/firebase/api/deliveryOption/getDeliveryOptions';
import { getProducts } from '@/firebase/api/product/getProducts';
import { getCoupons } from '@/firebase/api/coupon/getCoupons';

export const addFakeOrders = async (numberOfOrders: number) => {
  const users = await getUsers();
  const products = await getProducts();
  const deliveryOptions = await getDeliveryOptions({ isPublicOnly: true });
  const coupons = await getCoupons();

  const ids: { productId: string; commentId?: string; orderId: string }[] = [];

  for (let i = 0; i < numberOfOrders; i++) {
    const orderId = crypto.randomUUID();
    const orderRef = doc(db, `/orders/${orderId}`);
    const order = await generateFakeOrder({ users, deliveryOptions, products, coupons, orderId });
    await setDoc(orderRef, order);
    console.log(`Create Fake Orders ${i + 1}/${numberOfOrders}`);
    order.orderItems.forEach((orderItem) => {
      const { productId, commentId } = orderItem;
      ids.push({ productId, commentId, orderId });
    });
  }

  return ids;
};
