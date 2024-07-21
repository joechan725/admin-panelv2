import { initOrderAndCreatePaymentIntent } from '@/firebase/callable/initOrderAndCreatePaymentIntent';
import { auth } from '@/firebase/config';
import { Order } from '@/models/order/Order';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import { useCartStore } from '@/stores/useCartStore';
import { useState } from 'react';

interface PlaceOrderParameters {
  formData: OrderPlacementSchema;
}

export const useInitPayment = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
  const [pendingOrder, setPendingOrder] = useState<Order | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems } = useCartStore((state) => ({
    cartItems: state.cartItems,
  }));

  const placeOrder = async ({ formData }: PlaceOrderParameters) => {
    await auth.authStateReady();
    const user = auth.currentUser;

    if (!user) {
      setError('unexpectedError');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError('emptyCart');
      return;
    }

    if (cartItems.some((cartItem) => cartItem.errorMessage)) {
      setError('invalidCartItem');
      return;
    }

    setIsLoading(true);

    try {
      const res = await initOrderAndCreatePaymentIntent({ formData });

      const data = res.data;
      setPendingOrder(data.pendingOrder);
      setClientSecret(data.clientSecret);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    placeOrder,
    clientSecret,
    pendingOrder,
  };
};
