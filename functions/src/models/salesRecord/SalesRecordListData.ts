import { Timestamp } from 'firebase-admin/firestore';
import { SalesRecordData } from './SalesRecordData';

export interface SalesRecordListData {
  salesRecords: (SalesRecordData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
