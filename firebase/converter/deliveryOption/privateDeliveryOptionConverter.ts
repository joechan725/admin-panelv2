import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface PrivateDeliveryOptionData
  extends Omit<PrivateDeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

export const privateDeliveryOptionConverter = {
  toFirestore: (deliveryOption: PrivateDeliveryOption): DocumentData => {
    return deliveryOption;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateDeliveryOption => {
    const deliveryOptionData = snapshot.data(options) as PrivateDeliveryOptionData;

    return {
      ...deliveryOptionData,
      id: snapshot.id,
      createdAt: deliveryOptionData.createdAt.toMillis(),
      updatedAt: deliveryOptionData.updatedAt.toMillis(),
      deletedAt: deliveryOptionData.deletedAt?.toMillis(),
    };
  },
};
