'use client';

import { useCartStore } from '@/stores/useCartStore';
import CartFrame from './CartFrame';

interface LoadUserCartProps {
  sizeClassName?: string;
}

const LoadUserCart = ({ sizeClassName }: LoadUserCartProps) => {
  const { cartItems, isLoading, loadingError, totalPrice, totalQuantity } = useCartStore((state) => ({
    cartItems: state.cartItems,
    isLoading: state.isLoading,
    loadingError: state.loadingError,
    totalPrice: state.totalPrice,
    totalQuantity: state.totalQuantity,
  }));

  return (
    <CartFrame
      mode="user"
      cartItems={cartItems}
      isLoading={isLoading}
      error={loadingError}
      totalPrice={totalPrice}
      totalQuantity={totalQuantity}
      sizeClassName={sizeClassName}
    />
  );
};

export default LoadUserCart;
