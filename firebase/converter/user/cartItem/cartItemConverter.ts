import { CartItem } from '@/models/user/cartItem/CartItem';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface CartItemData extends Omit<CartItem, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const cartItemConverter = {
  toFirestore: (cartItem: CartItem) => {
    return cartItem;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CartItem => {
    const cartItem = snapshot.data(options) as CartItemData;
    const { createdAt, updatedAt } = cartItem;
    return {
      ...cartItem,
      id: snapshot.id,
      createdAt: createdAt.toMillis(),
      updatedAt: updatedAt.toMillis(),
    };
  },
};
