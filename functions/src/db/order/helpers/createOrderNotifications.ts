import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { Notification } from '../../../models/user/notification/Notification';
import { FieldValue } from 'firebase-admin/firestore';
import combineFNameAndLName from '../../../lib/helpers/string/combineFNameAndLName';
import { OrderData } from '../../../models/order/OrderData';
import { Order } from '../../../models/order/Order';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface CreateOrderNotificationsParameters {
  orderId: string;
  orderData: OrderData;
  status: Order['status'];
}

/**
 * Create the notifications for admins and user.
 *
 * @param status - 'Paid' | 'Delivering' | 'Ready for Pickup' | 'Delivered' | 'Picked Up'
 * @returns The promise of void
 */

export const createOrderNotifications = async ({ orderId, orderData, status }: CreateOrderNotificationsParameters) => {
  if (status === 'Placed') {
    return;
  }
  try {
    const bigBatch = new BigBatch(db);
    const userNotificationRef = db.collection('users').doc(orderData.userId).collection('notifications').doc();

    // construct the user's notification
    const { amountToPay, totalQuantity, userFirstName, userLastName, orderItems, userAvatar } = orderData;

    if (status === 'Paid') {
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',
        type: 'user-Paid',
        imageType: 'image',
        image: orderItems.at(0)?.image,
        amountToPay,
        totalQuantity,
        orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);

      // construct the admin's notification
      const userFullName = combineFNameAndLName({
        firstName: userFirstName,
        lastName: userLastName,
        fallbackName: 'Anonymous user',
      });

      const adminNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',
        type: 'admin-Paid',
        userFullName,
        amountToPay,
        totalQuantity,
        image: userAvatar,
        imageType: 'avatar',
        orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Get all the admins snap
      const usersRef = db.collection('users');
      const adminsRef = usersRef.where('isAdmin', '==', true);
      const adminsSnap = await adminsRef.get();

      // add the notification to admin's notifications
      adminsSnap.docs.forEach((doc) => {
        const adminNotificationRef = db.collection('users').doc(doc.id).collection('notifications').doc();
        bigBatch.set(adminNotificationRef, adminNotificationData);
      });
    }

    if (status === 'Delivering') {
      // construct the user's notification
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',

        type: 'user-Delivering',
        imageType: 'image',
        image: orderItems.at(0)?.image,
        orderId: orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);
    }

    if (status === 'Delivered') {
      // construct the user's notification
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',

        type: 'user-Delivered',

        imageType: 'image',
        image: orderItems.at(0)?.image,
        orderId: orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);
    }

    if (status === 'Ready for Pickup') {
      // construct the user's notification
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',

        type: 'user-Ready for Pickup',
        imageType: 'image',
        image: orderItems.at(0)?.image,
        orderId: orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);
    }

    if (status === 'Picked Up') {
      // construct the user's notification
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',

        type: 'user-Picked Up',
        imageType: 'image',
        image: orderItems.at(0)?.image,
        orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);
    }

    if (status === 'Application for Refund') {
      // construct the user's notification
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',

        type: 'user-Application for Refund',
        imageType: 'image',
        image: orderItems.at(0)?.image,
        orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);

      // construct the admin's notification
      const userFullName = combineFNameAndLName({
        firstName: userFirstName,
        lastName: userLastName,
        fallbackName: 'Anonymous user',
      });

      const adminNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',
        type: 'admin-Application for Refund',
        userFullName,
        image: userAvatar,
        imageType: 'avatar',
        orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Get all the admins snap
      const usersRef = db.collection('users');
      const adminsRef = usersRef.where('isAdmin', '==', true);
      const adminsSnap = await adminsRef.get();

      // add the notification to admin's notifications
      adminsSnap.docs.forEach((doc) => {
        const adminNotificationRef = db.collection('users').doc(doc.id).collection('notifications').doc();
        bigBatch.set(adminNotificationRef, adminNotificationData);
      });
    }

    if (status === 'Refunded') {
      // construct the user's notification
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Order',

        type: 'user-Refunded',
        imageType: 'image',
        image: orderItems.at(0)?.image,
        orderId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on creating order notification', error);
  }
};
