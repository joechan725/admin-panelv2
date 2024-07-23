import { initOptions } from '@/paypal/config';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalProviderProps {
  children: React.ReactNode;
}

const PayPalProvider = ({ children }: PayPalProviderProps) => {
  return (
    <form className="w-full self-center">
      <PayPalScriptProvider options={initOptions}>{children}</PayPalScriptProvider>
    </form>
  );
};

export default PayPalProvider;
