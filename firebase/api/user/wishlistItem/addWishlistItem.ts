import { db } from '@/firebase/config';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { doc, FieldValue, setDoc } from 'firebase/firestore';

interface AddWishlistItemParameters {
  newWishlistItem: AddWishlistItemFirestoreData;
  userId: string;
  productId: string;
}

export interface AddWishlistItemFirestoreData extends Omit<WishlistItem, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addWishlistItem = async ({ userId, newWishlistItem, productId }: AddWishlistItemParameters) => {
  const wishlistItemsRef = doc(db, `users/${userId}/wishlistItems/${productId}`);

  await setDoc(wishlistItemsRef, newWishlistItem, { merge: true });
};
