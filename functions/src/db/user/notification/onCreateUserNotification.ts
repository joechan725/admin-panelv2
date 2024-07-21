import * as functions from 'firebase-functions';
import { updateNotificationList } from './helpers/updateNotificationList';
import { NotificationData } from '../../../models/user/notification/NotificationData';

export const onCreateUserNotification = functions.firestore
  .document('users/{userId}/notifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    const { userId, notificationId } = context.params;

    const notificationData = snapshot.data() as NotificationData;

    await updateNotificationList({ userId, mode: 'create', notificationData, notificationId });
  });
