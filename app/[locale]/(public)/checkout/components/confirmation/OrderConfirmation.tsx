'use client';

import GeneralInformation from './GeneralInformation';
import DeliveryDetail from './DeliveryDetail';
import LightBorder from '@/components/layout/container/LightBorder';
import CouponReview from '@/components/features/order/detail/CouponReview';
import PriceReview from '@/components/features/order/detail/PriceReview';
import OrderedProductFrame from '@/components/features/order/orderedProductList/OrderedProductFrame';
import { Order } from '@/models/order/Order';

interface OrderConfirmationProps {
  order: Order;
}

const OrderConfirmation = ({ order }: OrderConfirmationProps) => {
  const { id, couponsUsed, amountToPay, deliveryChargeAtThisOrder, discountAmount, totalPriceBeforeDiscount } = order;

  return (
    <div className="space-y-8">
      <LightBorder>
        <GeneralInformation order={order} />
      </LightBorder>
      <LightBorder>
        <DeliveryDetail order={order} />
      </LightBorder>
      <div className="grid grid-cols-1 md:grid-cols-14 gap-8">
        <div className="md:col-span-9">
          <LightBorder>
            <OrderedProductFrame orderItems={order.orderItems} orderId={id} mode="viewOnly" />
          </LightBorder>
        </div>
        <div className="md:col-span-5">
          <div className="space-y-8">
            {couponsUsed && couponsUsed.length > 0 && (
              <LightBorder>
                <CouponReview couponsUsed={couponsUsed} discountAmount={discountAmount} />
              </LightBorder>
            )}
            <LightBorder>
              <PriceReview
                amountToPay={amountToPay}
                deliveryChargeAtThisOrder={deliveryChargeAtThisOrder}
                discountAmount={discountAmount}
                totalPriceBeforeDiscount={totalPriceBeforeDiscount}
              />
            </LightBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
