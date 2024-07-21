import { StoreInformation } from '@/models/store/StoreInformation';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface StoreInformationData extends Omit<StoreInformation, 'updatedAt'> {
  updatedAt: Timestamp;
}

export const storeInformationConverter = {
  toFirestore: (storeInformation: StoreInformation): DocumentData => {
    return storeInformation;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): StoreInformation => {
    const storeInformationData = snapshot.data(options) as StoreInformationData;
    return {
      ...storeInformationData,
      id: snapshot.id,
      updatedAt: storeInformationData.updatedAt.toMillis(),
    };
  },
};
