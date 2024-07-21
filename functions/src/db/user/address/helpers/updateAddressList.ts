import { FieldValue } from 'firebase-admin/firestore';
import { AddressData } from '../../../../models/AddressData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateAddressListParameter {
  userId: string;
  addressId: string;
  mode: 'create' | 'update' | 'delete';
  addressData: AddressData;
}

/**
 * Update the addressList in user list sub-collection
 * and addressCount in the user documents
 *
 * @param userId - The id of user
 * @param addressId - The id of address
 * @param addressData - The firestore address data
 * @param mode - 'create' | 'update' | 'delete'
 *
 * @returns The promise of void
 */

export const updateAddressList = async ({ userId, addressId, mode, addressData }: UpdateAddressListParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    const addressListRef = db.collection('users').doc(userId).collection('lists').doc('userStoredList');

    const objectKey = `address_${addressId}`;

    if (mode === 'create') {
      bigBatch.set(addressListRef, { [objectKey]: addressData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(addressListRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(addressListRef, { [objectKey]: addressData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(addressListRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating address list', error);
  }
};
