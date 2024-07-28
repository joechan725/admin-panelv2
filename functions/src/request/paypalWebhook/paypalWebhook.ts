import { onRequest } from 'firebase-functions/v2/https';
import { verifySignature } from '../../paypal/api/verifySignature';
import { updatePendingOrder } from './helpers/updatePendingOrder';

export const paypalWebhook = onRequest(async (req, res) => {
  if (req.method === 'POST') {
    const event = req.body;

    // Verify the webhook event with PayPal
    const isValid = await verifySignature(req);

    if (!isValid) {
      res.status(403).end('The signature verification failed.');
      return;
    }

    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const resource = event.resource;
      const customId = resource.custom_id;
      const amountCaptured = resource.amount.value;
      const amountCapturedCurrent = resource.amount.currency_code;
      const createdAtDataString = resource.create_time;

      const pendingOrderId = customId;
      // update the pending order
      await updatePendingOrder({ pendingOrderId, amountCaptured, amountCapturedCurrent, createdAtDataString });

      res.status(200).json({ received: true });
      return;
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
