import * as functions from 'firebase-functions';
import { updateStoreAddressList } from './helpers/updateStoreAddressList';
import { StoreAddressData } from '../../models/store/StoreAddressData';

export const onCreateStoreAddress = functions.firestore
  .document('storeAddresses/{storeAddressId}')
  .onCreate(async (snapshot, context) => {
    const storeAddressData = snapshot.data() as StoreAddressData;
    const { storeAddressId } = context.params;

    await updateStoreAddressList({ storeAddressId, storeAddressData, mode: 'create' });
  });
