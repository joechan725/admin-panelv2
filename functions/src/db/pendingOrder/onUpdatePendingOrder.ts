import * as functions from 'firebase-functions';
import { OrderData } from '../../models/order/OrderData';
import { sendOrderConfirmationEmail } from './helpers/sendOrderConfirmationEmail';
import { emptyCartItems } from './helpers/emptyCartItems';
import { addOrder } from './helpers/addOrder';

export const onUpdatePendingOrder = functions.firestore
  .document('pendingOrders/{pendingOrderId}')
  .onUpdate(async (change, context) => {
    const { pendingOrderId } = context.params;
    const pendingOrderSnapBefore = change.before;
    const pendingOrderSnapAfter = change.after;

    const pendingOrderDataBefore = pendingOrderSnapBefore.data() as OrderData;
    const pendingOrderDataAfter = pendingOrderSnapAfter.data() as OrderData;

    if (!pendingOrderDataBefore.isPaid && pendingOrderDataAfter.isPaid) {
      const { userId } = pendingOrderDataAfter;

      // send an order confirmation email
      await sendOrderConfirmationEmail({ orderId: pendingOrderId, orderData: pendingOrderDataAfter });

      // empty user's cart items
      await emptyCartItems(userId);

      // create the order
      await addOrder({
        pendingOrderId,
        pendingOrderData: pendingOrderDataAfter,
      });
    }
  });
