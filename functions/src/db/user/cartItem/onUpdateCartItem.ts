import * as functions from 'firebase-functions';
import { checkProductStock } from './helpers/checkProductStock';
import { updateCartItemList } from './helpers/updateCartItemList';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';
import { validateCartItem } from './helpers/validateCartItem';

export const onUpdateCartItem = functions.firestore
  .document('users/{userId}/cartItems/{cartItemId}')
  .onUpdate(async (change, context) => {
    const { userId, cartItemId } = context.params;

    const cartItemSnapAfter = change.after;

    const cartItemDataAfter = cartItemSnapAfter.data() as CartItemData;

    const cartItemRef = cartItemSnapAfter.ref;

    const { isValid } = await validateCartItem({ cartItemData: cartItemDataAfter, cartItemRef });
    if (!isValid) {
      return;
    }

    const { runRemainingCode } = await checkProductStock({ cartItemData: cartItemDataAfter, cartItemRef });
    if (!runRemainingCode) {
      return;
    }

    await updateCartItemList({
      cartItemId,
      userId,
      cartItemData: cartItemDataAfter,
      mode: 'update',
    });
  });
