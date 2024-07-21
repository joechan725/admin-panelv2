'use client';

import Plus from '@/components/icon/Plus';
import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { Product } from '@/models/product/Product';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { useLocale } from 'next-intl';
import { useState } from 'react';

interface WishlistItemSelectorItemProps {
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  product: Product;
  disabled: boolean;
}

const WishlistItemSelectorItem = ({ setWishlistItems, product, disabled }: WishlistItemSelectorItemProps) => {
  const locale = useLocale();

  const {
    id,
    images,
    nameZH,
    nameEN,
    descriptionZH,
    descriptionEN,
    collectionId,
    collectionNameZH,
    collectionNameEN,
    categoryId,
    categoryNameZH,
    categoryNameEN,
    brandId,
    brandNameZH,
    brandNameEN,
    markedPrice,
    sellingPrice,
    stock,
    commentCount,
    rating,
  } = product;

  const handleAdd = () => {
    const wishlistItem: WishlistItem = {
      id: id,
      productId: id,
      nameEN,
      nameZH,
      image: images?.[0],
      markedPrice,
      sellingPrice,
      stock,
      brandId,
      brandNameZH,
      brandNameEN,
      categoryId,
      categoryNameZH,
      categoryNameEN,
      collectionId,
      collectionNameEN,
      collectionNameZH,
      commentCount,
      descriptionEN,
      descriptionZH,
      rating,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    setWishlistItems((prevWishlistItems) => [...prevWishlistItems, wishlistItem]);
  };

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const collectionName = locale === 'en' ? collectionNameEN : collectionNameZH;
  const categoryName = locale === 'en' ? categoryNameEN : categoryNameZH;
  const brandName = locale === 'en' ? brandNameEN : brandNameZH;

  return (
    <tr className="border-b border-slate-900/10 even:bg-gray-50/50">
      {/* product */}
      <td className="p-2">
        <div className="flex items-center gap-4">
          <HoverPopup
            background={false}
            message={
              <ImageShow
                sizeClassName="size-36"
                roundedClassName="rounded-md"
                image={images && images.length > 0 ? images[0] : undefined}
              />
            }
          >
            <ImageShow
              sizeClassName="size-16"
              roundedClassName="rounded-md"
              image={images && images.length > 0 ? images[0] : undefined}
            />
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
        <button
          type="button"
          onClick={handleAdd}
          className="transition-all text-gray-500 hover:text-sky-700 active:text-sky-800"
          disabled={disabled}
        >
          <HoverPopup message="Add">
            <Plus sizeClassName="size-5" />
          </HoverPopup>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItemSelectorItem;
