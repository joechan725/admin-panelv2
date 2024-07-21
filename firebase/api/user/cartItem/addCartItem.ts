import { db } from '@/firebase/config';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { doc, FieldValue, setDoc } from 'firebase/firestore';

interface AddCartItemParameters {
  newCartItem: AddCartItemFirestoreData;
  userId: string;
  productId: string;
}

export interface AddCartItemFirestoreData extends Omit<CartItem, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addCartItem = async ({ userId, newCartItem, productId }: AddCartItemParameters) => {
  const cartItemsRef = doc(db, `users/${userId}/cartItems/${productId}`);

  await setDoc(cartItemsRef, newCartItem, { merge: true });
};
