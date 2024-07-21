import * as functions from 'firebase-functions';
import { updateAddressList } from './helpers/updateAddressList';
import { AddressData } from '../../../models/AddressData';

export const onCreateAddress = functions.firestore
  .document('users/{userId}/addresses/{addressId}')
  .onCreate(async (snapshot, context) => {
    const addressData = snapshot.data() as AddressData;
    const { userId, addressId } = context.params;

    await updateAddressList({ userId, addressId, addressData, mode: 'create' });
  });
