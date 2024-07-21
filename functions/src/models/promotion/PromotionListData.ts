import { Timestamp } from 'firebase/firestore';
import { PromotionData } from './PromotionData';

export interface PromotionListData {
  promotions: (PromotionData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
