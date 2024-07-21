import { WishlistItem as WishlistItemModel } from '@/models/user/wishlistItem/WishlistItem';
import WishlistItem from './WishlistItem';

interface WishlistItemListProps {
  wishlistItems: WishlistItemModel[];
  mode: 'admin' | 'user';
}

const WishlistItemList = ({ wishlistItems, mode }: WishlistItemListProps) => {
  return (
    wishlistItems &&
    wishlistItems.length > 0 && (
      <div>
        {wishlistItems.map((wishlistItem) => (
          <WishlistItem key={wishlistItem.id} wishlistItem={wishlistItem} mode={mode} />
        ))}
      </div>
    )
  );
};
export default WishlistItemList;
