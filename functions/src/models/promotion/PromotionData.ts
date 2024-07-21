import { Timestamp } from 'firebase/firestore';
import { Promotion } from './Promotion';

export interface PromotionData extends Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
