import { FieldValue } from 'firebase-admin/firestore';
import { WishlistItemData } from '../../../../models/user/wishlistItem/WishlistItemData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateWishlistItemListParameter {
  userId: string;
  wishlistItemId: string;
  mode: 'create' | 'update' | 'delete';
  wishlistItemData: WishlistItemData;
}

/**
 * Update the wishlistItemList in user list sub-collection
 * and wishlistItemCount in the user documents
 *
 * @param userId - The id of user
 * @param wishlistItemId - The id of wishlistItem
 * @param wishlistItemData - The firestore wishlistItem data
 * @param mode - 'create' | 'update' | 'delete'
 *
 * @returns The promise of void
 */

export const updateWishlistItemList = async ({
  userId,
  wishlistItemId,
  mode,
  wishlistItemData,
}: UpdateWishlistItemListParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    const wishlistItemListRef = db.collection('users').doc(userId).collection('lists').doc('userStoredList');

    const objectKey = `wishlistItem_${wishlistItemId}`;

    if (mode === 'create') {
      bigBatch.set(wishlistItemListRef, { [objectKey]: wishlistItemData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(wishlistItemListRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(wishlistItemListRef, { [objectKey]: wishlistItemData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(wishlistItemListRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating wishlist item list', error);
  }
};
