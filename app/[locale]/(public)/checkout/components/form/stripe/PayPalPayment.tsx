import ErrorTranslation from '@/components/form/ErrorTranslation';
import { usePaypal } from '@/lib/hooks/paypal/usePaypal';
import { PayPalButtons, PayPalMessages, usePayPalScriptReducer } from '@paypal/react-paypal-js';
interface PayPalPaymentProps {
  pendingOrderId: string;
  amountToPay: number;
}

const PayPalPayment = ({ pendingOrderId, amountToPay }: PayPalPaymentProps) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const { getCreateOrder, onApprove, error, isWriting } = usePaypal();

  return (
    <>
      <PayPalButtons
        style={{ color: 'blue' }}
        disabled={isPending || isWriting}
        createOrder={getCreateOrder({ amountToPay, pendingOrderId })}
        onApprove={onApprove}
      />
      <PayPalMessages />
      <ErrorTranslation error={error} />
    </>
  );
};

export default PayPalPayment;
