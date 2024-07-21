import { User } from '@/models/user/User';
import { User as UserFireAuthData } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { updateUser, UpdateUserFirestoreData } from './updateUser';
import { getDateString } from '@/lib/helpers/date/getDateString';

interface SyncUserParameters {
  userData?: User;
  userAuth?: UserFireAuthData;
}

export const syncUser = async ({ userData, userAuth }: SyncUserParameters) => {
  if (!userData || !userAuth) {
    return;
  }

  const idTokenResult = await userAuth.getIdTokenResult();
  const isAdmin = idTokenResult.claims?.admin ? true : false;
  const isAnonymous = userAuth.isAnonymous;
  const role = isAdmin ? 'admin' : isAnonymous ? 'anonymous' : 'user';
  const emailVerified = userAuth.emailVerified;
  const providerId = userAuth.providerId;
  const providerData = userAuth.providerData;

  const isLastLoggedInAtMatch = getDateString(userData.lastLoggedInAt).dateString === getDateString().dateString;
  const isProviderMatch = providerData.every((authProvider) =>
    userData.providerData?.some((dataProvider) => dataProvider.providerId === authProvider.providerId)
  );

  // Check if the user at db match the user auth
  if (
    !isLastLoggedInAtMatch ||
    userData.isAnonymous !== isAnonymous ||
    userData.isAdmin !== isAdmin ||
    userData.role !== role ||
    userData.emailVerified !== emailVerified ||
    userData.providerId !== providerId ||
    !isProviderMatch
  ) {
    // If not match, update the db
    const updatedUserData: UpdateUserFirestoreData = {
      updatedAt: serverTimestamp(),
      lastLoggedInAt: serverTimestamp(),
      isAdmin,
      isAnonymous,
      role,
      emailVerified,
      providerId,
      providerData,
    };
    await updateUser({ userId: userAuth.uid, userData: updatedUserData });
  }
};
