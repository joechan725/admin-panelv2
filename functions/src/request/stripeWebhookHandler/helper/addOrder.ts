import * as admin from 'firebase-admin';

import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import Stripe from 'stripe';
import { StatusHistoryData } from '../../../models/order/StatusHistoryData';
import { OrderData } from '../../../models/order/OrderData';
import { addComments } from './addComments';

interface AddOrderParameters {
  pendingOrderId: string;
  pendingOrderData: OrderData;
  charge: Stripe.Charge;
}

const db = admin.firestore();

export const addOrder = async ({ pendingOrderId, pendingOrderData, charge }: AddOrderParameters) => {
  const newStatusHistory: StatusHistoryData = {
    id: crypto.randomUUID(),
    status: 'Paid',
    createdAt: Timestamp.fromMillis(charge.created * 1000),
    updatedAt: Timestamp.fromMillis(charge.created * 1000),
  };

  const newStatusHistories = [...pendingOrderData.statusHistories, newStatusHistory];

  try {
    // add comments for each order items
    const orderItems = await addComments({ pendingOrderData });

    // create the order
    const newOrder: ExtendWithFieldValue<OrderData> = {
      ...pendingOrderData,
      orderItems: orderItems,
      status: 'Paid',
      isPaid: true,
      chargeInfo: charge,
      chargeId: charge.id,
      updatedAt: FieldValue.serverTimestamp(),
      paidAt: Timestamp.fromMillis(charge.created * 1000),
      statusHistories: newStatusHistories,
      amountCaptured: charge.amount_captured / 100,
      amountCapturedCurrent: charge.currency,
      paymentIntentId: charge.payment_intent?.toString(),
      paymentMethodId: charge.payment_method?.toString(),
      paymentMethodDetails: charge.payment_method_details,
    };

    // prepare
    const orderRef = db.collection('orders').doc(pendingOrderId);

    // update
    await orderRef.set(newOrder);
  } catch (error) {
    throw new Error('Failed added order');
  }
};
