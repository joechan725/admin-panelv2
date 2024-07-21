import { db } from '@/firebase/config';
import { Address } from '@/models/Address';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

interface UpdateAddressParameters {
  userId: string;
  addressId: string;
  addressData: UpdateAddressFirestoreData;
}

export interface UpdateAddressFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<Address, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>>> {
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const updateAddress = async ({ userId, addressData, addressId }: UpdateAddressParameters) => {
  // prepare
  const addressRef = doc(db, `users/${userId}/addresses/${addressId}`);

  // update
  await updateDoc(addressRef, { ...addressData });
};
