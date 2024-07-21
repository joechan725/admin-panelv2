import { db } from '@/firebase/config';
import { userStoredListConverter } from '@/firebase/converter/user/userStoredListConverter';
import { Address } from '@/models/Address';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useAdminUserStoredListListener = (userId: string) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const userStoredListRef = doc(db, `/users/${userId}/lists/userStoredList`).withConverter(userStoredListConverter);
    const unsubscribe = onSnapshot(
      userStoredListRef,
      (snapshot) => {
        const userStoredListData = snapshot.data() ?? { cartItems: [], wishlistItems: [], addresses: [] };
        const {
          cartItems: cartItemsData,
          wishlistItems: wishlistItemsData,
          addresses: addressesData,
        } = userStoredListData;
        setCartItems(cartItemsData);
        setWishlistItems(wishlistItemsData);
        setAddresses(addressesData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return {
    addresses,
    cartItems,
    wishlistItems,
    isLoading,
    error,
  };
};
