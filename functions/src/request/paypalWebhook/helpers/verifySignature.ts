import { Request } from 'firebase-functions/v2/https';
import { paypalVerifyUrl, webhookId } from '../../../paypal/config';
import { getPayPalAccessToken } from './getPayPalAccessToken';

export const verifySignature = async (req: Request) => {
  const transmissionId = req.get('paypal-transmission-id');
  const transmissionTime = req.get('paypal-transmission-time');
  const certUrl = req.get('paypal-cert-url');
  const authAlgo = req.get('paypal-auth-algo');
  const transmissionSig = req.get('paypal-transmission-sig');

  const requestBody = {
    auth_algo: authAlgo,
    cert_url: certUrl,
    transmission_id: transmissionId,
    transmission_sig: transmissionSig,
    transmission_time: transmissionTime,
    webhook_id: webhookId,
    webhook_event: req.body,
  };

  const accessToken = await getPayPalAccessToken();

  const verifyResponse = await fetch(paypalVerifyUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const verifyResult = await verifyResponse.json();

  return verifyResult?.verification_status === 'SUCCESS';
};
