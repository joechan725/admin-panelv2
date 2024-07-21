import { StoreAddress } from '@/models/store/StoreAddress';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface StoreAddressData extends Omit<StoreAddress, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const storeAddressConverter = {
  toFirestore: (storeAddress: StoreAddress) => {
    return storeAddress;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): StoreAddress => {
    const storeAddress = snapshot.data(options) as StoreAddressData;
    return {
      ...storeAddress,
      id: snapshot.id,
      createdAt: storeAddress.createdAt.toMillis(),
      updatedAt: storeAddress.updatedAt.toMillis(),
    };
  },
};
