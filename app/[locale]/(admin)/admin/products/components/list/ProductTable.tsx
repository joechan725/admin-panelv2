'use client';

import Th from '@/components/table/Th';
import PaginationClient from '@/components/search/PaginationClient';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import ProductSkeleton from './ProductSkeleton';
import TrHead from '@/components/table/TrHead';
import ProductList from './ProductList';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import { useTranslations } from 'next-intl';

interface ProductTableProps {
  onSelect?: (id: string) => void;
  selectedProductIds?: string[];
  isLoading: boolean;
  displayProducts: PrivateProduct[];
  privateProducts: PrivateProduct[];
  error?: string;
}

const ProductTable = ({
  onSelect,
  selectedProductIds,
  isLoading,
  displayProducts,
  privateProducts,
  error,
}: ProductTableProps) => {
  const t = useTranslations('Product.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <TrHead>
            {onSelect && <th className="p-2"></th>}
            <Th searchParamsValue="product">{t('product')}</Th>
            <Th searchParamsValue="collection">{t('collection')}</Th>
            <Th searchParamsValue="category">{t('category')}</Th>
            <Th searchParamsValue="brand">{t('brand')}</Th>
            <Th searchParamsValue="price">{t('price')}</Th>
            <Th searchParamsValue="stock">{t('stock')}</Th>
            <Th>{t('tags')}</Th>
            <Th searchParamsValue="sales">{t('sales')}</Th>
            <Th searchParamsValue="revenue">{t('revenue')}</Th>
            <Th searchParamsValue="comment">
              <div>{t('comment')}</div>
              <div className="text-xs">({t('rating')})</div>
            </Th>
            <Th searchParamsValue="updatedAt">{t('time')}</Th>
            <Th searchParamsValue="isPublic">{t('published')}</Th>
            <Th>{t('actions')}</Th>
          </TrHead>
        </thead>
        <tbody>
          {isLoading && <ProductSkeleton />}
          {!isLoading && (
            <ProductList products={displayProducts} onSelect={onSelect} selectedProductIds={selectedProductIds} />
          )}
        </tbody>
      </table>
      {(!privateProducts || privateProducts.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {privateProducts && privateProducts.length > 0 && (!displayProducts || displayProducts.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={privateProducts?.length} />
        <PaginationClient theme="primary" itemsLength={privateProducts?.length} />
      </div>
    </div>
  );
};

export default ProductTable;
