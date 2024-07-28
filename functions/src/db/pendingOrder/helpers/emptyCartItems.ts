import * as admin from 'firebase-admin';
import { BigBatch } from '../../../classes/BigBatch';
import { UserStoredListData } from '../../../models/user/UserStoredListData';
const db = admin.firestore();

/**
 * Remove all cart items at sub-collection in a given user document
 *
 * @param userId - The user id
 */

export const emptyCartItems = async (userId: string) => {
  try {
    const userStoredListRef = db.collection('users').doc(userId).collection('lists').doc('userStoredList');
    const userStoredListSnap = await userStoredListRef.get();
    const userStoredListData = userStoredListSnap.data() as UserStoredListData;

    const objectKeys = Object.keys(userStoredListData);
    const cartItemIds: string[] = [];

    objectKeys.forEach((objectKey) => {
      const [type, id] = objectKey.split('_');
      if (type === 'cartItem') {
        cartItemIds.push(id);
      }
    });

    const bigBatch = new BigBatch(db);

    cartItemIds.forEach((id) => {
      const cartItemRef = db.collection('users').doc(userId).collection('cartItems').doc(id);
      bigBatch.delete(cartItemRef);
    });

    await bigBatch.commit();
  } catch (error) {
    console.error("Failed emptying user's cart items");
  }
};
