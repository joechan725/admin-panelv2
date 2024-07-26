import { HttpsError } from 'firebase-functions/v2/https';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';
import { WishlistItemData } from '../../../models/user/wishlistItem/WishlistItemData';
import { AddressData } from '../../../models/AddressData';
import { db } from '../../../admin';

interface UserStoredListData {
  [typeAndId: string]: CartItemData | WishlistItemData | AddressData;
}

export const getCartItems = async (userId: string) => {
  const userStoredListRef = db.collection('users').doc(userId).collection('lists').doc('userStoredList');

  const userStoredListSnap = await userStoredListRef.get();

  if (!userStoredListSnap.exists) {
    throw new HttpsError('invalid-argument', 'Cart is empty');
  }

  const userStoredListData = userStoredListSnap.data() as UserStoredListData;

  const userStoredDataArray = Object.entries(userStoredListData);

  const cartItemsData: (CartItemData & { id: string })[] = [];

  userStoredDataArray.forEach(([typeAndId, data]) => {
    const [type, id] = typeAndId.split('_');
    if (type === 'cartItem') {
      const cartItemData = data as CartItemData;
      cartItemsData.push({
        ...cartItemData,
        id,
      });
    }
  });

  if (cartItemsData.length === 0) {
    throw new HttpsError('invalid-argument', 'Cart is empty');
  }

  return cartItemsData;
};
