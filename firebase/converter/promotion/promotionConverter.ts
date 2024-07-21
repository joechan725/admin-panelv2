import { Promotion } from '@/models/promotion/Promotion';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface PromotionData extends Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const promotionConverter = {
  toFirestore: (promotion: Promotion): DocumentData => {
    return promotion;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Promotion => {
    const promotionData = snapshot.data(options) as PromotionData;

    return {
      ...promotionData,
      id: snapshot.id,
      createdAt: promotionData.createdAt?.toMillis(),
      updatedAt: promotionData.updatedAt?.toMillis(),
    };
  },
};
