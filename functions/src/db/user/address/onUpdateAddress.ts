import * as functions from 'firebase-functions';
import { updateAddressList } from './helpers/updateAddressList';
import { AddressData } from '../../../models/AddressData';
import { addDeletedAddress } from './helpers/addDeletedAddress';
import { validateAddress } from './helpers/validateAddress';

export const onUpdateAddress = functions.firestore
  .document('users/{userId}/addresses/{addressId}')
  .onUpdate(async (change, context) => {
    const addressSnapAfter = change.after;
    const addressRef = addressSnapAfter.ref;

    const addressDataAfter = addressSnapAfter.data() as AddressData;
    const { userId, addressId } = context.params;

    const { isValid } = await validateAddress({ addressData: addressDataAfter, addressRef });
    if (!isValid) {
      return;
    }

    if (addressDataAfter.deletedAt === undefined) {
      await updateAddressList({ userId, addressId, addressData: addressDataAfter, mode: 'update' });
    }

    if (addressDataAfter.deletedAt !== undefined) {
      await updateAddressList({ userId, addressId, addressData: addressDataAfter, mode: 'delete' });
      await addDeletedAddress({ userId, addressId, addressData: addressDataAfter });
    }
  });
