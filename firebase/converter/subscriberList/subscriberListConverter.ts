import { SubscriberList } from '@/models/subscriber/SubscriberList';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface SubscriberListData extends Omit<SubscriberList, 'updatedAt'> {
  updatedAt: Timestamp;
}

export const subscriberListConverter = {
  toFirestore: (subscriberList: SubscriberList): DocumentData => {
    return subscriberList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SubscriberList => {
    const subscriberListData = snapshot.data(options) as SubscriberListData;
    return {
      ...subscriberListData,
      updatedAt: subscriberListData.updatedAt.toMillis(),
    };
  },
};
