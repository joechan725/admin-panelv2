import { Notification } from '@/models/user/notification/Notification';
import { TranslationFunction } from '@/types/TranslationFunction';

interface GetNotificationDetailParameters {
  notification: Notification;
  t: TranslationFunction;
}

export const getNotificationDetail = ({ notification, t }: GetNotificationDetailParameters) => {
  let title: string | undefined = undefined;
  let content: string | undefined = undefined;
  let href: string | undefined = undefined;

  const { category, orderId, productId, productName, type, amountToPay, totalQuantity, userFullName } = notification;

  switch (category) {
    case 'Back in Stock':
      href = `/products/${productId}`;
      title = t('backInStock.title', { productName });
      content = t('backInStock.content', { productName });
      break;
    case 'Order':
      switch (type) {
        case 'user-Paid':
          href = `/orders/${orderId}`;
          title = t('order.userPaid.title', { orderId });
          content = t('order.userPaid.content', { totalQuantity, amountToPay: amountToPay?.toFixed(2) });
          break;

        case 'admin-Paid':
          href = `/admin/orders/${orderId}`;
          title = t('order.adminPaid.title', { userFullName, orderId });
          content = t('order.adminPaid.content', { totalQuantity, amountToPay: amountToPay?.toFixed(2) });
          break;

        case 'user-Delivering':
          href = `/orders/${orderId}`;
          title = t('order.userDelivering.title');
          content = t('order.userDelivering.content', { orderId });
          break;

        case 'user-Delivered':
          title = t('order.userDelivered.title');
          content = t('order.userDelivered.content', { orderId });
          href = `/orders/${orderId}`;
          break;

        case 'user-Ready for Pickup':
          href = `/orders/${orderId}`;
          title = t('order.userReadyForPickup.title');
          content = t('order.userReadyForPickup.content', { orderId });
          break;

        case 'user-Picked Up':
          href = `/orders/${orderId}`;
          title = t('order.userPickedUp.title');
          content = t('order.userPickedUp.content', { orderId });
          break;

        case 'user-Application for Refund':
          href = `/orders/${orderId}`;
          title = t('order.userApplicationForRefund.title');
          content = t('order.userApplicationForRefund.content', { orderId });
          break;

        case 'admin-Application for Refund':
          href = `/admin/orders/${orderId}`;
          title = t('order.adminApplicationForRefund.title');
          content = t('order.adminApplicationForRefund.content', { userFullName, orderId });
          break;

        case 'user-Refunded':
          href = `/orders/${orderId}`;
          title = t('order.userRefunded.title');
          content = t('order.userRefunded.content', { orderId });
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
