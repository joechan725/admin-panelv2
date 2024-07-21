import { db } from '@/firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

interface DeleteWishlistItemParameters {
  userId: string;
  wishlistItemId: string;
}

export const deleteWishlistItem = async ({ userId, wishlistItemId }: DeleteWishlistItemParameters) => {
  const wishListItemRef = doc(db, `users/${userId}/wishlistItems/${wishlistItemId}`);

  await deleteDoc(wishListItemRef);
};
