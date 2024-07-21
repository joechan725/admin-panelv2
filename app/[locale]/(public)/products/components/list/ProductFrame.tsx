import { productsPerPage } from './productsPerPage';
import ProductGrid from './ProductGrid';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import PaginationClient from '@/components/search/PaginationClient';
import { Product } from '@/models/product/Product';
import PaginationIndicatorServer from '@/components/search/PaginationIndicatorServer';
import PaginationServer from '@/components/search/PaginationServer';
import ProductList from './ProductList';
import { useTranslations } from 'next-intl';

interface ProductFrameProps {
  mode: 'client-component' | 'server-component';
  products: Product[];
  displayProducts: Product[];
  productsLength: number;
  pageNumber: number;
}

const ProductFrame = ({ mode, products, displayProducts, productsLength, pageNumber }: ProductFrameProps) => {
  const t = useTranslations('Product.searching');

  return (
    <div>
      {(!products || products.length === 0) && (
        <div className="text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {products && products.length > 0 && (!displayProducts || displayProducts.length === 0) && (
        <div className="text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ProductGrid>
        <ProductList products={displayProducts} />
      </ProductGrid>
      <div className="flex justify-between items-center mt-4 flex-wrap">
        {mode === 'server-component' && (
          <>
            <PaginationIndicatorServer
              currentPage={pageNumber}
              itemsPerPage={productsPerPage}
              itemName={t('product')}
              itemsLength={productsLength}
            />
            <PaginationServer
              redirectPath={(pageNumber: string | number) => `/products/page/${pageNumber}`}
              currentPage={pageNumber}
              theme="primary"
              itemsLength={productsLength}
              itemsPerPage={productsPerPage}
            />
          </>
        )}
        {mode === 'client-component' && (
          <>
            <PaginationIndicatorClient
              itemName={t('product')}
              itemsLength={productsLength}
              itemsPerPage={productsPerPage}
            />
            <PaginationClient theme="primary" itemsLength={productsLength} itemsPerPage={productsPerPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductFrame;
