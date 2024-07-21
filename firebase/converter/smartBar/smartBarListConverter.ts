import { SmartBar } from '@/models/smartBar/SmartBar';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface SmartBarData extends Omit<SmartBar, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface PrivateSmartBarListData {
  smartBars: (SmartBarData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const smartBarListConverter = {
  toFirestore: (smartBars: SmartBar[]): DocumentData => {
    return smartBars;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SmartBar[] => {
    const smartBarListData = snapshot.data(options) as PrivateSmartBarListData;

    const smartBarsData = smartBarListData.smartBars;

    const smartBars: SmartBar[] = smartBarsData.map(
      (smartBarData): SmartBar => ({
        ...smartBarData,
        createdAt: smartBarData.createdAt.toMillis(),
        updatedAt: smartBarData.updatedAt.toMillis(),
      })
    );

    return smartBars;
  },
};
