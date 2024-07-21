import Heart from '@/components/icon/Heart';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useCartStore } from '@/stores/useCartStore';
import { useTranslations } from 'next-intl';

interface UserMoveItemToWishlistButtonProps {
  cartItemId: string;
}

const UserMoveItemToWishlistButton = ({ cartItemId }: UserMoveItemToWishlistButtonProps) => {
  const t = useTranslations('Cart');

  const { moveCartItemToWishList, isWriting } = useCartStore((state) => ({
    moveCartItemToWishList: state.moveCartItemToWishList,
    isWriting: state.isWriting,
  }));

  return (
    <HoverPopup message={t('moveToWishlist')} algin="right" position="bottom">
      <button onClick={() => moveCartItemToWishList(cartItemId)} disabled={isWriting}>
        <Heart
          sizeClassName="size-4"
          className="text-pink-500 transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};

export default UserMoveItemToWishlistButton;
