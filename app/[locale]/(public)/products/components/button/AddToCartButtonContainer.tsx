'use client';

import { Product } from '@/models/product/Product';
import { useCartStore } from '@/stores/useCartStore';

interface AddToCartButtonContainerProps {
  product: Product;
  children: React.ReactNode;
  quantity?: number;
}

const AddToCartButtonContainer = ({ product, children, quantity }: AddToCartButtonContainerProps) => {
  const { addItemToCart } = useCartStore((state) => ({ addItemToCart: state.addItemToCart }));

  const handleAddItemToCart = () => {
    addItemToCart(product, quantity);
  };

  return (
    <div role="button" onClick={handleAddItemToCart} className="w-full">
      {children}
    </div>
  );
};

export default AddToCartButtonContainer;
