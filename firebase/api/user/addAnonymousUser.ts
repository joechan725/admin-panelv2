import { UserCredential } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { addUserById, AddUserFirestoreData } from './addUserById';

export const addAnonymousUser = async (userCredential: UserCredential) => {
  const user = userCredential.user;

  const userData: AddUserFirestoreData = {
    role: 'anonymous',
    isAdmin: false,
    isAnonymous: user.isAnonymous,
    emailVerified: false,
    providerId: user.providerId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLoggedInAt: serverTimestamp(),
  };

  await addUserById(user.uid, userData);
};
