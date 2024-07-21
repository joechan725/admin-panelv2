import IconContainerWithBadgeCount from '@/components/ui/button/IconContainerWithBadgeCount';
import DropDown from '@/components/ui/popup/DropDown';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useState } from 'react';
import LoadUserWishlist from './LoadUserWishlist';
import Heart from '@/components/icon/Heart';
import HeartHollow from '@/components/icon/HeartHollow';

interface WishlistButtonProps {}
const WishlistButton = ({}: WishlistButtonProps) => {
  const [isShowWishlist, setIsShowWishlist] = useState(false);
  const { wishlistItems } = useWishlistStore((state) => ({ wishlistItems: state.wishlistItems }));

  const totalQuantity = wishlistItems.length;

  return (
    <>
      <IconContainerWithBadgeCount theme="heart" badgeCount={totalQuantity} onClick={() => setIsShowWishlist(true)}>
        <HeartHollow sizeClassName="size-6" className="group-hover:hidden" />
        <Heart sizeClassName="size-6" className="hidden group-hover:block group-hover:text-heart" />
      </IconContainerWithBadgeCount>
      {isShowWishlist && (
        <DropDown
          closeButton
          sizeClassName="max-w-full sm:max-w-[600px] w-full"
          className="px-4 py-6"
          onClose={() => setIsShowWishlist(false)}
          roundedClassName="rounded-md"
          positionClassName="-bottom-2 right-0"
          scroll={false}
        >
          <div className="space-y-2">
            <LoadUserWishlist sizeClassName="max-h-[480px]" />
          </div>
        </DropDown>
      )}
    </>
  );
};
export default WishlistButton;
