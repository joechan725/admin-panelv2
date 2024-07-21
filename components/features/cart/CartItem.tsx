import ImageShow from '@/components/ui/image/ImageShow';
import StarBar from '@/components/ui/StarBar';
import UserCartItemChangeQuantity from './UserCartItemChangeQuantity';
import UserCartItemDeleteButton from './UserCartItemDeleteButton';
import { CartItem as CartItemModel } from '@/models/user/cartItem/CartItem';
import clsx from 'clsx/lite';
import AdminCartItemChangeQuantity from './AdminCartItemChangeQuantity';
import AdminCartItemDeleteButton from './AdminCartItemDeleteButton';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import UserMoveItemToWishlistButton from './UserMoveItemToWishlistButton';
import AdminMoveItemToWishlistButton from './AdminMoveItemToWishlistButton';
import { useLocale, useTranslations } from 'next-intl';

interface CartItemProps {
  cartItem: CartItemModel;
  mode: 'admin' | 'user';
}

const CartItem = ({ cartItem, mode }: CartItemProps) => {
  const t = useTranslations('Cart');
  const locale = useLocale();

  const {
    nameEN,
    nameZH,
    quantity,
    id,
    errorMessage,
    sellingPrice,
    markedPrice,
    descriptionEN,
    descriptionZH,
    stock,
    rating,
    image,
  } = cartItem;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;

  return (
    <div className="flex items-center gap-4 md:gap-8 border-b border-gray-600/15 py-4 px-2 relative">
      <div className="flex-0">
        <ImageShow
          image={image}
          sizeClassName="size-12 md:size-32"
          className={clsx(errorMessage !== undefined && 'opacity-30')}
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
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
          <div className={clsx(errorMessage !== undefined && 'opacity-30')}>
            <span className="text-slate-700 text-xs md:text-sm font-semibold">{t('stock')}</span>
            <span className="text-primary-text text-xs md:text-sm font-medium">{stock}</span>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <div className={clsx('flex', errorMessage !== undefined && 'opacity-30')}>
                <StarBar activeStar={rating ?? 0} />
              </div>
            </div>
            <div>
              {mode === 'user' && (
                <UserCartItemChangeQuantity cartItemId={id} existingQuantity={quantity} key={crypto.randomUUID()} />
              )}
              {mode === 'admin' && (
                <AdminCartItemChangeQuantity cartItemId={id} existingQuantity={quantity} key={crypto.randomUUID()} />
              )}
            </div>
          </div>
          {errorMessage !== undefined && (
            <div className="text-danger font-semibold opacity-100 text-sm">
              {errorMessage === 'no longer available' && t('noLongerAvailable')}
              {errorMessage === 'out of stock' && t('outOfStock', { productName: name })}
              {errorMessage === 'not enough stock' && t('notEnoughStock', { stock, productName: name })}
            </div>
          )}
        </div>
      </div>
      <div className={clsx('flex-0', errorMessage !== undefined && 'opacity-30')}>
        <div className="flex flex-col items-end ml-4">
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
          <hr className="bg-slate-600/20 h-0.5 w-[calc(100%+10px)]" />
          <div className="text-primary-text font-semibold md:text-xl">
            ${((sellingPrice ?? markedPrice) * quantity).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-2">
        <div className="flex gap-4 items-center">
          {mode === 'user' && (
            <>
              <UserMoveItemToWishlistButton cartItemId={id} />
              <UserCartItemDeleteButton cartItemId={id} />
            </>
          )}
          {mode === 'admin' && (
            <>
              <AdminMoveItemToWishlistButton cartItem={cartItem} />
              <AdminCartItemDeleteButton cartItemId={id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartItem;
