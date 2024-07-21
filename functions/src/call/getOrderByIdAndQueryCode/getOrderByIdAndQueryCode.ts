import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { convertOrderData } from '../../lib/converters/convertOrderData';
import { Order } from '../../models/order/Order';
import { OrderData } from '../../models/order/OrderData';
import { db } from '../../admin';
import { logger } from 'firebase-functions/v1';

interface Request {
  orderId: string;
  queryCode: string;
}

interface Response {
  order: Order;
}

export const getOrderByIdAndQueryCode = onCall<Request, Promise<Response>>(async (request) => {
  try {
    const { data } = request;
    const { orderId, queryCode } = data;

    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      throw new HttpsError(
        'not-found',
        'The order is not found. Please check your order ID or login to view you orders.'
      );
    }

    const orderData = orderSnap.data() as OrderData;

    if (orderData.queryCode !== queryCode) {
      throw new HttpsError(
        'permission-denied',
        'Incorrect query code. Please check your order ID and try again with another query code or login to view you orders.'
      );
    }

    const order = convertOrderData({ orderData, orderId: orderSnap.id });

    return { order };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw new HttpsError(error.code, error.message);
    }
    logger.error('Error on getting order by id and query code', error);
    throw new HttpsError('internal', 'Unexpected error. Please try again later.');
  }
});
