import { db } from '@/firebase/config';
import { userStoredListConverter } from '@/firebase/converter/user/userStoredListConverter';
import { useAddressStore } from '@/stores/useAddressStore';
import { useCartStore } from '@/stores/useCartStore';
import { useSessionStore } from '@/stores/useSessionStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

export const useUserStoredListListener = () => {
  const { user } = useSessionStore((state) => ({ user: state.user }));
  const { loadCart } = useCartStore((state) => ({ loadCart: state.loadCart }));
  const { loadWishlist } = useWishlistStore((state) => ({ loadWishlist: state.loadWishlist }));
  const { loadAddress } = useAddressStore((state) => ({ loadAddress: state.loadAddress }));

  useEffect(() => {
    if (!user) {
      return;
    }
    const userId = user.id;

    const userStoredListRef = doc(db, `/users/${userId}/lists/userStoredList`).withConverter(userStoredListConverter);
    const unsubscribe = onSnapshot(
      userStoredListRef,
      (snapshot) => {
        const userStoredList = snapshot.data() ?? { cartItems: [], wishlistItems: [], addresses: [] };
        const { cartItems, wishlistItems, addresses } = userStoredList;
        loadCart(cartItems);
        loadWishlist(wishlistItems);
        loadAddress(addresses);
      },
      (error) => {
        useCartStore.setState({ loadingError: 'unexpectedError', isLoading: false });
        useWishlistStore.setState({ loadingError: 'unexpectedError', isLoading: false });
        useAddressStore.setState({ loadingError: 'unexpectedError', isLoading: false });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);
};
