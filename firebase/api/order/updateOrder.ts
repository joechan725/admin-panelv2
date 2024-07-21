import { db } from '@/firebase/config';
import { Order } from '@/models/order/Order';
import { StatusHistory } from '@/models/order/StatusHistory';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

interface UpdateOrderParameters {
  orderId: string;
  orderData: UpdateOrderFirestoreData;
}

export interface UpdateOrderFirestoreData
  extends Partial<ExtendWithFieldValue<Omit<Order, 'createdAt' | 'updatedAt' | 'statusHistories'>>> {
  statusHistories?: StatusHistoryData[] | FieldValue;
  updatedAt: FieldValue;
}

interface StatusHistoryData extends Omit<StatusHistory, 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const updateOrder = async ({ orderId, orderData }: UpdateOrderParameters) => {
  const orderRef = doc(db, `orders/${orderId}`);

  await updateDoc(orderRef, { ...orderData });
};
