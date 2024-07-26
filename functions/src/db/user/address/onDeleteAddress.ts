import * as functions from 'firebase-functions';
import { updateAddressList } from './helpers/updateAddressList';
import { AddressData } from '../../../models/AddressData';
import { addDeletedAddress } from './helpers/addDeletedAddress';
import { Timestamp } from 'firebase-admin/firestore';

export const onDeleteAddress = functions.firestore
  .document('users/{userId}/addresses/{addressId}')
  .onDelete(async (snap, context) => {
    const addressData = { ...snap.data(), deletedAt: Timestamp.now() } as AddressData;
    const { userId, addressId } = context.params;

    await updateAddressList({ userId, addressId, addressData, mode: 'delete' });
    await addDeletedAddress({ userId, addressId, addressData });
  });
