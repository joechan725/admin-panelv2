import { Timestamp } from 'firebase-admin/firestore';
import { PrivateDeliveryOption } from './PrivateDeliveryOption';

export interface PrivateDeliveryOptionData
  extends Omit<PrivateDeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
