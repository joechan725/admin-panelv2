import LoadingSpin from '@/components/loading/LoadingSpin';
import { PaymentElement } from '@stripe/react-stripe-js';
import PolicyStatement from './PolicyStatement';
import { useConfirmPayment } from '@/lib/hooks/stripe/useConfirmPayment';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useTranslations } from 'next-intl';

interface StripePaymentProps {
  pendingOrderId: string;
}

const StripePayment = ({ pendingOrderId }: StripePaymentProps) => {
  const t = useTranslations('Order.checkoutForm');

  const { confirmPayment, isLoading, message, stripe, elements } = useConfirmPayment();

  const handleConfirmPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await confirmPayment(pendingOrderId);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
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
  );
};

export default StripePayment;
