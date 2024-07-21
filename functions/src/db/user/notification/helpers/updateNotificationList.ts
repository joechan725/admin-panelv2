import { FieldValue } from 'firebase-admin/firestore';
import { NotificationData } from '../../../../models/user/notification/NotificationData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateNotificationListParameter {
  userId: string;
  notificationId: string;
  mode: 'create' | 'update' | 'delete';
  notificationData: NotificationData;
}

/**
 * Update the notificationList in user list sub-collection
 * and notificationCount in the user documents
 *
 * @param userId - The id of user
 * @param notificationId - The id of notification
 * @param notificationData - The firestore notification data
 * @param mode - 'create' | 'update' | 'delete'
 *
 * @returns The promise of void
 */

export const updateNotificationList = async ({
  userId,
  notificationId,
  mode,
  notificationData,
}: UpdateNotificationListParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    const notificationListRef = db.collection('users').doc(userId).collection('lists').doc('notificationList');

    if (mode === 'create') {
      bigBatch.set(notificationListRef, { [notificationId]: notificationData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(notificationListRef, { [notificationId]: FieldValue.delete() }, { merge: true });
      bigBatch.set(notificationListRef, { [notificationId]: notificationData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(notificationListRef, { [notificationId]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating user notification list', error);
  }
};
