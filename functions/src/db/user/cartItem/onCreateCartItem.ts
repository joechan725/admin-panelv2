import * as functions from 'firebase-functions';
import { updateCartItemStatistic } from './helpers/updateCartItemStatistic';
import { checkProductStock } from './helpers/checkProductStock';
import { updateCartItemList } from './helpers/updateCartItemList';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';

export const onCreateCartItem = functions.firestore
  .document('users/{userId}/cartItems/{cartItemId}')
  .onCreate(async (snapshot, context) => {
    const { userId, cartItemId } = context.params;
    const cartItemData = snapshot.data() as CartItemData;

    const cartItemRef = snapshot.ref;

    const { runRemainingCode } = await checkProductStock({ cartItemData, cartItemRef });

    if (runRemainingCode === false) {
      return;
    }

    await updateCartItemList({ cartItemId, userId, cartItemData, mode: 'create' });

    await updateCartItemStatistic({ userId, cartItemData, mode: 'create' });
  });
