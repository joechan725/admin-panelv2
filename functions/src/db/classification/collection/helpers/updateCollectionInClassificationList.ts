import { FieldValue } from 'firebase-admin/firestore';
import { PrivateCollectionData } from '../../../../models/classification/collection/PrivateCollectionData';
import { CollectionData as PublicCollectionData } from '../../../../models/classification/collection/CollectionData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCollectionInClassificationListParameters {
  collectionId: string;
  privateCollectionData: PrivateCollectionData;
  publicCollectionData: PublicCollectionData;
  mode: 'create' | 'update' | 'delete';
}

/**
 * Update the privateClassificationList and classificationList when the collection is written.
 *
 * @param collectionId - The id of the collection
 * @param privateCollectionData - The private collection firebase data
 * @param publicCollectionData - The public collection firebase data
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateCollectionInClassificationList = async ({
  collectionId,
  privateCollectionData,
  publicCollectionData,
  mode,
}: UpdateCollectionInClassificationListParameters) => {
  try {
    const publicClassificationRef = db.collection('lists').doc('classificationList');
    const privateClassificationRef = db.collection('privateLists').doc('privateClassificationList');

    const bigBatch = new BigBatch(db);

    const objectKey = `collection_${collectionId}`;

    if (mode === 'create' || mode === 'update') {
      bigBatch.set(publicClassificationRef, { [objectKey]: publicCollectionData }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: privateCollectionData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(publicClassificationRef, { [objectKey]: publicCollectionData }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: privateCollectionData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating collection list', error);
  }
};
