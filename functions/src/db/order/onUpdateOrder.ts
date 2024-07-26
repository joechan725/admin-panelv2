import * as functions from 'firebase-functions';
import { updateOrderStatistic } from './helpers/updateOrderStatistic';
import { updateCouponRecord } from './helpers/updateCouponRecord';
import { updateProductsRecord } from './helpers/updateProductsRecord';
import { updateOrderAggregator } from './helpers/updateOrderAggregator';
import { updateUserOrderRecord } from './helpers/updateUserOrderRecord';
import { createOrderNotifications } from './helpers/createOrderNotifications';
import { updateDeliveryOptionRecord } from './helpers/updateDeliveryOptionRecord';
import { updateOrderList } from './helpers/updateOrderList';
import { OrderData } from '../../models/order/OrderData';
import { sendOrderMessageToDiscord } from './helpers/sendOrderMessageToDiscord';

export const onUpdateOrder = functions.firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
  const orderSnapBefore = change.before;
  const orderSnapAfter = change.after;

  const orderDataBefore = orderSnapBefore.data() as OrderData;
  const orderDataAfter = orderSnapAfter.data() as OrderData;

  const { orderId } = context.params;
  const userId = orderDataAfter.userId;

  await updateOrderList({ orderDataBefore, orderDataAfter, orderId, userId, mode: 'update' });

  if (orderDataBefore.status !== orderDataAfter.status) {
    // Send the notification
    await createOrderNotifications({ orderId, orderData: orderDataAfter, status: orderDataAfter.status });
    // Send discord notification
    await sendOrderMessageToDiscord({ orderId, orderData: orderDataAfter, status: orderDataAfter.status });
    // update the processing order count
    await updateOrderAggregator({ statusBefore: orderDataBefore.status, statusAfter: orderDataAfter.status });
  }

  if (orderDataAfter.amountRefunded !== undefined && orderDataAfter.amountRefunded >= orderDataAfter.amountToPay) {
    // The order is refunded
    // update the stock of product, also the revenue and sales in privateProduct
    await updateProductsRecord({ orderId, orderData: orderDataAfter, mode: 'delete' });

    // update the statistic
    await updateOrderStatistic({ orderId, mode: 'decrement', orderData: orderDataAfter, date: orderDataAfter.paidAt });

    // delete the coupon usage count and usage records
    await updateCouponRecord({ orderId, orderData: orderDataAfter, mode: 'delete' });

    // update the user order record
    await updateUserOrderRecord({ orderData: orderDataAfter, mode: 'delete' });

    // update the delivery option count
    await updateDeliveryOptionRecord({ orderId, orderData: orderDataAfter, mode: 'delete' });
  }
});
