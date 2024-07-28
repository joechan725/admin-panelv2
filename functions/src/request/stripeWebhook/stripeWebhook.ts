import { onRequest } from 'firebase-functions/v2/https';
import { stripe, webhookSecret } from '../../stripe/config';
import { handleRefundUpdate } from './helpers/handleRefundUpdate';
import { updatePendingOrder } from './helpers/updatePendingOrder';

// Reference: https://dev.to/perennialautodidact/connecting-stripe-webhooks-to-firebase-cloud-functions-on-localhost-using-localtunnel-55o9#stripe-event-cloud-function
export const stripeWebhook = onRequest({ cors: [/stripe\.com$/] }, async (req, res) => {
  if (req.method === 'POST') {
    const signature = req.headers['stripe-signature'] as string;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(`Webhook Error: ${error?.message}`);
        return;
      }
      res.status(400).send(`Webhook Error`);
      return;
    }

    if (event.type === 'charge.succeeded') {
      try {
        const charge = event.data.object;

        // get the order id from metadata
        const pendingOrderId = charge.metadata?.pendingOrderId;

        // create the order
        await updatePendingOrder({ pendingOrderId, charge });

        res.json({ received: true });
        return;
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).send(`Webhook Error: ${error?.message}`);
          return;
        }
        res.status(400).send(`Webhook Error: unexpected error`);
        return;
      }
    }

    if (event.type === 'charge.refund.updated') {
      try {
        const refund = event.data.object;
        await handleRefundUpdate({ refund });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).send(`Webhook Error: ${error?.message}`);
          return;
        }
        res.status(400).send(`Webhook Error: unexpected error`);
        return;
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
