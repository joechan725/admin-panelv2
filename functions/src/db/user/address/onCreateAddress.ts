import * as functions from 'firebase-functions';
import { updateAddressList } from './helpers/updateAddressList';
import { AddressData } from '../../../models/AddressData';
import { validateAddress } from './helpers/validateAddress';

export const onCreateAddress = functions.firestore
  .document('users/{userId}/addresses/{addressId}')
  .onCreate(async (snapshot, context) => {
    const addressRef = snapshot.ref;
    const addressData = snapshot.data() as AddressData;
    const { userId, addressId } = context.params;

    const { isValid } = await validateAddress({ addressData, addressRef });
    if (!isValid) {
      return;
    }

    await updateAddressList({ userId, addressId, addressData, mode: 'create' });
  });
