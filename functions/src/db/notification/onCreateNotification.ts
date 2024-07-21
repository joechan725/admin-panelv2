import * as functions from 'firebase-functions';
import { NotificationData } from '../../models/user/notification/NotificationData';
import { createUserNotification } from './helpers/createUserNotification';

export const onCreateNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    const { notificationId } = context.params;

    const notificationData = snapshot.data() as NotificationData;

    await createUserNotification({ notificationId, notificationData });
  });
