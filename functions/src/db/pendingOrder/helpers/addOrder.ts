import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue } from 'firebase-admin/firestore';
import { OrderData } from '../../../models/order/OrderData';
import { addComments } from './addComments';
import { db } from '../../../admin';

interface AddOrderParameters {
  pendingOrderId: string;
  pendingOrderData: OrderData;
}

export const addOrder = async ({ pendingOrderId, pendingOrderData }: AddOrderParameters) => {
  try {
    // add comments for each order items
    const orderItems = await addComments({ pendingOrderData, pendingOrderId });

    // create the order
    const newOrder: ExtendWithFieldValue<OrderData> = {
      ...pendingOrderData,
      orderItems: orderItems,
      updatedAt: FieldValue.serverTimestamp(),
    };

    // prepare
    const orderRef = db.collection('orders').doc(pendingOrderId);

    // update
    await orderRef.set(newOrder);
  } catch (error) {
    throw new Error('Failed added order');
  }
};
