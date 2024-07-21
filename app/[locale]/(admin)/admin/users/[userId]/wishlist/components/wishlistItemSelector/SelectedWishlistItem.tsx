'use client';

import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { useLocale, useTranslations } from 'next-intl';

interface SelectedWishlistItemProps {
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  wishlistItem: WishlistItem;
  disabled: boolean;
}

const SelectedWishlistItem = ({ setWishlistItems, wishlistItem, disabled }: SelectedWishlistItemProps) => {
  const t = useTranslations('Selector');
  const locale = useLocale();

  const {
    id,
    image,
    nameEN,
    nameZH,
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
  } = wishlistItem;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const collectionName = locale === 'en' ? collectionNameEN : collectionNameZH;
  const brandName = locale === 'en' ? brandNameEN : brandNameZH;
  const categoryName = locale === 'en' ? categoryNameEN : categoryNameZH;

  const handleRemove = () => {
    setWishlistItems((prevWishlistItems) => prevWishlistItems.filter((prevWishlistItem) => prevWishlistItem.id !== id));
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
                {markedPrice.toFixed(1)}
              </div>
              <div className="truncate text-sm text-red-500 font-medium">${sellingPrice.toFixed(1)}</div>
            </>
          ) : null}
          {!sellingPrice && (
            <div className="truncate text-sm font-semibold text-primary-text">${markedPrice.toFixed(1)}</div>
          )}
        </div>
      </td>

      {/* stock */}
      <td className="p-2">
        <div className="truncate text-sm font-semibold text-primary-text">{stock}</div>
      </td>

      {/* action */}
      <td className="p-2">
        <IconButton type="button" onClick={handleRemove} theme="danger" disabled={disabled}>
          <HoverPopup message={t('delete')}>
            <Trash sizeClassName="size-5" />
          </HoverPopup>
        </IconButton>
      </td>
    </tr>
  );
};

export default SelectedWishlistItem;
