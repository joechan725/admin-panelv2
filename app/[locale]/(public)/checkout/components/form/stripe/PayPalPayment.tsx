import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { usePaypal } from '@/lib/hooks/paypal/usePaypal';
import { PayPalButtons, PayPalMessages, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useTranslations } from 'next-intl';

interface PayPalPaymentProps {
  paypalOrderId: string;
}

const PayPalPayment = ({ paypalOrderId }: PayPalPaymentProps) => {
  const t = useTranslations('Order.checkoutForm');

  const [{ isPending }] = usePayPalScriptReducer();

  const { onApprove, error, isWriting } = usePaypal();

  return (
    <>
      <PayPalButtons
        style={{ color: 'blue' }}
        disabled={isPending || isWriting}
        createOrder={async () => paypalOrderId}
        onApprove={onApprove}
      />
      {isWriting && (
        <div className="flex gap-2 justify-center items-center">
          <LoadingSpin layout="local" theme="safe" sizeClassName="size-6" />
          <div className="text-sm font-medium text-secondary-text">{t('loading')}</div>
        </div>
      )}
      <PayPalMessages />
      <ErrorTranslation error={error} />
    </>
  );
};

export default PayPalPayment;
