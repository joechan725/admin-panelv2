import * as admin from 'firebase-admin';
import Stripe from 'stripe';
import { StatusHistoryData } from '../../../models/order/StatusHistoryData';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { Order } from '../../../models/order/Order';

interface HandleRefundUpdateParameters {
  refund: Stripe.Refund;
}

const db = admin.firestore();

export const handleRefundUpdate = async ({ refund }: HandleRefundUpdateParameters) => {
  if (refund.status !== 'succeeded' && refund.status !== 'failed' && refund.status !== 'canceled') {
    return;
  }
  const orderId = refund.metadata?.orderId as string;

  // Fetch the order document based on the refund ID or payment intent ID
  const orderRef = db.collection('orders').doc(orderId);

  const status =
    refund.status === 'succeeded' ? 'Refunded' : refund.status === 'failed' ? 'Refund Failed' : 'Refund Cancelled';

  // Update the order document with the refund details
  const statusHistoryData: StatusHistoryData = {
    id: crypto.randomUUID(),
    status,
    stripeRefund: refund,
    createdAt: Timestamp.fromMillis(refund.created * 1000),
    updatedAt: Timestamp.fromMillis(refund.created * 1000),
  };

  const orderData: Partial<ExtendWithFieldValue<Order>> = {
    status,
    statusHistories: FieldValue.arrayUnion(statusHistoryData),
    updatedAt: FieldValue.serverTimestamp(),
    stripeRefunds: FieldValue.arrayUnion(refund),
  };

  // Update the order document with the new refund status
  await orderRef.set(orderData, { merge: true });
};
