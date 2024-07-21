import { doc, FieldValue, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { StoreInformation } from '@/models/store/StoreInformation';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';

export interface UpdateStoreInformationFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<StoreInformation, 'updatedAt' | 'id'>>> {
  updatedAt: FieldValue;
}

export const updateStoreInformation = async (shopInformationFirestoreData: UpdateStoreInformationFirestoreData) => {
  // Prepare
  const shopInformationRef = doc(db, '/store/information');

  // Update the smart bar
  await setDoc(shopInformationRef, shopInformationFirestoreData, { merge: true });
};
