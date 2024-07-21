'use client';

import { Product } from '@/models/product/Product';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter } from '@/navigation';

interface BuyNowButtonContainerProps {
  product: Product;
  children: React.ReactNode;
  quantity?: number;
}

const BuyNowButtonContainer = ({ product, children, quantity }: BuyNowButtonContainerProps) => {
  const router = useRouter();
  const { addItemToCart } = useCartStore((state) => ({ addItemToCart: state.addItemToCart }));

  const handleBuyNow = () => {
    addItemToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div role="button" onClick={handleBuyNow} className="w-full">
      {children}
    </div>
  );
};

export default BuyNowButtonContainer;
