import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { checkProductStock } from './helpers/checkProductStock';
import { getPendingOrderData } from './helpers/getPendingOrderData';
import { logger } from 'firebase-functions/v1';

interface Request {
  pendingOrderId: string;
}

export const verifyStockPrePayment = onCall<Request, Promise<void>>(async (request) => {
  try {
    const userAuth = request.auth;

    if (!userAuth) {
      throw new HttpsError('unauthenticated', 'No user information');
    }

    const { pendingOrderId } = request.data;

    const pendingOrderData = await getPendingOrderData({ pendingOrderId });

    await checkProductStock({ pendingOrderData });
  } catch (error) {
    if (error instanceof HttpsError) {
      throw new HttpsError(error.code, error.message);
    }
    logger.error('Error on verifying stock', error);
    throw new HttpsError('internal', 'Unexpected error. Please try again later.');
  }
});
