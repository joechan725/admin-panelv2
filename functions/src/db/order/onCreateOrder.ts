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

export const onCreateOrder = functions.firestore.document('orders/{orderId}').onCreate(async (snapshot, context) => {
  const orderData = snapshot.data() as OrderData;
  const { orderId } = context.params;
  const userId = orderData.userId;

  if (orderData.isPaid) {
    await updateOrderList({ orderDataAfter: orderData, orderId, userId, mode: 'create' });

    // update the stock of product, also the revenue and sales in privateProduct
    await updateProductsRecord({ orderId, orderData, mode: 'create' });

    // update the statistic
    await updateOrderStatistic({ orderId, orderData, mode: 'increment' });

    // update the coupon usage count and usage records
    await updateCouponRecord({ orderId, orderData, mode: 'create' });

    // update the processing order count for admin page
    await updateOrderAggregator({ statusAfter: 'Paid' });

    // update the user order record
    await updateUserOrderRecord({ orderData, mode: 'paid' });

    // update the delivery option count
    await updateDeliveryOptionRecord({ orderId, orderData, mode: 'create' });

    // Send the notification
    await createOrderNotifications({ orderId, orderData, status: 'Paid' });
  }
});
