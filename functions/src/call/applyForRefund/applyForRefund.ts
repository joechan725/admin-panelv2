import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { StatusHistoryData } from '../../models/order/StatusHistoryData';
import { ExtendWithFieldValue } from '../../types/ExtendWithFieldValue';
import { Order } from '../../models/order/Order';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { Image } from '../../models/Image';
import { OrderData } from '../../models/order/OrderData';
import { db } from '../../admin';
import { logger } from 'firebase-functions/v1';

interface FormData {
  refundReason: string;
}

interface Request {
  orderId: string;
  queryCode?: string;
  formData: FormData;
  images: Image[];
}

interface Response {
  success: boolean;
}

export const applyForRefund = onCall<Request, Promise<Response>>(async (request) => {
  try {
    const { data, auth } = request;
    const { formData, images, orderId, queryCode } = data;
    const { refundReason } = formData;
    const userId = auth?.uid;
    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();
    if (!orderSnap.exists) {
      throw new HttpsError('not-found', 'Order not found.');
    }
    const orderData = orderSnap.data() as OrderData;
    const isEditable =
      (userId !== undefined && orderData.userId === userId) ||
      (queryCode !== undefined && orderData.queryCode === queryCode);

    if (!isEditable) {
      throw new HttpsError('permission-denied', 'No permission to edit the order information.');
    }

    // Update the order document with the refund details
    const statusHistoryData: StatusHistoryData = {
      id: crypto.randomUUID(),
      status: 'Application for Refund',
      message: refundReason,
      images,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const updatedOrderData: Partial<ExtendWithFieldValue<Order>> = {
      status: 'Application for Refund',
      applicationForRefund: true,
      refundReason,
      refundImages: images,
      statusHistories: FieldValue.arrayUnion(statusHistoryData),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await orderRef.set(updatedOrderData, { merge: true });

    return { success: true };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw new HttpsError(error.code, error.message);
    }
    logger.error('Error on applying for refund', error);
    throw new HttpsError('internal', 'Unexpected error. Please try again later.');
  }
});
