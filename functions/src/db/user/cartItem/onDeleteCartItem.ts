import * as functions from 'firebase-functions';
import { updateCartItemList } from './helpers/updateCartItemList';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';

export const onDeleteCartItem = functions.firestore
  .document('users/{userId}/cartItems/{cartItemId}')
  .onDelete(async (snapshot, context) => {
    const { userId, cartItemId } = context.params;
    const cartItemData = snapshot.data() as CartItemData;

    await updateCartItemList({ cartItemId, userId, cartItemData, mode: 'delete' });
  });
