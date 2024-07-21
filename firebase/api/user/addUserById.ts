import { db } from '@/firebase/config';
import { User } from '@/models/user/User';
import { doc, FieldValue, setDoc } from 'firebase/firestore';

export interface AddUserFirestoreData extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLoggedInAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  lastLoggedInAt: FieldValue;
}

export const addUserById = async (userId: string, userData: AddUserFirestoreData) => {
  const userRef = doc(db, `users/${userId}`);

  await setDoc(userRef, userData);
};
