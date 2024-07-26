import * as functions from 'firebase-functions';
import { updateCartItemStatistic } from './helpers/updateCartItemStatistic';
import { checkProductStock } from './helpers/checkProductStock';
import { updateCartItemList } from './helpers/updateCartItemList';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';
import { validateCartItem } from './helpers/validateCartItem';

export const onCreateCartItem = functions.firestore
  .document('users/{userId}/cartItems/{cartItemId}')
  .onCreate(async (snapshot, context) => {
    const { userId, cartItemId } = context.params;
    const cartItemData = snapshot.data() as CartItemData;

    const cartItemRef = snapshot.ref;

    const { isValid } = await validateCartItem({ cartItemData, cartItemRef });
    if (!isValid) {
      return;
    }

    const { runRemainingCode } = await checkProductStock({ cartItemData, cartItemRef });

    if (!runRemainingCode) {
      return;
    }

    await updateCartItemList({ cartItemId, userId, cartItemData, mode: 'create' });

    await updateCartItemStatistic({ userId, cartItemData, mode: 'create' });
  });
