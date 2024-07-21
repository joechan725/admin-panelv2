import { serverTimestamp } from 'firebase/firestore';
import { updateUser, UpdateUserFirestoreData } from './updateUser';
import { auth } from '@/firebase/config';

export const syncUserProvider = async () => {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    return;
  }
  const updateUserData: UpdateUserFirestoreData = {
    providerData: user.providerData,
    providerId: user.providerId,
    emailVerified: user.emailVerified,
    updatedAt: serverTimestamp(),
  };

  await updateUser({ userId: user.uid, userData: updateUserData });
};
