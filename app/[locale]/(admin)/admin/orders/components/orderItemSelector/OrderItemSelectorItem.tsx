'use client';

import Plus from '@/components/icon/Plus';
import IconButton from '@/components/ui/button/IconButton';
import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { OrderItem } from '@/models/order/OrderItem';
import { Product } from '@/models/product/Product';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

interface OrderItemSelectorItemProps {
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  product: Product;
  disabled: boolean;
}

const OrderItemSelectorItem = ({ setOrderItems, product, disabled }: OrderItemSelectorItemProps) => {
  const t = useTranslations('Selector');
  const locale = useLocale();

  const [quantity, setQuantity] = useState(1);

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
  } = product;

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= 0 && +event.target.value > stock) {
      return;
    }
    setQuantity(+event.target.value);
  };

  const handleAdd = () => {
    const orderItem: OrderItem = {
      id: id,
      productId: id,
      markedPrice,
      nameEN,
      nameZH,
      brandId,
      brandNameEN,
      brandNameZH,
      categoryId,
      categoryNameEN,
      categoryNameZH,
      collectionId,
      collectionNameEN,
      collectionNameZH,
      descriptionEN,
      descriptionZH,
      image: product.images?.[0],
      sellingPrice,
      quantity,
      stock,
    };

    setOrderItems((prevOrderItems) => [...prevOrderItems, orderItem]);
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
              <div className="truncate text-sm text-danger font-medium">${sellingPrice.toFixed(1)}</div>
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
        <IconButton type="button" onClick={handleAdd} disabled={disabled} theme="secondary">
          <HoverPopup message={t('add')}>
            <Plus sizeClassName="size-5" />
          </HoverPopup>
        </IconButton>
      </td>
    </tr>
  );
};

export default OrderItemSelectorItem;
