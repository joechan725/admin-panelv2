import { db } from '@/firebase/config';
import { User } from '@/models/user/User';
import { UserCredential } from 'firebase/auth';
import { doc, FieldValue, serverTimestamp, setDoc } from 'firebase/firestore';

interface UserData
  extends Omit<
    User,
    'id' | 'createdAt' | 'registeredAt' | 'updatedAt' | 'lastLoggedInAt' | 'orderCount' | 'totalSpent'
  > {
  updatedAt: FieldValue;
  lastLoggedInAt: FieldValue;
}

export const updateAuthenticatedUser = async (userCredential: UserCredential) => {
  const user = userCredential.user;
  const userRef = doc(db, `users/${user.uid}`);

  const userData: UserData = {
    isAdmin: false,
    role: 'user',
    isAnonymous: user.isAnonymous,
    emailVerified: user.emailVerified,
    providerData: user.providerData,
    updatedAt: serverTimestamp(),
    lastLoggedInAt: serverTimestamp(),
  };

  if (user.email) {
    userData.email = user.email;
  }

  if (user.providerData) {
    userData.providerData = user.providerData;
  }

  if (user.providerId) {
    userData.providerId = user.providerId;
  }

  await setDoc(userRef, userData, { merge: true });
};
