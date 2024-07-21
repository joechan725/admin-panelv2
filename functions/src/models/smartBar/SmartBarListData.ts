import { Timestamp } from 'firebase-admin/firestore';
import { SmartBarData } from './SmartBarData';

export interface SmartBarListData {
  smartBars: (SmartBarData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
