import { verifyStockPrePayment } from '@/firebase/callable/verifyStockPrePayment';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useConfirmPayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const searchParams = useSearchParams();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const loadPaymentIntent = async () => {
    if (!stripe) {
      return;
    }

    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');

    if (!paymentIntentClientSecret) {
      return;
    }

    const res = await stripe.retrievePaymentIntent(paymentIntentClientSecret);

    const paymentIntent = res.paymentIntent;

    if (!paymentIntent) {
      return;
    }

    switch (paymentIntent.status) {
      case 'succeeded':
        setMessage('paymentSucceeded');
        break;
      case 'processing':
        setMessage('paymentProcessing');
        break;
      case 'requires_payment_method':
        setMessage('paymentNotSuccessful');
        break;
      default:
        setMessage('somethingWentWrong');
        break;
    }
  };

  useEffect(() => {
    loadPaymentIntent();
  }, [stripe]);

  const confirmPayment = async (pendingOrderId?: string) => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    if (!pendingOrderId) {
      setMessage('An unexpected error occurred. Please try again later.');
      return;
    }

    try {
      await verifyStockPrePayment({ pendingOrderId });
      const currentHost = window.location.host;
      let returnUrl: string = `https://${currentHost}/checkout/confirmation/${pendingOrderId}`;
      if (currentHost === 'localhost:3000') {
        returnUrl = `http://${currentHost}/checkout/confirmation/${pendingOrderId}`;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: returnUrl,
          // return_url format:
          // https://hostname/confirmation/${orderId}?payment_intent=XXX&payment_intent_client_secret=XXX&redirect_status=succeeded by stripe
        },
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          setMessage('An unexpected error occurred.');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
    setIsLoading(false);
  };

  return { stripe, elements, message, isLoading, confirmPayment };
};
