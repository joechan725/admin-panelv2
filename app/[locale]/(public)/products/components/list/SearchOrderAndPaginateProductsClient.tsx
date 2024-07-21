'use client';

import ProductFrame from './ProductFrame';
import { Product } from '@/models/product/Product';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderProducts } from './searchAndOrderProducts';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { productsPerPage } from './productsPerPage';
import { useLocale } from 'next-intl';

interface SearchOrderAndPaginateProductsClientProps {
  products: Product[];
}

const SearchOrderAndPaginateProductsClient = ({ products }: SearchOrderAndPaginateProductsClientProps) => {
  const locale = useLocale();

  const searchParams = useSearchParams();

  const itemsPerPage = +(searchParams.get('limit') ?? productsPerPage);
  const pageNumber = +(searchParams.get('page') ?? 1);

  const searchedProducts = searchAndOrderProducts({ products, searchParams, locale });
  const productsLength = searchedProducts.length;

  const displayProducts = sliceObjectsByPage(searchedProducts, pageNumber, itemsPerPage);

  return (
    <ProductFrame
      products={products}
      pageNumber={pageNumber}
      mode="client-component"
      displayProducts={displayProducts}
      productsLength={productsLength}
    />
  );
};

export default SearchOrderAndPaginateProductsClient;
