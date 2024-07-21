import { addDoc, collection, FieldValue } from 'firebase/firestore';
import { db } from '../../config';
import { SmartBar } from '@/models/smartBar/SmartBar';

export interface CreateSmartBarFirestoreData extends Omit<SmartBar, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addSmartBar = async (smartBarFirestoreData: CreateSmartBarFirestoreData) => {
  // prepare
  const smartBarsRef = collection(db, '/smartBars');

  // Upload the new coupon
  const res = await addDoc(smartBarsRef, smartBarFirestoreData);

  // return the uploaded doc id
  const id = res.id;

  return id;
};
