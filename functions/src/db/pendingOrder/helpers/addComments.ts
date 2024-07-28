import { OrderItem } from '../../../models/order/OrderItem';
import { Comment } from '../../../models/comment/Comment';
import { FieldValue } from 'firebase-admin/firestore';
import { OrderData } from '../../../models/order/OrderData';
import { db } from '../../../admin';
import { BigBatch } from '../../../classes/BigBatch';

interface AddCommentsParameters {
  pendingOrderData: OrderData;
  pendingOrderId: string;
}

interface AddCommentData extends Omit<Comment, 'id' | 'rating' | 'createdAt' | 'updatedAt' | 'title' | 'content'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

/**
 * To add comments for each ordered item
 *
 * @param pendingOrderData The pending order
 * @returns The modified order items with commentId
 */

export const addComments = async ({ pendingOrderData, pendingOrderId }: AddCommentsParameters) => {
  const bigBatch = new BigBatch(db);
  const { orderItems, userId, userRole, userAvatar, userEmail, userFirstName, userLastName } = pendingOrderData;

  const orderItemsAndCommentRef = orderItems.map((orderItem) => {
    const { productId, quantity, nameZH, nameEN, descriptionZH, descriptionEN, image } = orderItem;
    const commentRef = db.collection('comments').doc();
    const commentData: AddCommentData = {
      boughtQuantity: quantity,
      orderId: pendingOrderId,
      productId,
      productNameZH: nameZH,
      productNameEN: nameEN,
      userId,
      userRole,
      userAvatar,
      userEmail,
      userFirstName,
      userLastName,
      productDescriptionEN: descriptionEN,
      productDescriptionZH: descriptionZH,
      productImage: image,
      images: [],
      published: false,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    bigBatch.create(commentRef, commentData);
    return { orderItem, commentRef };
  });

  await bigBatch.commit();

  const modifiedOrderItems = orderItemsAndCommentRef.map(
    (orderItemAndCommentRef): OrderItem => ({
      ...orderItemAndCommentRef.orderItem,
      commentId: orderItemAndCommentRef.commentRef.id,
    })
  );

  return modifiedOrderItems;
};
