import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface DeliveryOptionData extends Omit<DeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

export const deliveryOptionConverter = {
  toFirestore: (deliveryOption: DeliveryOption): DocumentData => {
    return deliveryOption;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): DeliveryOption => {
    const deliveryOptionData = snapshot.data(options) as DeliveryOptionData;

    return {
      ...deliveryOptionData,
      id: snapshot.id,
      createdAt: deliveryOptionData.createdAt.toMillis(),
      updatedAt: deliveryOptionData.updatedAt.toMillis(),
      deletedAt: deliveryOptionData.deletedAt?.toMillis(),
    };
  },
};
