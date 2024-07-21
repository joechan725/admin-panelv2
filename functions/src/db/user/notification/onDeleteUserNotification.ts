import * as functions from 'firebase-functions';
import { updateNotificationList } from './helpers/updateNotificationList';
import { NotificationData } from '../../../models/user/notification/NotificationData';

export const onDeleteUserNotification = functions.firestore
  .document('users/{userId}/notifications/{notificationId}')
  .onDelete(async (snapshot, context) => {
    const { userId, notificationId } = context.params;

    const notificationData = snapshot.data() as NotificationData;

    await updateNotificationList({ userId, mode: 'delete', notificationId, notificationData });
  });
