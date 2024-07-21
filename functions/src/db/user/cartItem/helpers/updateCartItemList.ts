import { FieldValue } from 'firebase-admin/firestore';
import { CartItemData } from '../../../../models/user/cartItem/CartItemData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCartItemListParameter {
  userId: string;
  cartItemId: string;
  mode: 'create' | 'update' | 'delete';
  cartItemData: CartItemData;
}

/**
 * Update the cartItemList in user list sub-collection
 * and cartItemCount in the user documents
 *
 * @param userId - The id of user
 * @param cartItemId - The id of cartItem
 * @param cartItemData - The firestore cartItem data
 * @param mode - 'create' | 'update' | 'delete'
 *
 * @returns The promise of void
 */

export const updateCartItemList = async ({ userId, cartItemId, mode, cartItemData }: UpdateCartItemListParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    const cartItemListRef = db.collection('users').doc(userId).collection('lists').doc('userStoredList');

    const objectKey = `cartItem_${cartItemId}`;

    if (mode === 'create') {
      bigBatch.set(cartItemListRef, { [objectKey]: cartItemData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(cartItemListRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(cartItemListRef, { [objectKey]: cartItemData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(cartItemListRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating cart item list', error);
  }
};
