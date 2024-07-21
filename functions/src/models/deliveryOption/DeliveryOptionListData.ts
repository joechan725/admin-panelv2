import { Timestamp } from 'firebase-admin/firestore';
import { DeliveryOptionData } from './DeliveryOptionData';

export interface DeliveryOptionListData {
  deliveryOptions: (DeliveryOptionData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
