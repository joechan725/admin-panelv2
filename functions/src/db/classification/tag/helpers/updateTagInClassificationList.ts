import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { Tag } from '../../../../models/tag/Tag';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateTagInClassificationListParameters {
  tagId: string;
  publicTagData: PublicTagData;
  mode: 'create' | 'update' | 'delete';
}

interface PublicTagData extends Omit<Tag, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Update the privateClassificationList and classificationList when the tag is written.
 *
 * @param tagId - The id of the tag
 * @param publicTagData - The public tag firebase data
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateTagInClassificationList = async ({
  tagId,
  publicTagData,
  mode,
}: UpdateTagInClassificationListParameters) => {
  try {
    const publicClassificationRef = db.collection('lists').doc('classificationList');
    const privateClassificationRef = db.collection('privateLists').doc('privateClassificationList');

    const bigBatch = new BigBatch(db);

    const objectKey = `tag_${tagId}`;

    if (mode === 'create') {
      bigBatch.set(privateClassificationRef, { [objectKey]: publicTagData }, { merge: true });
      bigBatch.set(publicClassificationRef, { [objectKey]: publicTagData }, { merge: true });
    }

    if (mode === 'update') {
      const { totalPrivateProductCount = 0, totalPublicProductCount = 0 } = publicTagData;
      if (totalPrivateProductCount <= 0) {
        bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      } else {
        bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
        bigBatch.set(privateClassificationRef, { [objectKey]: publicTagData }, { merge: true });
      }
      if (totalPublicProductCount <= 0) {
        bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      } else {
        bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
        bigBatch.set(publicClassificationRef, { [objectKey]: publicTagData }, { merge: true });
      }
    }

    if (mode === 'delete') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating tag list', error);
  }
};
