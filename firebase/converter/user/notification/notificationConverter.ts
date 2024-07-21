import { Notification } from '@/models/user/notification/Notification';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface NotificationData extends Omit<Notification, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const notificationConverter = {
  toFirestore: (notification: Notification): DocumentData => {
    return notification;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Notification => {
    const notificationData = snapshot.data(options) as NotificationData;

    // Types of property 'category' are incompatible.
    return {
      ...notificationData,
      id: snapshot.id,
      createdAt: notificationData.createdAt.toMillis(),
      updatedAt: notificationData.updatedAt.toMillis(),
    } as Notification;
  },
};
