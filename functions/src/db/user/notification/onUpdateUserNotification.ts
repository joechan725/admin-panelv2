import * as functions from 'firebase-functions';
import { updateNotificationList } from './helpers/updateNotificationList';
import { NotificationData } from '../../../models/user/notification/NotificationData';

export const onUpdateUserNotification = functions.firestore
  .document('users/{userId}/notifications/{notificationId}')
  .onUpdate(async (change, context) => {
    const { userId, notificationId } = context.params;

    // const notificationSnapBefore = change.before;
    const notificationSnapAfter = change.after;

    // const notificationDataBefore = notificationSnapBefore.data() as NotificationData;
    const notificationDataAfter = notificationSnapAfter.data() as NotificationData;

    await updateNotificationList({ userId, mode: 'update', notificationData: notificationDataAfter, notificationId });
  });
