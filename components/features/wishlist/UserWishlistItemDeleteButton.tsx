import XMark from '@/components/icon/XMark';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useTranslations } from 'next-intl';

interface UserWishlistItemDeleteButtonProps {
  wishlistItemId: string;
}
const UserWishlistItemDeleteButton = ({ wishlistItemId }: UserWishlistItemDeleteButtonProps) => {
  const t = useTranslations('Wishlist');

  const { removeItemFromWishlist, isWriting } = useWishlistStore((state) => ({
    removeItemFromWishlist: state.removeItemFromWishlist,
    isWriting: state.isWriting,
  }));

  return (
    <HoverPopup message={t('remove')} algin="right" position="bottom">
      <button onClick={() => removeItemFromWishlist(wishlistItemId)} disabled={isWriting}>
        <XMark
          sizeClassName="size-4"
          className="text-red-600 transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};
export default UserWishlistItemDeleteButton;
