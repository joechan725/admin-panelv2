import { SmartBar } from '@/models/smartBar/SmartBar';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface SmartBarData extends Omit<SmartBar, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const smartBarConverter = {
  toFirestore: (smartBar: SmartBar): DocumentData => {
    return smartBar;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SmartBar => {
    const smartBarData = snapshot.data(options) as SmartBarData;
    return {
      ...smartBarData,
      id: snapshot.id,
      createdAt: smartBarData.createdAt.toMillis(),
      updatedAt: smartBarData.updatedAt.toMillis(),
    };
  },
};
