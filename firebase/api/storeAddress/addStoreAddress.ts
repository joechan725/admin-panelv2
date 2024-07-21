import { db } from '@/firebase/config';
import { StoreAddress } from '@/models/store/StoreAddress';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddStoreAddressFirestoreData extends Omit<StoreAddress, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addStoreAddress = async (storeAddressData: AddStoreAddressFirestoreData) => {
  // prepare
  const storeAddressesRef = collection(db, `storeAddresses`);

  // update
  const res = await addDoc(storeAddressesRef, storeAddressData);

  const id = res.id;
  return id;
};
