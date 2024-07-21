'use client';

import { useParams } from 'next/navigation';
import CartFrame from './CartFrame';
import { useAdminUserStoredListListener } from '@/lib/hooks/user/admin/useAdminUserStoredListListener';

interface LoadAdminCartProps {}

const LoadAdminCart = ({}: LoadAdminCartProps) => {
  const params = useParams<{ userId: string }>();
  const { userId } = params;
  const { cartItems, error, isLoading } = useAdminUserStoredListListener(userId);

  const totalPrice = cartItems.reduce((accumulator, cartItem) => {
    const { quantity, sellingPrice, markedPrice } = cartItem;
    const unitPrice = sellingPrice ?? markedPrice;
    return accumulator + quantity * unitPrice;
  }, 0);

  const totalQuantity = cartItems.reduce((accumulator, cartItem) => {
    const { quantity } = cartItem;
    return accumulator + quantity;
  }, 0);

  return (
    <CartFrame
      mode="admin"
      cartItems={cartItems}
      isLoading={isLoading}
      error={error}
      totalPrice={totalPrice}
      totalQuantity={totalQuantity}
    />
  );
};

export default LoadAdminCart;
