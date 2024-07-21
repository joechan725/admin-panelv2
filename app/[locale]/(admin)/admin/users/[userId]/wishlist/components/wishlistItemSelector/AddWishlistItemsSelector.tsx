'use client';

import BoxButton from '@/components/form/BoxButton';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SelectedWishlistItemList from './SelectedWishlistItemList';
import WishlistItemSelectorItemList from './WishlistItemSelectorItemList';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import { searchAndOrderProducts } from '@/app/[locale]/(admin)/admin/products/components/list/searchAndOrderProducts';
import { usePrivateProductListsListener } from '@/lib/hooks/product/usePrivateProductListsListener';
import { useAdminUserStoredListListener } from '@/lib/hooks/user/admin/useAdminUserStoredListListener';
import { useAdminWishlistItem } from '@/lib/hooks/user/admin/wishlist/useAdminWishlistItem';
import { useLocale, useTranslations } from 'next-intl';

interface AddWishlistItemsSelectorProps {
  onSuccess?: () => void;
}

const AddWishlistItemsSelector = ({ onSuccess }: AddWishlistItemsSelectorProps) => {
  const t = useTranslations('Selector');
  const locale = useLocale();

  const params = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const { userId } = params;

  const {
    privateProducts,
    error: productLoadingError,
    isLoading: isLoadingProducts,
  } = usePrivateProductListsListener();
  const {
    wishlistItems: existingWishlistItems,
    error: wishlistItemLoadingError,
    isLoading: isLoadingWishlistItems,
  } = useAdminUserStoredListListener(userId);
  const { addItemsToWishlist, isWriting, error: wishlistWritingError } = useAdminWishlistItem();

  if (isLoadingWishlistItems || isLoadingProducts) {
    return <LoadingSpin layout="global" theme="secondary" />;
  }

  const existingWishlistItemProductIds = existingWishlistItems.map((item) => item.productId);

  const newWishlistItemProductIds = wishlistItems.map((item) => item.productId);

  const availableProducts = privateProducts
    .filter((product) => !existingWishlistItemProductIds.includes(product.id))
    .filter((product) => !newWishlistItemProductIds.includes(product.id));

  const disPlayProducts = searchAndOrderProducts({
    privateProducts: availableProducts,
    searchParams,
    sliceProductsByPage: false,
    locale,
  });

  const handleAddItemsToWishlist = async () => {
    const res = await addItemsToWishlist({ newWishlistItems: wishlistItems, userId });

    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between ml-2">
        <div className="text-lg font-semibold text-primary-text">{t('wishlistSelectorTitle')}</div>
        <div className="flex gap-4 items-center">
          <BoxButton
            disabled={isWriting}
            theme="primary"
            type="button"
            onClick={handleAddItemsToWishlist}
            fontSize="sm"
          >
            {t('save')}
          </BoxButton>
        </div>
      </div>
      <div className="space-y-4">
        <SelectedWishlistItemList
          disabled={isWriting}
          wishlistItems={wishlistItems}
          setWishlistItems={setWishlistItems}
        />
        <WishlistItemSelectorItemList
          disabled={isWriting}
          products={availableProducts}
          displayProducts={disPlayProducts}
          setWishlistItems={setWishlistItems}
        />
        <ErrorTranslation error={productLoadingError} />
        <ErrorTranslation error={wishlistItemLoadingError} />
        <ErrorTranslation error={wishlistWritingError} />
      </div>
    </div>
  );
};
export default AddWishlistItemsSelector;
