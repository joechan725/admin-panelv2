import { Timestamp } from 'firebase-admin/firestore';
import { DeliveryOptionUsageRecordData } from './DeliveryOptionUsageRecordData';

export interface DeliveryOptionUsageRecordListData {
  deliveryOptionUsageRecords: (DeliveryOptionUsageRecordData & { id: string })[];
  ids: string[];
  userIds: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
