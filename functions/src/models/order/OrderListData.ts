import { Timestamp } from 'firebase-admin/firestore';
import { OrderData } from './OrderData';

export interface OrderListData {
  orders: (OrderData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  itemCount: number;
}
