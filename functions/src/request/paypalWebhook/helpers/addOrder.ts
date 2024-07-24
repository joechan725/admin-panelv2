import * as admin from 'firebase-admin';

import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { StatusHistoryData } from '../../../models/order/StatusHistoryData';
import { OrderData } from '../../../models/order/OrderData';
import { addComments } from './addComments';

interface AddOrderParameters {
  pendingOrderId: string;
  pendingOrderData: OrderData;
  createdAtDataString: string;
  amountCaptured: string;
  amountCapturedCurrent: string;
}

const db = admin.firestore();

export const addOrder = async ({
  pendingOrderId,
  pendingOrderData,
  createdAtDataString,
  amountCaptured,
  amountCapturedCurrent,
}: AddOrderParameters) => {
  const newStatusHistory: StatusHistoryData = {
    id: crypto.randomUUID(),
    status: 'Paid',
    createdAt: Timestamp.fromDate(new Date(createdAtDataString)),
    updatedAt: Timestamp.fromDate(new Date(createdAtDataString)),
  };

  const newStatusHistories = [...pendingOrderData.statusHistories, newStatusHistory];

  try {
    // add comments for each order items
    const orderItems = await addComments({ pendingOrderData, pendingOrderId });

    // create the order
    const newOrder: ExtendWithFieldValue<OrderData> = {
      ...pendingOrderData,
      orderItems: orderItems,
      status: 'Paid',
      isPaid: true,
      updatedAt: FieldValue.serverTimestamp(),
      paidAt: Timestamp.fromDate(new Date(createdAtDataString)),
      statusHistories: newStatusHistories,
      amountCaptured: +amountCaptured,
      amountCapturedCurrent: amountCapturedCurrent,
    };

    // prepare
    const orderRef = db.collection('orders').doc(pendingOrderId);

    // update
    await orderRef.set(newOrder);
  } catch (error) {
    throw new Error('Failed added order');
  }
};
