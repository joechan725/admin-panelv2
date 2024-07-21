import { Promotion } from '@/models/promotion/Promotion';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface PromotionListData {
  promotions: (PromotionData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface PromotionData extends Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const promotionListConverter = {
  toFirestore: (promotionList: Promotion[]): DocumentData => {
    return promotionList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Promotion[] => {
    const promotionListData = snapshot.data(options) as PromotionListData;

    const promotionsData = promotionListData.promotions;

    const promotions: Promotion[] = promotionsData.map(
      (promotionData): Promotion => ({
        ...promotionData,
        createdAt: promotionData.createdAt.toMillis(),
        updatedAt: promotionData.updatedAt.toMillis(),
      })
    );

    return promotions;
  },
};
