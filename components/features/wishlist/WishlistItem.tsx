import clsx from 'clsx/lite';
import ImageShow from '@/components/ui/image/ImageShow';
import StarBar from '@/components/ui/StarBar';
import UserWishlistItemDeleteButton from './UserWishlistItemDeleteButton';
import AdminWishlistItemDeleteButton from './AdminWishlistItemDeleteButton';
import { WishlistItem as WishlistItemModel } from '@/models/user/wishlistItem/WishlistItem';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import UserAddItemToCartFromWishlistButton from './UserAddItemToCartFromWishlistButton';
import AdminAddItemToCartFromWishlistButton from './AdminAddItemToCartFromWishlistButton';
import UserBuyNowFromWishlistButton from './UserBuyNowFromWishlistButton';
import { useLocale, useTranslations } from 'next-intl';

interface WishlistItemProps {
  wishlistItem: WishlistItemModel;
  mode: 'admin' | 'user';
}

const WishlistItem = ({ wishlistItem, mode }: WishlistItemProps) => {
  const t = useTranslations('Wishlist');
  const locale = useLocale();

  const {
    nameEN,
    nameZH,
    id,
    image,
    sellingPrice,
    markedPrice,
    descriptionEN,
    descriptionZH,
    stock,
    rating,
    errorMessage,
  } = wishlistItem;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;

  return (
    <div className="flex gap-4 md:gap-8 border-b border-gray-600/15 py-4 px-2 relative">
      <div className="flex-0">
        <ImageShow
          image={image}
          sizeClassName="size-12 md:size-32"
          className={clsx(errorMessage !== undefined && 'opacity-30')}
        />
      </div>
      <div className="flex-1 my-2 flex flex-col gap-1">
        <div className="flex-1">
          <div
            className={clsx(
              'text-slate-700 font-semibold text-sm md:text-base',
              errorMessage !== undefined && 'opacity-30'
            )}
          >
            {name}
          </div>
          <div
            className={clsx(
              'text-primary-text text-xs font-medium line-clamp-2 text-ellipsis leading-4',
              errorMessage !== undefined && 'opacity-30'
            )}
          >
            {splitNewLine(description) ?? 'N/A'}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div className={clsx('flex', errorMessage !== undefined && 'opacity-30')}>
              <StarBar activeStar={rating ?? 0} />
            </div>
          </div>
        </div>
        {errorMessage !== undefined && (
          <div className="text-danger font-semibold opacity-100 text-sm">
            {errorMessage === 'no longer available' && t('noLongerAvailable', { productName: name })}
            {errorMessage === 'out of stock' && t('outOfStock', { productName: name })}
          </div>
        )}
      </div>
      <div
        className={clsx(
          'flex-0 flex flex-col justify-center items-end ml-4',
          errorMessage !== undefined && 'opacity-30'
        )}
      >
        {sellingPrice !== undefined && (
          <div className="text-primary-text font-semibold text-xs line-through">{markedPrice.toFixed(2)}</div>
        )}
        <div
          className={clsx(
            sellingPrice !== undefined ? 'text-danger' : 'text-primary-text',
            'font-semibold text-sm md:text-lg'
          )}
        >
          ${(sellingPrice ?? markedPrice).toFixed(2)}
        </div>
      </div>
      <div className="absolute right-2 top-2">
        <div className="flex gap-4 items-center">
          {mode === 'user' && (
            <>
              <UserBuyNowFromWishlistButton wishlistItemId={id} />
              <UserAddItemToCartFromWishlistButton wishlistItemId={id} />
              <UserWishlistItemDeleteButton wishlistItemId={id} />
            </>
          )}
          {mode === 'admin' && (
            <>
              <AdminAddItemToCartFromWishlistButton wishlistItem={wishlistItem} />
              <AdminWishlistItemDeleteButton wishlistItemId={id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default WishlistItem;
