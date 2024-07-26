import * as functions from 'firebase-functions';
import { updateWishlistItemList } from './helpers/updateWishlistItemList';
import { WishlistItemData } from '../../../models/user/wishlistItem/WishlistItemData';
import { checkProductAvailability } from './helpers/checkProductAvailability';
import { validateWishlistItem } from './helpers/validateWishlistItem';

export const onCreateWishlistItem = functions.firestore
  .document('users/{userId}/wishlistItems/{wishlistItemId}')
  .onCreate(async (snapshot, context) => {
    const { userId, wishlistItemId } = context.params;
    const wishlistItemData = snapshot.data() as WishlistItemData;

    const wishlistItemRef = snapshot.ref;

    const { isValid } = await validateWishlistItem({ wishlistItemData, wishlistItemRef });
    if (!isValid) {
      return;
    }

    const { runRemainingCode } = await checkProductAvailability({ wishlistItemData, wishlistItemRef });
    if (!runRemainingCode) {
      return;
    }

    await updateWishlistItemList({ wishlistItemId, userId, wishlistItemData, mode: 'create' });
  });
