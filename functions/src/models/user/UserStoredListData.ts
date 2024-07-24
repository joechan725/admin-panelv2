import { AddressData } from '../AddressData';
import { CartItemData } from './cartItem/CartItemData';
import { WishlistItemData } from './wishlistItem/WishlistItemData';

export interface UserStoredListData {
  [typeAndId: string]: CartItemData | WishlistItemData | AddressData;
}
