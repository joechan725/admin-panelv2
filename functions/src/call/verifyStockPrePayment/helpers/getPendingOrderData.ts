import { db } from '../../../admin';
import { OrderData } from '../../../models/order/OrderData';
import { HttpsError } from 'firebase-functions/v1/auth';

interface GetPendingOrderDataParameters {
  pendingOrderId: string;
}

export const getPendingOrderData = async ({ pendingOrderId }: GetPendingOrderDataParameters) => {
  const pendingOrderRef = db.collection('pendingOrders').doc(pendingOrderId);

  const pendingOrderSnap = await pendingOrderRef.get();

  if (!pendingOrderSnap.exists) {
    throw new HttpsError('failed-precondition', 'Unable to find pending order');
  }

  const pendingOrderData = pendingOrderSnap.data() as OrderData;

  return pendingOrderData;
};
