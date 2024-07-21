import { Timestamp } from 'firebase-admin/firestore';
import { SubscriberList } from './SubscriberList';

export interface SubscriberListData extends Omit<SubscriberList, 'updatedAt'> {
  updatedAt: Timestamp;
}
