import { db } from '@/firebase/config';
import { StoreAddress } from '@/models/store/StoreAddress';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

interface UpdateStoreAddressParameters {
  storeAddressId: string;
  storeAddressData: UpdateStoreAddressFirestoreData;
}

export interface UpdateStoreAddressFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<StoreAddress, 'createdAt' | 'updatedAt' | 'id'>>> {
  updatedAt: FieldValue;
}

export const updateStoreAddress = async ({ storeAddressId, storeAddressData }: UpdateStoreAddressParameters) => {
  // prepare
  const storeAddressRef = doc(db, `storeAddresses/${storeAddressId}`);

  // update
  await updateDoc(storeAddressRef, { ...storeAddressData });
};
