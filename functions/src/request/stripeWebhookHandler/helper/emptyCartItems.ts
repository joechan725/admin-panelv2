import * as admin from 'firebase-admin';
import { BigBatch } from '../../../classes/BigBatch';
const db = admin.firestore();

/**
 * Remove all cart items at sub-collection in a given user document
 *
 * @param userId - The user id
 */

export const emptyCartItems = async (userId: string) => {
  try {
    const cartItemsRef = db.collection('users').doc(userId).collection('cartItems');

    const cartItemSnap = await cartItemsRef.get();

    const bigBatch = new BigBatch(db);

    cartItemSnap.forEach((snap) => {
      bigBatch.delete(snap.ref);
    });

    await bigBatch.commit();
  } catch (error) {
    console.error("Failed emptied user's cart items");
  }
};
