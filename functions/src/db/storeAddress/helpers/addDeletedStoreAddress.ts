import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { StoreAddressData } from '../../../models/store/StoreAddressData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedStoreAddressParameters {
  storeAddressId: string;
  storeAddressData: StoreAddressData;
}

/**
 * Delete the storeAddress and move the data to deletedStoreAddresses collections
 *
 * @param storeAddressId: The id of storeAddress
 * @param storeAddressData: The original data of the storeAddress
 */

export const addDeletedStoreAddress = async ({
  storeAddressData,
  storeAddressId,
}: AddDeletedStoreAddressParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original storeAddress
    const storeAddressRef = db.collection('storeAddresses').doc(storeAddressId);
    bigBatch.delete(storeAddressRef);

    // Move the data to deleted storeAddresses collection
    const deletedStoreAddressesRef = db.collection('deletedStoreAddresses').doc(storeAddressId);
    bigBatch.set(deletedStoreAddressesRef, storeAddressData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted store address', error);
  }
};
