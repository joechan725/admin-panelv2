import Heart from '@/components/icon/Heart';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useAdminCartItem } from '@/lib/hooks/user/admin/cartItem/useAdminCartItem';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AdminMoveItemToWishlistButtonProps {
  cartItem: CartItem;
}

const AdminMoveItemToWishlistButton = ({ cartItem }: AdminMoveItemToWishlistButtonProps) => {
  const t = useTranslations('Cart');

  const { moveCartItemToWishList, isWriting } = useAdminCartItem();

  const params = useParams<{ userId: string }>();

  const { userId } = params;

  return (
    <HoverPopup message={t('moveToWishlist')} algin="right">
      <button onClick={() => moveCartItemToWishList({ userId, cartItem })} disabled={isWriting} className="group">
        <Heart
          sizeClassName="size-4"
          className="text-pink-500 transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};

export default AdminMoveItemToWishlistButton;
