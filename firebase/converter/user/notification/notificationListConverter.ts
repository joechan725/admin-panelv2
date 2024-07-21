import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { Notification } from '@/models/user/notification/Notification';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface NotificationData extends Omit<Notification, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface NotificationListData {
  [notificationId: string]: NotificationData;
}

export const notificationListConverter = {
  toFirestore: (notificationList: Notification[]): DocumentData => {
    return notificationList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Notification[] => {
    const notificationListData = snapshot.data(options) as NotificationListData;

    const notificationsArray = Object.entries(notificationListData);

    const notifications: Notification[] = notificationsArray.map(
      ([notificationId, notification]): Notification => ({
        ...notification,
        id: notificationId,
        createdAt: notification.createdAt.toMillis(),
        updatedAt: notification.updatedAt.toMillis(),
      })
    );

    const sortedNotifications = sortObjectsByKey(notifications, 'updatedAt', 'desc');

    return sortedNotifications;
  },
};
