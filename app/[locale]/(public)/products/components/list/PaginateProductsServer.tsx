import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import ProductFrame from './ProductFrame';
import { Product } from '@/models/product/Product';
import { productsPerPage } from './productsPerPage';
import { notFound } from 'next/navigation';

interface PaginateProductsServerProps {
  products: Product[];
  pageNumber: number;
}

const PaginateProductsServer = ({ products, pageNumber }: PaginateProductsServerProps) => {
  const displayProducts = sliceObjectsByPage(products, pageNumber, productsPerPage);
  if ((!displayProducts || displayProducts.length === 0) && pageNumber !== 1) {
    notFound();
  }

  const productsLength = products.length;

  return (
    <ProductFrame
      products={products}
      pageNumber={pageNumber}
      mode="server-component"
      displayProducts={displayProducts}
      productsLength={productsLength}
    />
  );
};

export default PaginateProductsServer;
