import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { StoreAddress } from '@/models/store/StoreAddress';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface StoreAddressData extends Omit<StoreAddress, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface AddressListData {
  [storeAddressId: string]: StoreAddressData;
}

export const storeAddressListConverter = {
  toFirestore: (storeAddresses: StoreAddress[]) => {
    return storeAddresses;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): StoreAddress[] => {
    const storeAddressListData = snapshot.data(options) as AddressListData;

    const storeAddressesArray = Object.entries(storeAddressListData);

    const storeAddresses: StoreAddress[] = storeAddressesArray.map(
      ([addressId, address]): StoreAddress => ({
        ...address,
        id: addressId,
        createdAt: address.createdAt.toMillis(),
        updatedAt: address.updatedAt.toMillis(),
      })
    );

    const sortedStoreAddresses = sortObjectsByKey(storeAddresses, 'updatedAt', 'desc');

    return sortedStoreAddresses;
  },
};
