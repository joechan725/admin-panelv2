import { db } from '@/firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

interface DeleteCartItemParameters {
  userId: string;
  cartItemId: string;
}

export const deleteCartItem = async ({ userId, cartItemId }: DeleteCartItemParameters) => {
  const cartItemRef = doc(db, `users/${userId}/cartItems/${cartItemId}`);

  await deleteDoc(cartItemRef);
};
