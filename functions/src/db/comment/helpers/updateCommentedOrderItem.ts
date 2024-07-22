import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../admin';
import { OrderData } from '../../../models/order/OrderData';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { logger } from 'firebase-functions/v1';

interface UpdateCommentedOrderItem {
  orderId: string;
  productId: string;
}

export const updateCommentedOrderItem = async ({ orderId, productId }: UpdateCommentedOrderItem) => {
  try {
    const orderRef = db.collection('orders').doc(orderId);

    const updateOrderData: ExtendWithFieldValue<Partial<OrderData>> = {
      commentedProductIds: FieldValue.arrayUnion(productId),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await orderRef.update(updateOrderData);
  } catch (error) {
    logger.error('Error on adding commented order item', error);
  }
};
