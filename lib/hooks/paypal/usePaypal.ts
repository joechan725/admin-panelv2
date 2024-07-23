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

interface getCreateOrderParameters {
  pendingOrderId: string;
  amountToPay: number;
}

export const usePaypal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<undefined | Order>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);

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

  const getCreateOrder = ({
    pendingOrderId,
    amountToPay,
  }: getCreateOrderParameters): PayPalButtonsComponentProps['createOrder'] => {
    const createOrder: PayPalButtonsComponentProps['createOrder'] = async (data, actions) => {
      setIsWriting(true);
      setError(undefined);
      try {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'HKD',
                value: amountToPay.toFixed(2),
              },
              reference_id: pendingOrderId,
              custom_id: pendingOrderId,
            },
          ],
        });
      } catch (error) {
        setError('unexpectedError');
        return '';
      } finally {
        setIsWriting(false);
      }
    };
    return createOrder;
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
    placeOrder,
    getCreateOrder,
    onApprove,
  };
};
