import ErrorTranslation from '@/components/form/ErrorTranslation';
import { usePaypal } from '@/lib/hooks/paypal/usePaypal';
import { PayPalButtons, PayPalMessages, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface PayPalPaymentProps {
  paypalOrderId: string;
}

const PayPalPayment = ({ paypalOrderId }: PayPalPaymentProps) => {
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
      <PayPalMessages />
      <ErrorTranslation error={error} />
    </>
  );
};

export default PayPalPayment;
