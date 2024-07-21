import { UserListData } from '../../../models/user/UserListData';
import { NotificationData } from '../../../models/user/notification/NotificationData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface CreateUserNotification {
  notificationId: string;
  notificationData: NotificationData;
}

/**
 * Update the user's notification when a update notification is written.
 *
 * @param notificationId - The notification Id
 * @param notificationData - The notification data
 *
 * @return - A promise of void
 */

export const createUserNotification = async ({ notificationData, notificationId }: CreateUserNotification) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateUserListsRef = db.collection('privateUserLists');
    const privateUserListsSnap = await privateUserListsRef.get();
    const privateUserListsData = privateUserListsSnap.docs.map((doc) => doc.data() as UserListData);
    const userIds = privateUserListsData.map((list) => list.ids).flat();

    userIds.forEach((userId) => {
      const userNotificationRef = db.collection('users').doc(userId).collection('notifications').doc(notificationId);
      bigBatch.set(userNotificationRef, notificationData, { merge: true });
    });

    await bigBatch.commit();
  } catch (error) {
    logger.error("Error on creating users' notification", error);
  }
};
