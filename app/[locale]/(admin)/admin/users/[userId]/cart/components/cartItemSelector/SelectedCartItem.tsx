'use client';

import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { useLocale, useTranslations } from 'next-intl';

interface SelectedCartItemProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItem: CartItem;
  disabled: boolean;
}

const SelectedCartItem = ({ setCartItems, cartItem, disabled }: SelectedCartItemProps) => {
  const t = useTranslations('Selector');
  const locale = useLocale();

  const {
    id,
    quantity,
    image,
    nameZH,
    nameEN,
    descriptionEN,
    descriptionZH,
    collectionNameEN,
    collectionNameZH,
    brandNameEN,
    brandNameZH,
    categoryNameEN,
    categoryNameZH,
    markedPrice,
    sellingPrice,
    stock,
  } = cartItem;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const collectionName = locale === 'en' ? collectionNameEN : collectionNameZH;
  const brandName = locale === 'en' ? brandNameEN : brandNameZH;
  const categoryName = locale === 'en' ? categoryNameEN : categoryNameZH;

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= 0 || +event.target.value > stock) {
      return;
    }
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) => {
        if (prevCartItem.id === id) {
          return {
            ...prevCartItem,
            quantity: +event.target.value,
          };
        }
        return prevCartItem;
      })
    );
  };

  const handleRemove = () => {
    setCartItems((prevCartItems) => prevCartItems.filter((prevCartItem) => prevCartItem.id !== id));
  };

  return (
    <tr className="border-b border-slate-900/10 even:bg-gray-50/50">
      {/* product */}
      <td className="p-2">
        <div className="flex items-center gap-4">
          <HoverPopup
            background={false}
            message={<ImageShow sizeClassName="size-36" roundedClassName="rounded-md" image={image} />}
          >
            <ImageShow sizeClassName="size-16" roundedClassName="rounded-md" image={image} />
          </HoverPopup>
          <div>
            <div className="truncate text-sm font-semibold text-primary-text">{name}</div>
            <div className="text-xs font-medium text-secondary-text text-ellipsis max-w-80 line-clamp-2">
              {splitNewLine(description) ?? 'N/A'}
            </div>
          </div>
        </div>
      </td>

      {/* collection */}
      <td className="p-2">
        <div className="truncate text-sm font-semibold text-primary-text">{collectionName ?? 'N/A'}</div>
      </td>

      {/* category */}
      <td className="p-2">
        <div className="truncate text-sm font-semibold text-primary-text">{categoryName ?? 'N/A'}</div>
      </td>

      {/* brand */}
      <td className="p-2">
        <div className="truncate text-sm font-semibold text-primary-text">{brandName ?? 'N/A'}</div>
      </td>

      {/* price */}
      <td className="p-2">
        <div className="flex flex-col">
          {sellingPrice ? (
            <>
              <div className="truncate text-xs line-through font-semibold text-primary-text">
                {markedPrice.toFixed(2)}
              </div>
              <div className="truncate text-sm text-red-500 font-medium">${sellingPrice.toFixed(2)}</div>
            </>
          ) : null}
          {!sellingPrice && (
            <div className="truncate text-sm font-semibold text-primary-text">${markedPrice.toFixed(2)}</div>
          )}
        </div>
      </td>

      {/* stock */}
      <td className="p-2">
        <div className="truncate text-sm font-semibold text-primary-text">{stock}</div>
      </td>

      {/* Quantity */}
      <td className="p-2">
        <div className="text-sm w-20 px-2 py-1 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1 border-gray-300">
          <input
            type="number"
            disabled={disabled}
            value={quantity}
            onChange={handleChangeQuantity}
            onKeyDown={(e) => (e.key === 'e' || e.key === 'E') && e.preventDefault()}
            onWheel={(e) => (e.target as HTMLElement).blur()}
            className="w-full focus:outline-none flex-1 text-primary-text disabled:bg-transparent number-input-no-scroll disabled:text-opacity-60"
          />
        </div>
      </td>

      {/* action */}
      <td className="p-2">
        <IconButton type="button" theme="danger" onClick={handleRemove} disabled={disabled}>
          <HoverPopup message={t('delete')}>
            <Trash sizeClassName="size-5" />
          </HoverPopup>
        </IconButton>
      </td>
    </tr>
  );
};

export default SelectedCartItem;
