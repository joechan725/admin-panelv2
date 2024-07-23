import CouponView from '@/components/features/order/detail/CouponReview';
import DeliveryOptionReview from './DeliveryOptionReview';
import PriceReview from '@/components/features/order/detail/PriceReview';
import LightBorder from '@/components/layout/container/LightBorder';
import AddressReview from '@/components/features/order/detail/AddressReview';
import { Order } from '@/models/order/Order';
import { useLocale } from 'next-intl';
import PayPalPayment from './PayPalPayment';
import StripeProvider from './StripeProvider';
import StripePayment from './StripePayment';
import PayPalProvider from './PayPalProvider';

type CheckoutFormProps = StripeCheckoutFormProps | PaypalCheckoutFormProps;

interface StripeCheckoutFormProps {
  paymentMethod: 'stripe';
  clientSecret: string;
  pendingOrder: Order;
}

interface PaypalCheckoutFormProps {
  paymentMethod: 'paypal';
  clientSecret?: undefined;
  pendingOrder: Order;
}

const CheckoutForm = ({ paymentMethod, clientSecret, pendingOrder }: CheckoutFormProps) => {
  const locale = useLocale();

  const {
    id,
    contactName,
    contactPhoneNumber,
    deliveryDetailAddress,
    deliveryDistrict,
    deliveryRegion,
    isPickUp,
    addressRemark,
    storeName,
    storePhoneNumber,
    storeBusinessHours,
    deliveryOptionNameEN,
    deliveryOptionNameZH,
    deliveryOptionDescriptionEN,
    deliveryOptionDescriptionZH,
    deliveryOptionFreeDeliveryThreshold,
    deliveryOptionEstimatedTimeZH,
    deliveryOptionEstimatedTimeEN,
    deliveryOptionDeliveryCharge,
    deliveryOptionDeliveryProviderZH,
    deliveryOptionDeliveryProviderEN,
    deliveryChargeAtThisOrder,
    couponsUsed,
    discountAmount,
    totalPriceBeforeDiscount,
    amountToPay,
  } = pendingOrder;

  const deliveryOptionName = locale === 'en' ? deliveryOptionNameEN : deliveryOptionNameZH;
  const deliveryOptionDescription = locale === 'en' ? deliveryOptionDescriptionEN : deliveryOptionDescriptionZH;
  const deliveryOptionDeliveryProvider =
    locale === 'en' ? deliveryOptionDeliveryProviderEN : deliveryOptionDeliveryProviderZH;
  const deliveryOptionEstimatedTime = locale === 'en' ? deliveryOptionEstimatedTimeEN : deliveryOptionEstimatedTimeZH;

  return (
    <div className="space-y-8">
      <LightBorder>
        <DeliveryOptionReview
          isPickUp={isPickUp}
          name={deliveryOptionName}
          description={deliveryOptionDescription}
          freeDeliveryThreshold={deliveryOptionFreeDeliveryThreshold}
          estimatedTime={deliveryOptionEstimatedTime}
          deliveryCharge={deliveryOptionDeliveryCharge}
          deliveryProvider={deliveryOptionDeliveryProvider}
          deliveryChargeAtThisOrder={deliveryChargeAtThisOrder}
        />
      </LightBorder>
      <LightBorder>
        <AddressReview
          contactName={contactName}
          contactPhoneNumber={contactPhoneNumber}
          detailAddress={deliveryDetailAddress}
          district={deliveryDistrict}
          region={deliveryRegion}
          isPickUp={isPickUp}
          addressRemark={addressRemark}
          storeName={storeName}
          storePhoneNumber={storePhoneNumber}
          storeBusinessHours={storeBusinessHours}
        />
      </LightBorder>
      {couponsUsed && couponsUsed.length > 0 && (
        <LightBorder>
          <CouponView couponsUsed={couponsUsed} discountAmount={discountAmount} />
        </LightBorder>
      )}
      <LightBorder>
        <PriceReview
          discountAmount={discountAmount}
          totalPriceBeforeDiscount={totalPriceBeforeDiscount}
          amountToPay={amountToPay}
          deliveryChargeAtThisOrder={deliveryChargeAtThisOrder}
        />
      </LightBorder>
      <LightBorder>
        {paymentMethod === 'stripe' && (
          <StripeProvider clientSecret={clientSecret}>
            <StripePayment pendingOrderId={id} />
          </StripeProvider>
        )}
        {paymentMethod === 'paypal' && (
          <PayPalProvider>
            <PayPalPayment pendingOrderId={id} amountToPay={amountToPay} />
          </PayPalProvider>
        )}
      </LightBorder>
    </div>
  );
};

export default CheckoutForm;
