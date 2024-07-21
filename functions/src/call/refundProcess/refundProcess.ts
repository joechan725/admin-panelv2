import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { Order } from '../../models/order/Order';
import { OrderData } from '../../models/order/OrderData';
import { convertOrderData } from '../../lib/converters/convertOrderData';
import { stripe } from '../../stripe/config';
import { StatusHistoryData } from '../../models/order/StatusHistoryData';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../types/ExtendWithFieldValue';
import Stripe from 'stripe';
import { removeEmptyFieldFormObject } from '../../lib/helpers/object/removeEmptyFieldFormObject';
import { db } from '../../admin';
import { logger } from 'firebase-functions/v1';

interface Request {
  orderId: string;
  amount: number | 'all';
  order?: Order;
  message?: string;
  referenceUrl?: string;
  referenceNumber?: string;
}

interface Response {
  success: boolean;
  refund: Stripe.Refund;
}

export const refundProcess = onCall<Request, Promise<Response>>(async (request) => {
  try {
    const { data, auth } = request;

    if (!auth?.token.admin) {
      throw new HttpsError('permission-denied', 'Only admins can make refund process.');
    }

    let { orderId, amount, order, message, referenceNumber, referenceUrl } = data;

    if (!orderId) {
      throw new HttpsError('invalid-argument', 'The function must be called with "orderId".');
    }

    if (!amount || (amount !== 'all' && typeof amount !== 'number')) {
      throw new HttpsError('invalid-argument', "Amount shall be 'all' or number");
    }

    // Fetch the order doc if order is not passed into function
    const orderRef = db.collection('orders').doc(orderId);
    if (!order) {
      const orderDoc = await orderRef.get();
      const orderData = orderDoc.data() as OrderData | undefined;
      if (!orderData) {
        throw new HttpsError('not-found', 'Order not found');
      }
      order = convertOrderData({ orderData, orderId });
    }

    const paymentIntentId = order.paymentIntentId;

    if (!paymentIntentId) {
      throw new HttpsError('invalid-argument', 'Invalid payment intent ID');
    }

    // Retrieve the payment intent to get the total amount charged
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const amountReceived = paymentIntent.amount_received;

    // Determine the refund amount
    const refundAmount = amount === 'all' ? amountReceived : amount * 100;
    // The amount were in dollar, but the refund amount to be in cents
    if (refundAmount > amountReceived) {
      throw new HttpsError('invalid-argument', 'Refund amount cannot be greater than the total amount received.');
    }

    // Process the refund with Stripe
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: refundAmount, // Amount in cents
      metadata: {
        orderId,
      },
    });

    if (refund.status === 'failed') {
      throw new HttpsError('internal', 'The refund is failed.');
    }
    if (refund.status === 'canceled') {
      throw new HttpsError('internal', 'The refund is canceled.');
    }
    if (refund.status === 'requires_action') {
      throw new HttpsError('internal', 'Further action is required for refund.');
    }

    const status: StatusHistoryData['status'] =
      refund.status === 'succeeded'
        ? 'Refunded'
        : refund.status === 'pending'
        ? 'Refund Pending'
        : refund.status === 'failed'
        ? 'Refund Failed'
        : 'Refund Cancelled';

    // Update the order document with the refund details
    const statusHistoryData: StatusHistoryData = removeEmptyFieldFormObject({
      id: crypto.randomUUID(),
      status,
      stripeRefund: refund,
      message,
      referenceNumber,
      referenceUrl,
      createdAt: Timestamp.fromMillis(refund.created * 1000),
      updatedAt: Timestamp.fromMillis(refund.created * 1000),
    });

    const orderData: Partial<ExtendWithFieldValue<Order>> = {
      status,
      amountRefunded: FieldValue.arrayUnion(refundAmount / 100),
      statusHistories: FieldValue.arrayUnion(statusHistoryData),
      stripeRefunds: FieldValue.arrayUnion(refund),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await orderRef.set(orderData, { merge: true });

    return { success: true, refund };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw new HttpsError(error.code, error.message);
    }
    logger.error('Error on processing refund', error);
    throw new HttpsError('internal', 'Unexpected error. Please try again later.');
  }
});
