'use client';

import { usePrivateProductListsListener } from '@/lib/hooks/product/usePrivateProductListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderProducts } from './searchAndOrderProducts';
import ProductTable from './ProductTable';
import { useLocale } from 'next-intl';

interface LoadProductsProps {
  onSelect?: (id: string) => void;
  selectedProductIds?: string[];
}

const LoadProducts = ({ onSelect, selectedProductIds }: LoadProductsProps) => {
  const locale = useLocale();

  const { privateProducts, error, isLoading } = usePrivateProductListsListener();
  const searchParams = useSearchParams();
  const displayProducts = searchAndOrderProducts({ searchParams, privateProducts, locale });

  return (
    <ProductTable
      displayProducts={displayProducts}
      privateProducts={privateProducts}
      isLoading={isLoading}
      error={error}
      onSelect={onSelect}
      selectedProductIds={selectedProductIds}
    />
  );
};

export default LoadProducts;
