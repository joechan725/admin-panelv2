import Cart from '@/components/icon/Cart';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useAdminWishlistItem } from '@/lib/hooks/user/admin/wishlist/useAdminWishlistItem';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AdminAddItemToCartFromWishlistButtonProps {
  wishlistItem: WishlistItem;
}

const AdminAddItemToCartFromWishlistButton = ({ wishlistItem }: AdminAddItemToCartFromWishlistButtonProps) => {
  const t = useTranslations('Wishlist');

  const { addItemFromWishlistToCart, isWriting } = useAdminWishlistItem();

  const params = useParams<{ userId: string }>();

  const { userId } = params;

  return (
    <HoverPopup message={t('addToCart')} algin="right" position="bottom">
      <button
        onClick={() => addItemFromWishlistToCart({ userId, wishlistItem })}
        disabled={isWriting}
        className="group"
      >
        <Cart
          sizeClassName="size-4"
          className="text-slate-600 transition-all group-hover:text-sky-700 group-active:text-sky-800 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};

export default AdminAddItemToCartFromWishlistButton;
