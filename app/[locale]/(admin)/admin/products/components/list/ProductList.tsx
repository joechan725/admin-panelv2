import { PrivateProduct } from '@/models/product/PrivateProduct';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: PrivateProduct[] | null;
  onSelect?: (id: string) => void;
  selectedProductIds?: string[];
}

const ProductList = ({ products, onSelect, selectedProductIds }: ProductListProps) => {
  return (
    products &&
    products.length > 0 &&
    products.map((product) => (
      <ProductItem
        key={product.id}
        privateProduct={product}
        onSelect={onSelect}
        isSelect={selectedProductIds && selectedProductIds.includes(product.id)}
      />
    ))
  );
};

export default ProductList;
