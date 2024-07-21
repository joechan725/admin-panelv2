import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface WishlistItemData extends Omit<WishlistItem, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface WishlistData {
  [wishlistItemId: string]: WishlistItemData;
}

export const wishlistConverter = {
  toFirestore: (wishlistItems: WishlistItem[]) => {
    return wishlistItems;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WishlistItem[] => {
    const wishlistData = snapshot.data(options) as WishlistData;

    const wishlistItemsArray = Object.entries(wishlistData);

    const wishlistItems: WishlistItem[] = wishlistItemsArray.map(([wishlistItemId, wishlistItem]): WishlistItem => {
      const { createdAt, updatedAt } = wishlistItem;

      return {
        ...wishlistItem,
        id: wishlistItemId,
        createdAt: createdAt.toMillis(),
        updatedAt: updatedAt.toMillis(),
      };
    });

    const sortedWishlistItems = sortObjectsByKey(wishlistItems, 'updatedAt', 'desc');

    return sortedWishlistItems;
  },
};
