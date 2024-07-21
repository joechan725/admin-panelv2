'use client';

import { useWishlistStore } from '@/stores/useWishlistStore';
import WishlistFrame from './WishlistFrame';

interface LoadUserWishlistProps {
  sizeClassName?: string;
}

const LoadUserWishlist = ({ sizeClassName }: LoadUserWishlistProps) => {
  const { wishlistItems, isLoading, loadingError } = useWishlistStore((state) => ({
    wishlistItems: state.wishlistItems,
    isLoading: state.isLoading,
    loadingError: state.loadingError,
  }));

  const totalQuantity = wishlistItems.length;

  return (
    <WishlistFrame
      mode="user"
      wishlistItems={wishlistItems}
      isLoading={isLoading}
      error={loadingError}
      totalQuantity={totalQuantity}
      sizeClassName={sizeClassName}
    />
  );
};

export default LoadUserWishlist;
