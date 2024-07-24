import { Product } from '@/models/product/Product';
import StarBar from '@/components/ui/StarBar';
import clsx from 'clsx/lite';
import ImagesSlide from '@/components/ui/image/ImagesSlide';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { notFound } from 'next/navigation';
import PurchaseButton from '../button/PurchaseButton';
import SubscribeToStockButtonContainer from '../button/SubscribeToStockButtonContainer.tsx';
import SubscribeToStockButton from '../button/SubscribeToStockButton';
import ToggleWishlistButton from '../button/ToggleWishlistButton';
import { useLocale, useTranslations } from 'next-intl';

interface ProductDetailProps {
  product: Product | undefined;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const t = useTranslations('Product.detail');

  const locale = useLocale();

  if (!product) {
    notFound();
  }

  const {
    id,
    nameEN,
    nameZH,
    images,
    sellingPrice,
    markedPrice,
    descriptionEN,
    descriptionZH,
    rating,
    commentCount,
    stock,
    tags,
  } = product;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
      <div className="md:col-span-5">
        <ImagesSlide images={images} />
      </div>
      <div className="md:col-span-7">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-base sm:text-xl md:text-2xl font-semibold text-primary-text">{name}</div>
            {description !== undefined && (
              <div className="text-sm md:text-base font-medium text-secondary-text">{splitNewLine(description)}</div>
            )}
          </div>
          {tags.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <div key={tag} className="bg-primary-bg px-2 py-0.5 text-white rounded text-xs">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-1">
              <StarBar activeStar={rating ?? 0} sizeClassName="size-4 md:size-5" />
              <div className="text-sm md:text-base font-medium text-secondary-text">({(rating ?? 0).toFixed(1)})</div>
            </div>
            <div className="text-xs font-medium text-secondary-text ">
              {t('comments', { commentCount: commentCount ?? 0 })}
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <div
              className={clsx(
                'text-xl font-semibold',
                sellingPrice !== undefined ? 'text-danger' : 'text-primary-text'
              )}
            >
              ${(sellingPrice ?? markedPrice).toFixed(2)}
            </div>
            {sellingPrice !== undefined && (
              <div className="text-sm line-through text-secondary-text">{markedPrice.toFixed(2)}</div>
            )}
          </div>
        </div>
        <div className="mt-1 space-y-3">
          <ToggleWishlistButton product={product} />
          {stock <= 0 && (
            <div className="space-y-4">
              <div className="text-sm font-medium text-secondary-text">{t('outOfStock')}</div>
              <SubscribeToStockButtonContainer productId={id}>
                <SubscribeToStockButton />
              </SubscribeToStockButtonContainer>
            </div>
          )}
          {stock > 0 && <PurchaseButton product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
