import { stripePromise } from '@/stripe/config';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';

interface StripeProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

const StripeProvider = ({ clientSecret, children }: StripeProviderProps) => {
  const appearance: Appearance = {
    theme: 'flat',
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
