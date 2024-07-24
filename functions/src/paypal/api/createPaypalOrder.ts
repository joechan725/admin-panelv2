import { HttpsError } from 'firebase-functions/v2/https';
import { paypalCreateOrderUrl } from '../config';
import { getPaypalAccessToken } from './getPaypalAccessToken';

interface PayPalOrderResponse {
  id: string;
}

interface CreatePaypalOrderParameters {
  amount: number;
  pendingOrderId: string;
}

export const createPaypalOrder = async ({ amount, pendingOrderId }: CreatePaypalOrderParameters) => {
  const accessToken = await getPaypalAccessToken();
  const response = await fetch(paypalCreateOrderUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'HKD',
            value: amount.toFixed(2),
          },
          reference_id: pendingOrderId,
          custom_id: pendingOrderId,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new HttpsError('internal', 'Failed to create PayPal order');
  }

  const orderData: PayPalOrderResponse = await response.json();

  const paypalOrderId = orderData.id;

  return paypalOrderId;
};
