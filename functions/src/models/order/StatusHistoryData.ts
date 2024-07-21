import { Timestamp } from 'firebase-admin/firestore';
import { StatusHistory } from './StatusHistory';

export interface StatusHistoryData extends Omit<StatusHistory, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
