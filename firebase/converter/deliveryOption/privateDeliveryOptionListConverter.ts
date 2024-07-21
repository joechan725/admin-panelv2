import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface PrivateDeliveryOptionListData {
  deliveryOptions: (PrivateDeliveryOptionData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface PrivateDeliveryOptionData
  extends Omit<PrivateDeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

export const privateDeliveryOptionListConverter = {
  toFirestore: (privateDeliveryOptionList: PrivateDeliveryOption[]): DocumentData => {
    return privateDeliveryOptionList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateDeliveryOption[] => {
    const privateDeliveryOptionListData = snapshot.data(options) as PrivateDeliveryOptionListData;

    const privateDeliveryOptionsData = privateDeliveryOptionListData.deliveryOptions;

    const privateDeliveryOptions: PrivateDeliveryOption[] = privateDeliveryOptionsData.map(
      (privateDeliveryOptionData): PrivateDeliveryOption => {
        return {
          ...privateDeliveryOptionData,
          createdAt: privateDeliveryOptionData.createdAt.toMillis(),
          updatedAt: privateDeliveryOptionData.updatedAt.toMillis(),
          deletedAt: privateDeliveryOptionData.deletedAt?.toMillis(),
        };
      }
    );

    return privateDeliveryOptions;
  },
};
