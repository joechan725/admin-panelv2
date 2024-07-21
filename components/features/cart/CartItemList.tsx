import { CartItem as CartItemModel } from '@/models/user/cartItem/CartItem';
import CartItem from './CartItem';

interface CartItemListProps {
  cartItems: CartItemModel[];
  mode: 'admin' | 'user';
}

const CartItemList = ({ cartItems, mode }: CartItemListProps) => {
  return (
    cartItems &&
    cartItems.length > 0 && (
      <div>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} mode={mode} />
        ))}
      </div>
    )
  );
};
export default CartItemList;
