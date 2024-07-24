'use client';

import { useInitPayment } from '@/lib/hooks/stripe/useInitPayment';
import OrderPlacementForm from './form/placement/OrderPlacementForm';
import CheckoutForm from './form/stripe/CheckoutForm';
import Stepper from './stepper/Stepper';
import LightBorder from '@/components/layout/container/LightBorder';
import LoadUserCart from '@/components/features/cart/LoadUserCart';
import OrderedProductFrame from '@/components/features/order/orderedProductList/OrderedProductFrame';
import { usePaypal } from '@/lib/hooks/paypal/usePaypal';

interface CheckoutProcessProps {}

const CheckoutProcess = ({}: CheckoutProcessProps) => {
  // const { clientSecret, pendingOrder, error, placeOrder } = useInitPayment();
  const { placeOrder, error, pendingOrder, paypalOrderId } = usePaypal();

  return (
    <div className="pb-20">
      <Stepper step={pendingOrder === undefined ? 'placement' : 'payment'} />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-14">
        <div className="md:col-span-9">
          <LightBorder>
            {pendingOrder === undefined && <LoadUserCart />}
            {pendingOrder !== undefined && (
              <OrderedProductFrame orderItems={pendingOrder.orderItems} orderId={pendingOrder.id} mode="viewOnly" />
            )}
          </LightBorder>
        </div>
        <div className="md:col-span-5">
          {pendingOrder === undefined && <OrderPlacementForm placeOrder={placeOrder} error={error} />}
          {pendingOrder !== undefined && paypalOrderId !== undefined && (
            <CheckoutForm paypalOrderId={paypalOrderId} pendingOrder={pendingOrder} paymentMethod="paypal" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProcess;
