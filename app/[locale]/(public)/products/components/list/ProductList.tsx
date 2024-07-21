import { Product } from '@/models/product/Product';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    products && products.length > 0 && products.map((product) => <ProductItem key={product.id} product={product} />)
  );
};
export default ProductList;
