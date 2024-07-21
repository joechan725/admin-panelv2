'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import CartItemList from './CartItemList';
import CartItemSkeleton from './CartItemSkeleton';
import clsx from 'clsx/lite';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { useTranslations } from 'next-intl';

interface CartFrameProps {
  sizeClassName?: string;
  totalQuantity: number;
  totalPrice: number;
  cartItems: CartItem[];
  isLoading: boolean;
  error?: string;
  mode: 'admin' | 'user';
}

const CartFrame = ({
  sizeClassName = 'max-h-[650px]',
  totalQuantity,
  totalPrice,
  cartItems,
  isLoading,
  error,
  mode,
}: CartFrameProps) => {
  const t = useTranslations('Cart');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-primary-text mx-2">{t('title', { totalQuantity })}</div>
      </div>
      <hr className="h-0.5 w-full bg-primary-text/20" />
      <div className={clsx(sizeClassName, 'overflow-y-auto scrollbar pb-4')}>
        {isLoading && <CartItemSkeleton />}
        {!isLoading && (!cartItems || cartItems.length === 0) && (
          <div className="text-sm font-semibold text-primary-text p-2">{t('noItems')}</div>
        )}
        {!isLoading && <CartItemList cartItems={cartItems} mode={mode} />}
        <ErrorTranslation error={error} />
        {!isLoading && cartItems && cartItems.length > 0 && (
          <div className="flex justify-end">
            <div>
              <span className="font-medium text-secondary-text text-xs md:text-sm">{t('subtotal')}</span>
              <span className="font-semibold text-primary-text md:text-xl">${totalPrice.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartFrame;
