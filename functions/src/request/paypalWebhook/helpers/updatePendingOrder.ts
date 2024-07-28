import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { StatusHistoryData } from '../../../models/order/StatusHistoryData';
import { OrderData } from '../../../models/order/OrderData';
import { db } from '../../../admin';

interface updatePendingOrderParameters {
  pendingOrderId: string;
  createdAtDataString: string;
  amountCaptured: string;
  amountCapturedCurrent: string;
}

export const updatePendingOrder = async ({
  pendingOrderId,
  createdAtDataString,
  amountCaptured,
  amountCapturedCurrent,
}: updatePendingOrderParameters) => {
  const newStatusHistory: StatusHistoryData = {
    id: crypto.randomUUID(),
    status: 'Paid',
    createdAt: Timestamp.fromDate(new Date(createdAtDataString)),
    updatedAt: Timestamp.fromDate(new Date(createdAtDataString)),
  };

  try {
    // create the order
    const updateOrder: Partial<ExtendWithFieldValue<OrderData>> = {
      status: 'Paid',
      isPaid: true,
      updatedAt: FieldValue.serverTimestamp(),
      paidAt: Timestamp.fromDate(new Date(createdAtDataString)),
      statusHistories: FieldValue.arrayUnion(newStatusHistory),
      amountCaptured: +amountCaptured,
      amountCapturedCurrent: amountCapturedCurrent,
    };

    // prepare
    const pendingOrderRef = db.collection('pendingOrders').doc(pendingOrderId);

    // update
    await pendingOrderRef.set(updateOrder, { merge: true });
  } catch (error) {
    throw new Error('Failed update pending order');
  }
};
