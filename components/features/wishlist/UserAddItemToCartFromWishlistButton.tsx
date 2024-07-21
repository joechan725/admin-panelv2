import Cart from '@/components/icon/Cart';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useTranslations } from 'next-intl';

interface UserAddItemToCartFromWishlistButtonProps {
  wishlistItemId: string;
}
const UserAddItemToCartFromWishlistButton = ({ wishlistItemId }: UserAddItemToCartFromWishlistButtonProps) => {
  const t = useTranslations('Wishlist');

  const { addItemFromWishlistToCart } = useWishlistStore((state) => ({
    addItemFromWishlistToCart: state.addItemFromWishlistToCart,
  }));

  return (
    <HoverPopup message={t('addToCart')} algin="right" position="bottom">
      <button onClick={() => addItemFromWishlistToCart(wishlistItemId)}>
        <Cart
          sizeClassName="size-4"
          className="text-slate-600 transition-all group-hover:text-sky-700 group-active:text-sky-800 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};
export default UserAddItemToCartFromWishlistButton;
