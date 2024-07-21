import * as functions from 'firebase-functions';
import { updateStoreAddressList } from './helpers/updateStoreAddressList';
import { StoreAddressData } from '../../models/store/StoreAddressData';
import { addDeletedStoreAddress } from './helpers/addDeletedStoreAddress';

export const onUpdateStoreAddress = functions.firestore
  .document('storeAddresses/{storeAddressId}')
  .onUpdate(async (change, context) => {
    const storeAddressSnapBefore = change.before;
    const storeAddressSnapAfter = change.after;

    const storeAddressDataBefore = storeAddressSnapBefore.data() as StoreAddressData;
    const storeAddressDataAfter = storeAddressSnapAfter.data() as StoreAddressData;
    const { storeAddressId } = context.params;

    if (storeAddressDataAfter.deletedAt === undefined) {
      // The store address is updated
      await updateStoreAddressList({ storeAddressId, storeAddressData: storeAddressDataAfter, mode: 'update' });
    }

    if (storeAddressDataBefore.deletedAt === undefined && storeAddressDataAfter.deletedAt !== undefined) {
      // The store address is deleted
      await updateStoreAddressList({ storeAddressId, storeAddressData: storeAddressDataAfter, mode: 'delete' });
      await addDeletedStoreAddress({ storeAddressId, storeAddressData: storeAddressDataAfter });
    }
  });
