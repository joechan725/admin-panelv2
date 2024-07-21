import ImageShow from '@/components/ui/image/ImageShow';
import { Product } from '@/models/product/Product';
import clsx from 'clsx/lite';
import StarBar from '@/components/ui/StarBar';
import AddToCartButtonContainer from '../button/AddToCartButtonContainer';
import AddToCartButton from '../button/AddToCartButton';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import SubscribeToStockButtonContainer from '../button/SubscribeToStockButtonContainer.tsx';
import SubscribeToStockButton from '../button/SubscribeToStockButton';
import ToggleWishlistButton from '../button/ToggleWishlistButton';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const t = useTranslations('Product.card');
  const locale = useLocale();

  const {
    id,
    nameEN,
    nameZH,
    descriptionEN,
    descriptionZH,
    images,
    sellingPrice,
    markedPrice,
    tags,
    rating = 0,
    commentCount = 0,
    stock,
  } = product;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;

  return (
    <div className="max-w-sm w-full rounded-md shadow-lg bg-white flex flex-col">
      <Link
        href={`/products/${id}`}
        className="flex-1 flex flex-col w-full px-6 pt-6 group transition-all hover:opacity-85 active:opacity-70"
      >
        <div className="relative">
          <ImageShow
            image={images?.[0]}
            sizeClassName="w-full aspect-square"
            roundedClassName="rounded-md"
            className={clsx(stock <= 0 && 'opacity-30')}
          />
          {stock <= 0 && (
            <div className="absolute bottom-0 right-0 px-2 py-1 bg-primary-bg rounded-md text-xs font-medium text-white">
              {t('outOfStock')}
            </div>
          )}
        </div>
        <div className="mt-4 mb-2 flex-1">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary-text group-hover:underline underline-offset-1 line-clamp-2 text-ellipsis">
              {name}
            </div>
            {description !== undefined && (
              <div className="text-xs font-medium text-secondary-text max-w-full h-12 text-ellipsis line-clamp-3">
                {splitNewLine(description)}
              </div>
            )}
          </div>
        </div>
        <div className="mb-2">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 overflow-hidden">
              {tags.slice(0, 3).map((tag) => (
                <div key={tag} className="bg-primary-bg px-2 py-0.5 text-white rounded text-xs">
                  {tag}
                </div>
              ))}
              {tags.length > 3 && <div className="bg-primary-bg px-2 py-0.5 text-white rounded text-xs">...</div>}
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-between items-end">
          <div>
            <div className="flex items-center gap-1">
              <StarBar activeStar={rating} sizeClassName="size-4" />
              <div className="text-xs font-medium text-secondary-text">({rating.toFixed(1)})</div>
            </div>
            <div className="text-xs text-secondary-text font-medium">{t('commentCount', { commentCount })}</div>
          </div>
          <div className="text-right">
            {sellingPrice !== undefined && (
              <div className="text-xs line-through text-secondary-text">{markedPrice.toFixed(2)}</div>
            )}
            <div
              className={clsx(
                'font-semibold text-base',
                sellingPrice !== undefined ? 'text-danger' : 'text-primary-text'
              )}
            >
              ${(sellingPrice ?? markedPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </Link>
      {stock <= 0 && (
        <div className="space-y-0">
          <div className="flex justify-center">
            <ToggleWishlistButton product={product} />
          </div>
          <SubscribeToStockButtonContainer productId={id}>
            <SubscribeToStockButton roundedClassName="rounded-b-md" />
          </SubscribeToStockButtonContainer>
        </div>
      )}
      {stock > 0 && (
        <div className="space-y-0">
          <div className="flex justify-center">
            <ToggleWishlistButton product={product} />
          </div>
          <AddToCartButtonContainer product={product}>
            <AddToCartButton roundedClassName="rounded-b-md" />
          </AddToCartButtonContainer>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
