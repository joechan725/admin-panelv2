import { db } from '@/firebase/config';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { doc, FieldValue, serverTimestamp, setDoc } from 'firebase/firestore';

interface UpdateCartItemParameters {
  userId: string;
  quantity: number;
  cartItemId: string;
}

interface CartItemData extends Partial<Omit<CartItem, 'id' | 'updatedAt'>> {
  updatedAt: FieldValue;
}

export const updateCartItemQuantity = async ({ userId, quantity, cartItemId }: UpdateCartItemParameters) => {
  const cartItem: CartItemData = {
    quantity: quantity,
    updatedAt: serverTimestamp(),
  };

  const cartItemRef = doc(db, `users/${userId}/cartItems/${cartItemId}`);

  await setDoc(cartItemRef, cartItem, { merge: true });
};
