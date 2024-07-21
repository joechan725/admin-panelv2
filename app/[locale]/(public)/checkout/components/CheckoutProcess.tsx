'use client';

import { useInitPayment } from '@/lib/hooks/stripe/useInitPayment';
import OrderPlacementForm from './form/placement/OrderPlacementForm';
import CheckoutForm from './form/stripe/CheckoutForm';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/stripe/config';
import Stepper from './stepper/Stepper';
import LightBorder from '@/components/layout/container/LightBorder';
import LoadUserCart from '@/components/features/cart/LoadUserCart';
import OrderedProductFrame from '@/components/features/order/orderedProductList/OrderedProductFrame';

interface CheckoutProcessProps {}

const CheckoutProcess = ({}: CheckoutProcessProps) => {
  const { clientSecret, pendingOrder, error, placeOrder } = useInitPayment();

  const appearance: Appearance = {
    theme: 'flat',
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pb-20">
      <Stepper step={clientSecret === undefined || pendingOrder === undefined ? 'payment' : 'placement'} />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-14">
        <div className="md:col-span-9">
          <LightBorder>
            {(clientSecret === undefined || pendingOrder === undefined) && <LoadUserCart />}
            {clientSecret !== undefined && pendingOrder !== undefined && (
              <OrderedProductFrame orderItems={pendingOrder.orderItems} orderId={pendingOrder.id} mode="viewOnly" />
            )}
          </LightBorder>
        </div>
        <div className="md:col-span-5">
          {(clientSecret === undefined || pendingOrder === undefined) && (
            <OrderPlacementForm placeOrder={placeOrder} error={error} />
          )}
          {clientSecret !== undefined && pendingOrder !== undefined && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm isShow={clientSecret !== undefined} pendingOrder={pendingOrder} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProcess;
