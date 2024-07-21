import { OrderAggregator } from '@/models/admin/OrderAggregator';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface OrderAggregatorData extends Omit<OrderAggregator, 'updatedAt'> {
  updatedAt: Timestamp;
}

export const orderAggregatorConverter = {
  toFirestore: (orderAggregator: OrderAggregator): DocumentData => {
    return orderAggregator;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): OrderAggregator => {
    const orderAggregatorData = snapshot.data(options) as OrderAggregatorData;

    return {
      ...orderAggregatorData,
      updatedAt: orderAggregatorData.updatedAt.toMillis(),
    };
  },
};
