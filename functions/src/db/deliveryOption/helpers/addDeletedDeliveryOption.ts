import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { PrivateDeliveryOptionData } from '../../../models/deliveryOption/PrivateDeliveryOptionData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedDeliveryOptionParameters {
  deliveryOptionId: string;
  deliveryOptionData: PrivateDeliveryOptionData;
}

/**
 * Delete the deliveryOption and move the data to deletedDeliveryOptions collections
 *
 * @param deliveryOptionId: The id of deliveryOption
 * @param deliveryOptionData: The original data of the deliveryOption
 */

export const addDeletedDeliveryOption = async ({
  deliveryOptionData,
  deliveryOptionId,
}: AddDeletedDeliveryOptionParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original deliveryOption
    const deliveryOptionRef = db.collection('deliveryOptions').doc(deliveryOptionId);
    bigBatch.delete(deliveryOptionRef);

    // Move the data to deleted deliveryOptions collection
    const deletedDeliveryOptionsRef = db.collection('deletedDeliveryOptions').doc(deliveryOptionId);
    bigBatch.set(deletedDeliveryOptionsRef, deliveryOptionData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted delivery option', error);
  }
};
