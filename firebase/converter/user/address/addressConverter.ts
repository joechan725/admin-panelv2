import { Address } from '@/models/Address';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface AddressData extends Omit<Address, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const addressConverter = {
  toFirestore: (address: Address) => {
    return address;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Address => {
    const address = snapshot.data(options) as AddressData;
    return {
      ...address,
      id: snapshot.id,
      createdAt: address.createdAt.toMillis(),
      updatedAt: address.updatedAt.toMillis(),
    };
  },
};
