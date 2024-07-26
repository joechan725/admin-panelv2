import { HttpsError } from 'firebase-functions/v2/https';
import { UserData } from '../../../models/user/UserData';
import { db } from '../../../admin';

export const getUser = async (userId: string) => {
  const userRef = db.collection('users').doc(userId);

  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'No user data');
  }

  const userData = userSnap.data() as UserData;

  return { ...userData, id: userSnap.id };
};
