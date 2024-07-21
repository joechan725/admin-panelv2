import { DeliveryOptionUsageRecord } from '@/models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface DeliveryOptionUsageRecordData
  extends Omit<DeliveryOptionUsageRecord, 'id' | 'createdAt' | 'updatedAt' | 'orderedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  orderedAt: Timestamp;
  deletedAt?: Timestamp;
}

interface DeliveryOptionUsageRecordListData {
  deliveryOptionUsageRecords: (DeliveryOptionUsageRecordData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const deliveryOptionUsageRecordListConverter = {
  toFirestore: (deliveryOptionUsageRecordList: DeliveryOptionUsageRecord[]): DocumentData => {
    return deliveryOptionUsageRecordList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): DeliveryOptionUsageRecord[] => {
    const deliveryOptionListData = snapshot.data(options) as DeliveryOptionUsageRecordListData;

    const deliveryOptionUsageRecordsData = deliveryOptionListData.deliveryOptionUsageRecords;

    console.log(deliveryOptionUsageRecordsData);

    const deliveryOptionUsageRecords: DeliveryOptionUsageRecord[] = deliveryOptionUsageRecordsData.map(
      (record): DeliveryOptionUsageRecord => ({
        ...record,
        orderedAt: record.orderedAt.toMillis(),
        createdAt: record.createdAt.toMillis(),
        updatedAt: record.updatedAt.toMillis(),
        deletedAt: record.deletedAt?.toMillis(),
      })
    );

    return deliveryOptionUsageRecords;
  },
};
