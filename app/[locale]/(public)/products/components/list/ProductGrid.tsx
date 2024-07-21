import { Product } from '@/models/product/Product';
import ProductList from './ProductList';

interface ProductGridProps {
  children: React.ReactNode;
}

const ProductGrid = ({ children }: ProductGridProps) => {
  return <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">{children}</div>;
};

export default ProductGrid;
