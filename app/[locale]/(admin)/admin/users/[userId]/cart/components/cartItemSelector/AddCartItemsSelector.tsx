'use client';

import BoxButton from '@/components/form/BoxButton';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SelectedCartItemList from './SelectedCartItemList';
import CartItemSelectorItemList from './CartItemSelectorItemList';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import { searchAndOrderProducts } from '@/app/[locale]/(admin)/admin/products/components/list/searchAndOrderProducts';
import { usePrivateProductListsListener } from '@/lib/hooks/product/usePrivateProductListsListener';
import { useAdminUserStoredListListener } from '@/lib/hooks/user/admin/useAdminUserStoredListListener';
import { useAdminCartItem } from '@/lib/hooks/user/admin/cartItem/useAdminCartItem';
import { useLocale, useTranslations } from 'next-intl';

interface AddCartItemsSelectorProps {
  onSuccess?: () => void;
}

const AddCartItemsSelector = ({ onSuccess }: AddCartItemsSelectorProps) => {
  const t = useTranslations('Selector');
  const locale = useLocale();

  const params = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { userId } = params;

  const {
    privateProducts,
    error: productLoadingError,
    isLoading: isLoadingProducts,
  } = usePrivateProductListsListener();
  const {
    cartItems: existingCartItems,
    error: cartItemLoadingError,
    isLoading: isLoadingCartItems,
  } = useAdminUserStoredListListener(userId);
  const { addItemsToCart, isWriting, error: cartWritingError } = useAdminCartItem();

  if (isLoadingCartItems || isLoadingProducts) {
    return <LoadingSpin layout="global" theme="secondary" />;
  }

  const existingCartItemProductIds = existingCartItems.map((item) => item.productId);

  const newCartItemProductIds = cartItems.map((item) => item.productId);

  const availableProducts = privateProducts
    .filter((product) => !existingCartItemProductIds.includes(product.id))
    .filter((product) => !newCartItemProductIds.includes(product.id));

  const disPlayProducts = searchAndOrderProducts({
    privateProducts: availableProducts,
    searchParams,
    sliceProductsByPage: false,
    locale,
  });

  const handleAddItemsToCart = async () => {
    const res = await addItemsToCart({ newCartItems: cartItems, userId });

    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between ml-2">
        <div className="text-lg font-semibold text-primary-text">{t('cartSelectorTitle')}</div>
        <div className="flex gap-4 items-center">
          <BoxButton disabled={isWriting} theme="primary" type="button" onClick={handleAddItemsToCart} fontSize="sm">
            {t('save')}
          </BoxButton>
        </div>
      </div>
      <div className="space-y-4">
        <SelectedCartItemList disabled={isWriting} cartItems={cartItems} setCartItems={setCartItems} />
        <CartItemSelectorItemList
          disabled={isWriting}
          products={availableProducts}
          displayProducts={disPlayProducts}
          setCartItems={setCartItems}
        />
        <ErrorTranslation error={productLoadingError} />
        <ErrorTranslation error={cartItemLoadingError} />
        <ErrorTranslation error={cartWritingError} />
      </div>
    </div>
  );
};
export default AddCartItemsSelector;
