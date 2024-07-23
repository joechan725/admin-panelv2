import { onRequest } from 'firebase-functions/v2/https';
import { verifySignature } from './helpers/verifySignature';

export const paypalWebhook = onRequest(async (req, res) => {
  if (req.method === 'POST') {
    const event = req.body;
    console.log(event);

    // Verify the webhook event with PayPal
    const isValid = await verifySignature(req);

    if (!isValid) {
      res.status(403).end('The signature verification failed.');
      return;
    }

    console.log('log');
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const customId = event.resource.custom_id;
      const orderId = customId;
      console.log({ customId, orderId });
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
