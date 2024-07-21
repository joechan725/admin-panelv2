import { DeliveryOptionUsageRecord } from './DeliveryOptionUsageRecord';
import { Timestamp } from 'firebase-admin/firestore';

export interface DeliveryOptionUsageRecordData
  extends Omit<DeliveryOptionUsageRecord, 'createdAt' | 'updatedAt' | 'orderedAt' | 'deletedAt'> {
  orderedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
