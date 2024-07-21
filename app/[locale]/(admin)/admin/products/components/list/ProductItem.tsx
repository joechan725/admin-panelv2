import Edit from '@/components/icon/Edit';
import Eye from '@/components/icon/Eye';
import ImageShow from '@/components/ui/image/ImageShow';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import ProductTogglePublic from './ProductTogglePublic';
import ProductDeleteButton from './ProductDeleteButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { formatDate } from '@/lib/helpers/date/formatDate';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import { clsx } from 'clsx/lite';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import IconButton from '@/components/ui/button/IconButton';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';

interface ProductItemProps {
  privateProduct: PrivateProduct;
  onSelect?: (id: string) => void;
  isSelect?: boolean;
}

const ProductItem = ({ privateProduct, isSelect, onSelect }: ProductItemProps) => {
  const t = useTranslations('Product.list');
  const locale = useLocale();

  const {
    id,
    images,
    nameEN,
    nameZH,
    descriptionEN,
    descriptionZH,
    brandNameEN,
    brandNameZH,
    collectionNameEN,
    collectionNameZH,
    categoryNameEN,
    categoryNameZH,
    sellingPrice,
    markedPrice,
    tags,
    stock,
    sales = 0,
    revenue = 0,
    commentCount,
    rating = 0,
    updatedAt,
    createdAt,
  } = privateProduct;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const brandName = locale === 'en' ? brandNameEN : brandNameZH;
  const collectionName = locale === 'en' ? collectionNameEN : collectionNameZH;
  const categoryName = locale === 'en' ? categoryNameEN : categoryNameZH;

  return (
    <TrBody>
      {onSelect && (
        <Td>
          <input
            type="checkbox"
            checked={isSelect}
            onClick={() => onSelect(id)}
            className="size-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring"
          />
        </Td>
      )}

      {/* product */}
      <Td>
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
      </Td>

      {/* collection */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">{collectionName ?? 'N/A'}</div>
      </Td>

      {/* category */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">{categoryName ?? 'N/A'}</div>
      </Td>

      {/* brand */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">{brandName ?? 'N/A'}</div>
      </Td>

      {/* price */}
      <Td>
        <div
          className={clsx(
            'font-medium text-secondary-text',
            sellingPrice === undefined && 'text-sm',
            sellingPrice !== undefined && 'text-xs line-through'
          )}
        >
          {sellingPrice === undefined && '$'}
          {markedPrice.toFixed(2)}
        </div>
        {sellingPrice !== undefined && (
          <div className="text-sm font-semibold text-red-600">${sellingPrice.toFixed(2)}</div>
        )}
      </Td>

      {/* stock */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">{stock}</div>
      </Td>

      {/* tags */}
      <Td>
        {!tags || (tags.length === 0 && <div className="text-secondary-text text-sm font-medium">N/A</div>)}
        {tags && tags.length > 0 && (
          <>
            <div className="flex flex-wrap items-center gap-1 max-w-36 max-h-16 overflow-auto scrollbar scrollbar-slate">
              {tags.map((tag) => (
                <div className="px-2 py-0.5 bg-primary-bg text-white rounded text-sm" key={tag}>
                  {tag}
                </div>
              ))}
            </div>
          </>
        )}
      </Td>

      {/* sales */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{sales}</div>
      </Td>

      {/* revenue */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">${revenue.toFixed(2)}</div>
      </Td>

      {/* commentCount & Rating */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">
          <span>{commentCount ?? 0}</span>
          <span className="text-sm ml-2">({rating.toFixed(1)})</span>
        </div>
      </Td>

      {/* time */}
      <Td>
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-secondary-text">{t('updatedAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {updatedAt ? formatDate(updatedAt, 'short') : 'N/A'}
          </div>
          <div className="text-xs font-medium text-secondary-text">{t('createdAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {createdAt ? formatDate(createdAt, 'short') : 'N/A'}
          </div>
        </div>
      </Td>

      {/* published? */}
      <Td>
        <ProductTogglePublic privateProduct={privateProduct} />
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message={t('view')}>
            <IconButton disabled={false} type="button" theme="secondary">
              <Link href={`/products/${id}`}>
                <Eye sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <HoverPopup message={t('edit')}>
            <IconButton disabled={false} type="button" theme="secondary">
              <Link href={`/admin/products/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <ProductDeleteButton privateProduct={privateProduct} />
        </div>
      </Td>
    </TrBody>
  );
};

export default ProductItem;
