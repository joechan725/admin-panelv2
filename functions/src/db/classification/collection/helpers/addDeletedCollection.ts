import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { PrivateCollectionData } from '../../../../models/classification/collection/PrivateCollectionData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedCollectionParameters {
  collectionId: string;
  collectionData: PrivateCollectionData;
}

/**
 * Delete the collection and move the data to deletedCollections collections
 *
 * @param collectionId: The id of collection
 * @param collectionData: The original data of the collection
 */

export const addDeletedCollection = async ({ collectionData, collectionId }: AddDeletedCollectionParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original collection
    const collectionRef = db.collection('collections').doc(collectionId);
    bigBatch.delete(collectionRef);

    // Move the data to deleted collections collection
    const deletedCollectionsRef = db.collection('deletedCollections').doc(collectionId);
    bigBatch.set(deletedCollectionsRef, collectionData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted collection', error);
  }
};
