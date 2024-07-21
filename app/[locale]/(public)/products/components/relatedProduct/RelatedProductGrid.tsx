import { Product } from '@/models/product/Product';
import ProductList from '../list/ProductList';

interface RelatedProductGridProps {
  relatedProducts: Product[];
}

const RelatedProductGrid = ({ relatedProducts }: RelatedProductGridProps) => {
  return (
    <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <ProductList products={relatedProducts} />
    </div>
  );
};

export default RelatedProductGrid;
