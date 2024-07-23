import * as admin from 'firebase-admin';
import { OrderData } from '../../../models/order/OrderData';

const db = admin.firestore();

export const getPendingOrder = async (pendingOrderId: string) => {
  const pendingOrderRef = db.collection('pendingOrders').doc(pendingOrderId);

  const pendingOrderSnap = await pendingOrderRef.get();

  const pendingOrderData = pendingOrderSnap.data() as OrderData;

  return pendingOrderData;
};
