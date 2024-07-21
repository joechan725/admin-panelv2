import ShoppingBag from '@/components/icon/ShoppingBag';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

interface UserBuyNowFromWishlistButtonProps {
  wishlistItemId: string;
}

const UserBuyNowFromWishlistButton = ({ wishlistItemId }: UserBuyNowFromWishlistButtonProps) => {
  const t = useTranslations('Wishlist');

  const { addItemFromWishlistToCart } = useWishlistStore((state) => ({
    addItemFromWishlistToCart: state.addItemFromWishlistToCart,
  }));

  const router = useRouter();

  const handleBuyNow = () => {
    addItemFromWishlistToCart(wishlistItemId);
    router.push('/checkout');
  };

  return (
    <HoverPopup message={t('buyNow')} algin="right" position="bottom">
      <button onClick={handleBuyNow}>
        <ShoppingBag
          sizeClassName="size-4"
          className="text-slate-600 transition-all group-hover:text-sky-700 group-active:text-sky-800 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};

export default UserBuyNowFromWishlistButton;
