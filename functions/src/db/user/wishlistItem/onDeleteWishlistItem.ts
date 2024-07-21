import * as functions from 'firebase-functions';
import { updateWishlistItemList } from './helpers/updateWishlistItemList';
import { WishlistItemData } from '../../../models/user/wishlistItem/WishlistItemData';

export const onDeleteWishlistItem = functions.firestore
  .document('users/{userId}/wishlistItems/{wishlistItemId}')
  .onDelete(async (snapshot, context) => {
    const { userId, wishlistItemId } = context.params;
    const wishlistItemData = snapshot.data() as WishlistItemData;

    await updateWishlistItemList({ wishlistItemId, userId, wishlistItemData, mode: 'delete' });
  });
