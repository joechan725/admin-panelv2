import { CouponUsageRecord } from '@/models/coupon/usageRecord/CouponUsageRecord';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface CouponUsageRecordData
  extends Omit<CouponUsageRecord, 'id' | 'createdAt' | 'updatedAt' | 'usedAt' | 'deletedAt'> {
  usedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

interface CouponUsageRecordListData {
  couponUsageRecords: (CouponUsageRecordData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const couponUsageRecordListConverter = {
  toFirestore: (couponUsageRecordList: CouponUsageRecord[]): DocumentData => {
    return couponUsageRecordList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CouponUsageRecord[] => {
    const couponListData = snapshot.data(options) as CouponUsageRecordListData;

    const couponUsageRecordsData = couponListData.couponUsageRecords;

    const couponUsageRecords: CouponUsageRecord[] = couponUsageRecordsData.map(
      (record): CouponUsageRecord => ({
        ...record,
        createdAt: record.createdAt.toMillis(),
        updatedAt: record.updatedAt.toMillis(),
        usedAt: record.usedAt.toMillis(),
        deletedAt: record.deletedAt?.toMillis(),
      })
    );

    return couponUsageRecords;
  },
};
