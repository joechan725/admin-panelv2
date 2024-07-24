import { onRequest } from 'firebase-functions/v2/https';
import { verifySignature } from '../../paypal/api/verifySignature';
import { emptyCartItems } from './helpers/emptyCartItems';
import { sendOrderConfirmationEmail } from './helpers/sendOrderConfirmationEmail';
import { addOrder } from './helpers/addOrder';
import { getPendingOrder } from './helpers/getPendingOrder';

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
      // get the pending order
      const pendingOrderData = await getPendingOrder(pendingOrderId);
      const { userId } = pendingOrderData;

      // create the order
      await addOrder({ pendingOrderId, pendingOrderData, amountCaptured, amountCapturedCurrent, createdAtDataString });

      // send an order confirmation email
      await sendOrderConfirmationEmail({ orderId: pendingOrderId, orderData: pendingOrderData });

      // empty user's cart items
      await emptyCartItems(userId);

      res.json({ received: true });
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
