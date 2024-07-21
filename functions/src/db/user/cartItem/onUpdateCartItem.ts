import * as functions from 'firebase-functions';
import { checkProductStock } from './helpers/checkProductStock';
import { updateCartItemList } from './helpers/updateCartItemList';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';

export const onUpdateCartItem = functions.firestore
  .document('users/{userId}/cartItems/{cartItemId}')
  .onUpdate(async (change, context) => {
    const { userId, cartItemId } = context.params;

    const cartItemSnapBefore = change.before;
    const cartItemSnapAfter = change.after;

    const cartItemDataBefore = cartItemSnapBefore.data() as CartItemData;
    const cartItemDataAfter = cartItemSnapAfter.data() as CartItemData;

    const cartItemRef = cartItemSnapAfter.ref;

    if (cartItemDataBefore.quantity !== cartItemDataAfter.quantity) {
      const { runRemainingCode } = await checkProductStock({ cartItemData: cartItemDataAfter, cartItemRef });
      if (runRemainingCode === false) {
        return;
      }

      await updateCartItemList({
        cartItemId,
        userId,
        cartItemData: cartItemDataAfter,
        mode: 'update',
      });
    }
  });
