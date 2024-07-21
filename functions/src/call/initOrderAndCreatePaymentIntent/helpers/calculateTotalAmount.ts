import { CartItemData } from '../../../models/user/cartItem/CartItemData';

export const calculateTotalAmount = (cartItems: (CartItemData & { id: string })[]) => {
  const totalPriceInDollar = cartItems.reduce((accumulator, cartItem) => {
    const { quantity, markedPrice, sellingPrice } = cartItem;
    const unitPrice = sellingPrice ?? markedPrice;

    if (cartItem.errorMessage) {
      return accumulator;
    }
    return accumulator + quantity * unitPrice;
  }, 0);

  const totalPriceInCents = totalPriceInDollar * 100;

  const totalQuantity = cartItems.reduce((accumulator, cartItem) => {
    if (cartItem.errorMessage) {
      return accumulator;
    }
    return accumulator + cartItem.quantity;
  }, 0);

  return { totalPriceInDollar, totalPriceInCents, totalQuantity };
};
