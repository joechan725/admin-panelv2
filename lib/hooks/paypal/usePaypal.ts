import { initOrderWithPaypal } from '@/firebase/callable/initOrderWithPaypal';
import { auth } from '@/firebase/config';
import { Order } from '@/models/order/Order';
import { useRouter } from '@/navigation';
import { OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import { useCartStore } from '@/stores/useCartStore';
import { PayPalButtonsComponentProps } from '@paypal/react-paypal-js';
import { useState } from 'react';

interface PlaceOrderParameters {
  formData: OrderPlacementSchema;
}

export const usePaypal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const [pendingOrder, setPendingOrder] = useState<undefined | Order>(undefined);
  const [paypalOrderId, setPaypalOrderId] = useState<undefined | string>(undefined);

  const router = useRouter();

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
      const res = await initOrderWithPaypal({ formData });

      const data = res.data;
      setPendingOrder(data.pendingOrder);
      setPaypalOrderId(data.paypalOrderId);
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

  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data, actions) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const details = await actions.order?.capture();
      const id = details?.purchase_units?.[0].reference_id;
      router.push(`/checkout/confirmation/${id}`);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  return {
    isLoading,
    isWriting,
    error,
    pendingOrder,
    paypalOrderId,
    placeOrder,
    onApprove,
  };
};
