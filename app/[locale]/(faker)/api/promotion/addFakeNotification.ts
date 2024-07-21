import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { generateFakeNotification } from './generateFakeNotification';

interface AddFakeNotificationParameters {
  html?: string;
  subject?: string;
}

export const addFakeNotification = async ({ html, subject }: AddFakeNotificationParameters) => {
  const notificationsRef = collection(db, '/notifications');

  const notification = generateFakeNotification({ html, subject });

  const res = await addDoc(notificationsRef, notification);

  return res.id;
};
