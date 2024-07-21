import { FieldValue } from 'firebase-admin/firestore';
import { StoreAddressData } from '../../../models/store/StoreAddressData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateStoreAddressListParameter {
  storeAddressId: string;
  storeAddressData: StoreAddressData;
  mode: 'create' | 'update' | 'delete';
}

/**
 * Update the store address list
 *
 * @param storeAddressId - The id of store address
 * @param storeAddressData - The firestore store Address data
 * @param mode - 'create' | 'update' | 'delete'
 *
 * @returns The promise of void
 */

export const updateStoreAddressList = async ({
  storeAddressId,
  mode,
  storeAddressData,
}: UpdateStoreAddressListParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    const storeAddressListRef = db.collection('lists').doc('storeAddressList');

    if (mode === 'create') {
      bigBatch.set(storeAddressListRef, { [storeAddressId]: storeAddressData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(storeAddressListRef, { [storeAddressId]: FieldValue.delete() }, { merge: true });
      bigBatch.set(storeAddressListRef, { [storeAddressId]: storeAddressData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(storeAddressListRef, { [storeAddressId]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating store address list', error);
  }
};
