import * as functions from 'firebase-functions';
import { updateWishlistItemList } from './helpers/updateWishlistItemList';
import { WishlistItemData } from '../../../models/user/wishlistItem/WishlistItemData';
import { checkProductAvailability } from './helpers/checkProductAvailability';
import { validateWishlistItem } from './helpers/validateWishlistItem';

export const onUpdateWishlistItem = functions.firestore
  .document('users/{userId}/wishlistItems/{wishlistItemId}')
  .onUpdate(async (change, context) => {
    const { userId, wishlistItemId } = context.params;

    const wishlistItemSnapAfter = change.after;

    const wishlistItemDataAfter = wishlistItemSnapAfter.data() as WishlistItemData;

    const wishlistItemRef = wishlistItemSnapAfter.ref;

    const { isValid } = await validateWishlistItem({ wishlistItemData: wishlistItemDataAfter, wishlistItemRef });
    if (!isValid) {
      return;
    }

    const { runRemainingCode } = await checkProductAvailability({
      wishlistItemData: wishlistItemDataAfter,
      wishlistItemRef,
    });

    if (!runRemainingCode) {
      return;
    }

    await updateWishlistItemList({
      wishlistItemId,
      userId,
      wishlistItemData: wishlistItemDataAfter,
      mode: 'update',
    });
  });
