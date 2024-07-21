'use client';

import Heart from '@/components/icon/Heart';
import { Product } from '@/models/product/Product';
import { useWishlistStore } from '@/stores/useWishlistStore';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface ToggleWishlistButtonProps {
  product: Product;
}

const ToggleWishlistButton = ({ product }: ToggleWishlistButtonProps) => {
  const t = useTranslations('Product.button');

  const { addItemToWishlist, removeItemFromWishlist, wishlistItems } = useWishlistStore((state) => ({
    addItemToWishlist: state.addItemToWishlist,
    removeItemFromWishlist: state.removeItemFromWishlist,
    wishlistItems: state.wishlistItems,
  }));

  const existingWishlistItem = wishlistItems.find((item) => item.id === product.id);

  const handleToggleWishlist = () => {
    if (existingWishlistItem) {
      removeItemFromWishlist(existingWishlistItem.id);
      return;
    }
    addItemToWishlist(product);
  };

  return (
    <div role="button" onClick={handleToggleWishlist} className="group flex gap-2 items-center py-2">
      <Heart
        sizeClassName="size-4"
        className={clsx(
          existingWishlistItem
            ? 'text-heart'
            : 'text-black transition-all group-hover:text-heart group-active:text-heart/70'
        )}
      />
      <div className="text-xs md:text-sm font-medium text-slate-500 transition-all group-hover:text-opacity-85 group-active:text-opacity-70">
        {existingWishlistItem ? t('removeFromWishlist') : t('addToWishlist')}
      </div>
    </div>
  );
};

export default ToggleWishlistButton;
