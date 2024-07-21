import { doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';

export interface UpdateSmartBarFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<SmartBar, 'createdAt' | 'updatedAt' | 'id'>>> {
  updatedAt: FieldValue;
}

interface UpdateSmartBarParameters {
  smartBarId: string;
  smartBarFirestoreData: UpdateSmartBarFirestoreData;
}

export const updateSmartBar = async ({ smartBarId, smartBarFirestoreData }: UpdateSmartBarParameters) => {
  // Prepare
  const smartBarRef = doc(db, `/smartBars/${smartBarId}`);

  const updatedSmartBar = {
    ...smartBarFirestoreData,
  };

  // Update the smart bar
  await updateDoc(smartBarRef, updatedSmartBar);
};
