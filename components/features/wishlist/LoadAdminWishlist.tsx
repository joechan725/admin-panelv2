'use client';

import { useParams } from 'next/navigation';
import { useAdminUserStoredListListener } from '@/lib/hooks/user/admin/useAdminUserStoredListListener';
import WishlistFrame from './WishlistFrame';

interface LoadAdminWishlistProps {}

const LoadAdminWishlist = ({}: LoadAdminWishlistProps) => {
  const params = useParams<{ userId: string }>();
  const { userId } = params;
  const { wishlistItems, error, isLoading } = useAdminUserStoredListListener(userId);

  const totalQuantity = wishlistItems.length;

  return (
    <WishlistFrame
      mode="admin"
      wishlistItems={wishlistItems}
      isLoading={isLoading}
      error={error}
      totalQuantity={totalQuantity}
    />
  );
};

export default LoadAdminWishlist;
