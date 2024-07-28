import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { StatusHistoryData } from '../../../models/order/StatusHistoryData';
import { OrderData } from '../../../models/order/OrderData';
import { db } from '../../../admin';
import Stripe from 'stripe';

interface updatePendingOrderParameters {
  pendingOrderId: string;
  charge: Stripe.Charge;
}

export const updatePendingOrder = async ({ pendingOrderId, charge }: updatePendingOrderParameters) => {
  const newStatusHistory: StatusHistoryData = {
    id: crypto.randomUUID(),
    status: 'Paid',
    createdAt: Timestamp.fromDate(new Date(charge.created * 1000)),
    updatedAt: Timestamp.fromDate(new Date(charge.created * 1000)),
  };

  try {
    // create the order
    const updateOrder: Partial<ExtendWithFieldValue<OrderData>> = {
      status: 'Paid',
      isPaid: true,
      updatedAt: FieldValue.serverTimestamp(),
      paidAt: Timestamp.fromDate(new Date(charge.created * 1000)),
      statusHistories: FieldValue.arrayUnion(newStatusHistory),
      chargeInfo: charge,
      chargeId: charge.id,
      amountCaptured: charge.amount_captured / 100,
      amountCapturedCurrent: charge.currency,
      paymentIntentId: charge.payment_intent?.toString(),
      paymentMethodId: charge.payment_method?.toString(),
      paymentMethodDetails: charge.payment_method_details,
    };

    // prepare
    const pendingOrderRef = db.collection('pendingOrders').doc(pendingOrderId);

    // update
    await pendingOrderRef.set(updateOrder, { merge: true });
  } catch (error) {
    throw new Error('Failed update pending order');
  }
};
