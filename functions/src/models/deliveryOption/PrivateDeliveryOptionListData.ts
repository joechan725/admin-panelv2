import { Timestamp } from 'firebase-admin/firestore';
import { PrivateDeliveryOptionData } from './PrivateDeliveryOptionData';

export interface PrivateDeliveryOptionListData {
  deliveryOptions: (PrivateDeliveryOptionData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
