import { db } from '@/firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

interface DeleteNotificationParameter {
  userId: string;
  notificationId: string;
}

export const deleteNotification = async ({ userId, notificationId }: DeleteNotificationParameter) => {
  // prepare
  const notificationRef = doc(db, `users/${userId}/notifications/${notificationId}`);

  // delete
  await deleteDoc(notificationRef);
};
