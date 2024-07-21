import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { SmartBarData } from '../../../models/smartBar/SmartBarData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedSmartBarParameters {
  smartBarId: string;
  smartBarData: SmartBarData;
}

/**
 * Delete the smartBar and move the data to deletedSmartBars collections
 *
 * @param smartBarId: The id of smartBar
 * @param smartBarData: The original data of the smartBar
 */

export const addDeletedSmartBar = async ({ smartBarData, smartBarId }: AddDeletedSmartBarParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original smartBar
    const smartBarRef = db.collection('smartBars').doc(smartBarId);
    bigBatch.delete(smartBarRef);

    // Move the data to deleted smartBars collection
    const deletedSmartBarsRef = db.collection('deletedSmartBars').doc(smartBarId);
    bigBatch.set(deletedSmartBarsRef, smartBarData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted smart bar', error);
  }
};
