'use client';

import CustomToast from './CustomToast';
import { Toast } from 'react-hot-toast';
import ImageShow from '../image/ImageShow';
import { Product } from '@/models/product/Product';
import { useLocale, useTranslations } from 'next-intl';

interface ProductAddToastProps {
  t: Toast;
  product: Product;
  addTo: 'cart' | 'wishlist';
}

const ProductAddToast = ({ t, product, addTo }: ProductAddToastProps) => {
  const tran = useTranslations('Product.toast');
  const locale = useLocale();

  const { images, nameEN, nameZH } = product;

  const name = locale === 'en' ? nameEN : nameZH;

  return (
    <CustomToast t={t} homePosition="top" sizeClassName="max-w-[350px] w-full sm:min-w-min">
      <div className="p-4 max-w-[350px]">
        <div className="flex gap-4 items-center">
          {product?.images && (
            <div className="flex-0">
              <ImageShow roundedClassName="rounded-md" sizeClassName="size-14" image={images?.[0]} />
            </div>
          )}
          <div className="flex-1 space-y-0.5">
            <div className="text-ellipsis line-clamp-1 text-slate-600 font-semibold">
              {addTo === 'cart' && tran('addedToCart')}
              {addTo === 'wishlist' && tran('addedToWishlist')}
            </div>
            <div className="text-ellipsis line-clamp-1 text-slate-600 font-medium">{name}</div>
          </div>
        </div>
      </div>
    </CustomToast>
  );
};

export default ProductAddToast;
