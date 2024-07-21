import { SalesRecord } from '@/models/salesRecord/SalesRecord';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface SalesRecordData extends Omit<SalesRecord, 'id' | 'createdAt' | 'updatedAt' | 'soldAt' | 'deletedAt'> {
  soldAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

interface SalesRecordListData {
  salesRecords: (SalesRecordData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const salesRecordListConverter = {
  toFirestore: (salesRecordList: SalesRecord[]): DocumentData => {
    return salesRecordList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SalesRecord[] => {
    const couponListData = snapshot.data(options) as SalesRecordListData;

    const salesRecordsData = couponListData.salesRecords;

    const salesRecords: SalesRecord[] = salesRecordsData.map(
      (record): SalesRecord => ({
        ...record,
        soldAt: record.soldAt.toMillis(),
        createdAt: record.createdAt.toMillis(),
        updatedAt: record.updatedAt.toMillis(),
        deletedAt: record.deletedAt?.toMillis(),
      })
    );

    return salesRecords;
  },
};
