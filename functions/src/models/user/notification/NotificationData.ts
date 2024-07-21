import { Timestamp } from '@google-cloud/firestore';
import { Notification } from './Notification';

export interface NotificationData extends Omit<Notification, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
