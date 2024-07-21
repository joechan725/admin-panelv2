import { PaymentElement } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useConfirmPayment } from '@/lib/hooks/stripe/useConfirmPayment';
import LoadingSpin from '@/components/loading/LoadingSpin';
import CouponView from '@/components/features/order/detail/CouponReview';
import DeliveryOptionReview from './DeliveryOptionReview';
import PriceReview from '@/components/features/order/detail/PriceReview';
import PolicyStatement from './PolicyStatement';
import LightBorder from '@/components/layout/container/LightBorder';
import AddressReview from '@/components/features/order/detail/AddressReview';
import { Order } from '@/models/order/Order';
import { useLocale, useTranslations } from 'next-intl';

interface CheckoutFormProps {
  pendingOrder: Order;
  isShow: boolean;
}

const CheckoutForm = ({ pendingOrder, isShow }: CheckoutFormProps) => {
  const t = useTranslations('Order.checkoutForm');
  const locale = useLocale();
  const { confirmPayment, isLoading, message, stripe, elements } = useConfirmPayment();

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

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  const handleConfirmPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await confirmPayment(id);
  };

  if (!isShow) {
    return null;
  }

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
        <form className="w-full self-center" onSubmit={handleConfirmPayment}>
          <PaymentElement options={paymentElementOptions} className="mb-6" />
          <button
            disabled={isLoading || !stripe || !elements}
            className="hover:bg-opacity-85 active:bg-opacity-70 disabled:bg-opacity-70 bg-indigo-500 text-white rounded-md px-4 py-3 font-semibold transition-all shadow-md shadow-black/5 w-full flex justify-center items-center"
            type="submit"
          >
            {isLoading ? <LoadingSpin theme="white" layout="local" sizeClassName="size-6" /> : t('payNow')}
          </button>
          <PolicyStatement />
          {/* Show any error or success messages */}
          {message && <div className="font-medium text-tertiary-text pt-3 text-center">{t(message)}</div>}
        </form>
      </LightBorder>
    </div>
  );
};

export default CheckoutForm;
