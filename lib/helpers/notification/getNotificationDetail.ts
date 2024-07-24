import { Notification } from '@/models/user/notification/Notification';
import { TranslationFunction } from '@/types/TranslationFunction';

interface GetNotificationDetailParameters {
  notification: Notification;
  userFullName: string;
  tNotification: TranslationFunction;
}

export const getNotificationDetail = ({
  notification,
  userFullName,
  tNotification,
}: GetNotificationDetailParameters) => {
  let title: string | undefined = undefined;
  let content: string | undefined = undefined;
  let href: string | undefined = undefined;

  const { category, orderId, productId, productName, type, amountToPay, totalQuantity, userFirstName, userLastName } =
    notification;

  switch (category) {
    case 'Back in Stock':
      href = `/products/${productId}`;
      title = tNotification('backInStock.title', { productName });
      content = tNotification('backInStock.content', { productName });
      break;
    case 'Order':
      switch (type) {
        case 'user-Paid':
          href = `/orders/${orderId}`;
          title = tNotification('order.userPaid.title', { orderId });
          content = tNotification('order.userPaid.content', { totalQuantity, amountToPay: amountToPay?.toFixed(2) });
          break;

        case 'admin-Paid':
          href = `/admin/orders/${orderId}`;
          title = tNotification('order.adminPaid.title', { userFullName, orderId });
          content = tNotification('order.adminPaid.content', { totalQuantity, amountToPay: amountToPay?.toFixed(2) });
          break;

        case 'user-Delivering':
          href = `/orders/${orderId}`;
          title = tNotification('order.userDelivering.title');
          content = tNotification('order.userDelivering.content', { orderId });
          break;

        case 'user-Delivered':
          title = tNotification('order.userDelivered.title');
          content = tNotification('order.userDelivered.content', { orderId });
          href = `/orders/${orderId}`;
          break;

        case 'user-Ready for Pickup':
          href = `/orders/${orderId}`;
          title = tNotification('order.userReadyForPickup.title');
          content = tNotification('order.userReadyForPickup.content', { orderId });
          break;

        case 'user-Picked Up':
          href = `/orders/${orderId}`;
          title = tNotification('order.userPickedUp.title');
          content = tNotification('order.userPickedUp.content', { orderId });
          break;

        case 'user-Application for Refund':
          href = `/orders/${orderId}`;
          title = tNotification('order.userApplicationForRefund.title');
          content = tNotification('order.userApplicationForRefund.content', { orderId });
          break;

        case 'admin-Application for Refund':
          href = `/admin/orders/${orderId}`;
          title = tNotification('order.adminApplicationForRefund.title');
          content = tNotification('order.adminApplicationForRefund.content', { userFullName, orderId });
          break;

        case 'user-Refunded':
          href = `/orders/${orderId}`;
          title = tNotification('order.userRefunded.title');
          content = tNotification('order.userRefunded.content', { orderId });
          break;

        default:
          break;
      }
      break;
    default:
      break;
  }

  return { href, title, content };
};
