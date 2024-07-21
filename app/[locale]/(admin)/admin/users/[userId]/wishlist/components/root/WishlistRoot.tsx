import LoadAdminWishlist from '@/components/features/wishlist/LoadAdminWishlist';
import Widget from '@/components/layout/container/Widget';
import AddProductLink from '../link/AddProductLink';

interface WishlistRootProps {}

const WishlistRoot = ({}: WishlistRootProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Widget className="min-h-60">
          <div className="space-y-4">
            <LoadAdminWishlist />
            <AddProductLink />
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default WishlistRoot;
