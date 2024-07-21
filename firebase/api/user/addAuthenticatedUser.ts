import { UserCredential } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { updateUser, UpdateUserFirestoreData } from './updateUser';

export const addAuthenticatedUser = async (userCredential: UserCredential) => {
  const user = userCredential.user;

  const userData: UpdateUserFirestoreData = {
    isAdmin: false,
    role: 'user',
    subscribeToPromotion: true,
    isAnonymous: user.isAnonymous,
    emailVerified: user.emailVerified,
    providerData: user.providerData,
    registeredAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLoggedInAt: serverTimestamp(),
  };

  if (user.email) {
    userData.email = user.email;
  }
  if (user.photoURL) {
    userData.avatar = {
      id: user.uid,
      url: user.photoURL,
      alt: 'user avatar',
    };
  }

  if (user.providerData) {
    userData.providerData = user.providerData;
  }

  if (user.providerId) {
    userData.providerId = user.providerId;
  }

  if (user.displayName) {
    userData.firstName = user.displayName;
  } else if (user.providerData[0].displayName) {
    userData.firstName = user.providerData[0].displayName;
  }

  if (user.phoneNumber) {
    userData.phoneNumber = user.phoneNumber;
  } else if (user.providerData[0].phoneNumber) {
    userData.phoneNumber = user.providerData[0].phoneNumber;
  }

  if (user.photoURL) {
    userData.avatar = {
      alt: 'user avatar',
      id: crypto.randomUUID(),
      url: user.photoURL,
    };
  } else if (user.providerData[0].photoURL) {
    userData.avatar = {
      alt: 'user avatar',
      id: crypto.randomUUID(),
      url: user.providerData[0].photoURL,
    };
  }

  await updateUser({ userId: user.uid, userData });
};
