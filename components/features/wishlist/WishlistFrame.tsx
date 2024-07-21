'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import WishlistItemList from './WishlistItemList';
import WishlistItemSkeleton from './WishlistItemSkeleton';
import clsx from 'clsx/lite';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { useTranslations } from 'next-intl';

interface WishlistFrameProps {
  sizeClassName?: string;
  wishlistItems: WishlistItem[];
  totalQuantity: number;
  isLoading: boolean;
  error?: string;
  mode: 'admin' | 'user';
}

const WishlistFrame = ({
  sizeClassName = 'max-h-[650px]',
  totalQuantity,
  wishlistItems,
  isLoading,
  error,
  mode,
}: WishlistFrameProps) => {
  const t = useTranslations('Wishlist');
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg text-slate-600 font-semibold mx-2">{t('title', { totalQuantity })}</div>
      </div>
      <hr className="h-0.5 w-full bg-slate-600/20" />
      <div className={clsx(sizeClassName, 'overflow-y-auto scrollbar scrollbar-slate pb-4')}>
        {isLoading && <WishlistItemSkeleton />}
        {!isLoading && (!wishlistItems || wishlistItems.length === 0) && (
          <div className="text-sm font-semibold text-slate-600 p-2">{t('noItems')}</div>
        )}
        {!isLoading && <WishlistItemList wishlistItems={wishlistItems} mode={mode} />}
        <ErrorTranslation error={error} />
      </div>
    </div>
  );
};
export default WishlistFrame;
