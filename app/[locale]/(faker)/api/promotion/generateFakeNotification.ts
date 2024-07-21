import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Notification } from '@/models/user/notification/Notification';
import { FieldValue, serverTimestamp } from 'firebase/firestore';

interface NotificationData extends Omit<Notification, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface GenerateFakeNotificationParameters {
  subject?: string;
  html?: string;
}

export const generateFakeNotification = ({ subject, html }: GenerateFakeNotificationParameters): NotificationData =>
  removeEmptyFieldFormObject({
    category: 'Promotion',
    type: 'Promotion',
    subject,
    html,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
