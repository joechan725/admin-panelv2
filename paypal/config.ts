import { ReactPayPalScriptOptions } from '@paypal/react-paypal-js';

export const initOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: 'HKD',
  intent: 'capture',
  components: 'messages,buttons',
};
