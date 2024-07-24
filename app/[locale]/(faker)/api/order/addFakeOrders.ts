import { db } from '@/firebase/config';
import { generateFakeOrder } from './generateFakeOrder';
import { addDoc, collection } from 'firebase/firestore';
import { getUsers } from '@/firebase/api/user/getUsers';
import { getDeliveryOptions } from '@/firebase/api/deliveryOption/getDeliveryOptions';
import { getProducts } from '@/firebase/api/product/getProducts';
import { getCoupons } from '@/firebase/api/coupon/getCoupons';

export const addFakeOrders = async (numberOfOrders: number) => {
  const ordersRef = collection(db, '/orders');

  const users = await getUsers();
  const products = await getProducts();
  const deliveryOptions = await getDeliveryOptions({ isPublicOnly: true });
  const coupons = await getCoupons();

  const ids: { productId: string; commentId?: string; orderId: string }[] = [];

  for (let i = 0; i < numberOfOrders; i++) {
    const order = await generateFakeOrder({ users, deliveryOptions, products, coupons });
    const res = await addDoc(ordersRef, order);
    const orderId = res.id;
    console.log(`Create Fake Orders ${i + 1}/${numberOfOrders}`);
    order.orderItems.forEach((orderItem) => {
      const { productId, commentId } = orderItem;
      ids.push({ productId, commentId, orderId });
    });
  }

  return ids;
};
