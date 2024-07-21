import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { ExtendWithFieldValue } from '../../types/ExtendWithFieldValue';
import { User } from '../../models/user/User';
import { FieldValue } from 'firebase-admin/firestore';
import { db, auth as adminAuth } from '../../admin';
import { logger } from 'firebase-functions/v1';

interface Request {
  userId: string;
}

interface Response {
  success: boolean;
}

export const upgradeUserToAdmin = onCall<Request, Promise<Response>>(async (request) => {
  try {
    const { data, auth } = request;

    if (!auth?.token.admin) {
      throw new HttpsError('permission-denied', 'Only admins can upgrade users to admin.');
    }

    const { userId } = data;

    // Set custom user claims
    await adminAuth.setCustomUserClaims(userId, { admin: true });

    // Update Firestore user document
    const userRef = db.collection('users').doc(userId);

    const userData: ExtendWithFieldValue<Partial<User>> = {
      isAdmin: true,
      role: 'admin',
      updatedAt: FieldValue.serverTimestamp(),
    };

    await userRef.set(userData, { merge: true });
    return { success: true };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw new HttpsError(error.code, error.message);
    }
    logger.error('Error on upgrading user to admin', error);
    throw new HttpsError('internal', 'Unexpected error. Please try again later.');
  }
});
