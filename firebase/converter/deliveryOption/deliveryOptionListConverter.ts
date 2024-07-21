import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface DeliveryOptionListData {
  deliveryOptions: (DeliveryOptionData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface DeliveryOptionData extends Omit<DeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

export const deliveryOptionListConverter = {
  toFirestore: (deliveryOptionList: DeliveryOption[]): DocumentData => {
    return deliveryOptionList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): DeliveryOption[] => {
    const deliveryOptionListData = snapshot.data(options) as DeliveryOptionListData;

    const deliveryOptionsData = deliveryOptionListData.deliveryOptions;

    const deliveryOptions: DeliveryOption[] = deliveryOptionsData.map(
      (deliveryOptionData): DeliveryOption => ({
        ...deliveryOptionData,
        createdAt: deliveryOptionData.createdAt.toMillis(),
        updatedAt: deliveryOptionData.updatedAt.toMillis(),
        deletedAt: deliveryOptionData.deletedAt?.toMillis(),
      })
    );

    return deliveryOptions;
  },
};
