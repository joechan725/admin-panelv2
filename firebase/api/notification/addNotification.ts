import { db } from '@/firebase/config';
import { Notification } from '@/models/user/notification/Notification';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddNotificationFirestoreData extends Omit<Notification, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addNotification = async (notificationData: AddNotificationFirestoreData) => {
  // prepare
  const notificationRef = collection(db, '/notifications');

  // add
  const res = await addDoc(notificationRef, notificationData);

  // return the id
  const { id } = res;
  return id;
};
