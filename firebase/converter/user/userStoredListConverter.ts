import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { Address } from '@/models/Address';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface AddressData extends Omit<Address, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface CartItemData extends Omit<CartItem, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface WishlistItemData extends Omit<WishlistItem, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface UserStoredListData {
  [typeAndId: string]: CartItemData | WishlistItemData | AddressData;
}

interface UserStoredList {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addresses: Address[];
}

export const userStoredListConverter = {
  toFirestore: (userStoredList: UserStoredList) => {
    return userStoredList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserStoredList => {
    const userStoredListData = snapshot.data(options) as UserStoredListData;
    const userStoredListArray = Object.entries(userStoredListData);

    const cartItems: CartItem[] = [];
    const wishlistItems: WishlistItem[] = [];
    const addresses: Address[] = [];

    userStoredListArray.forEach(([objectKey, data]) => {
      const [type, id] = objectKey.split('_');

      if (type === 'cartItem') {
        const cartItemData = { ...data } as CartItemData;
        const { createdAt, updatedAt } = cartItemData;
        const cartItem: CartItem = {
          ...cartItemData,
          id,
          createdAt: createdAt.toMillis(),
          updatedAt: updatedAt.toMillis(),
        };
        cartItems.push(cartItem);
      }
      if (type === 'wishlistItem') {
        const wishlistItemData = { ...data } as WishlistItemData;
        const { createdAt, updatedAt } = wishlistItemData;
        const wishlistItem: WishlistItem = {
          ...wishlistItemData,
          id,
          createdAt: createdAt.toMillis(),
          updatedAt: updatedAt.toMillis(),
        };
        wishlistItems.push(wishlistItem);
      }
      if (type === 'address') {
        const addressData = { ...data } as AddressData;
        const { createdAt, updatedAt } = addressData;
        const address: Address = {
          ...addressData,
          id,
          createdAt: createdAt.toMillis(),
          updatedAt: updatedAt.toMillis(),
        };
        addresses.push(address);
      }
    });

    const sortedCartItems = sortObjectsByKey(cartItems, 'nameEN', 'asc');
    const sortedWishlistItems = sortObjectsByKey(wishlistItems, 'nameEN', 'asc');
    const sortedAddresses = sortObjectsByKey(addresses, 'remark', 'asc');

    return {
      cartItems: sortedCartItems,
      wishlistItems: sortedWishlistItems,
      addresses: sortedAddresses,
    };
  },
};
