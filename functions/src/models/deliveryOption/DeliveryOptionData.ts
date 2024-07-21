import { Timestamp } from 'firebase-admin/firestore';
import { DeliveryOption } from './DeliveryOption';

export interface DeliveryOptionData extends Omit<DeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}
