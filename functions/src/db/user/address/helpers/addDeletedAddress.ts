import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { AddressData } from '../../../../models/AddressData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedAddressParameters {
  userId: string;
  addressId: string;
  addressData: AddressData;
}

/**
 * Delete the address and move the data to deletedAddresses collections
 *
 * @param userId: The id of user
 * @param addressId: The id of address
 * @param addressData: The original data of the address
 */

export const addDeletedAddress = async ({ userId, addressData, addressId }: AddDeletedAddressParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original address
    const addressRef = db.collection('users').doc(userId).collection('addresses').doc(addressId);
    bigBatch.delete(addressRef);

    // Move the data to deleted addresses collection
    const deletedAddressesRef = db.collection('users').doc(userId).collection('deletedAddresses').doc(addressId);
    bigBatch.set(deletedAddressesRef, addressData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted address', error);
  }
};
