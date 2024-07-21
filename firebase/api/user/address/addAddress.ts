import { db } from '@/firebase/config';
import { Address } from '@/models/Address';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

interface AddAddressParameters {
  userId: string;
  addressData: AddAddressFirestoreData;
}

export interface AddAddressFirestoreData extends Omit<Address, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addAddress = async ({ userId, addressData }: AddAddressParameters) => {
  // prepare
  const addressesRef = collection(db, `users/${userId}/addresses`);

  // update
  const res = await addDoc(addressesRef, addressData);

  const id = res.id;
  return id;
};
