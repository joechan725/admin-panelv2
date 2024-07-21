import { FieldValue } from 'firebase-admin/firestore';
import { PrivateCategoryData } from '../../../../models/classification/category/PrivateCategoryData';
import { CategoryData as PublicCategoryData } from '../../../../models/classification/category/CategoryData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCategoryInClassificationListParameters {
  categoryId: string;
  privateCategoryData: PrivateCategoryData;
  publicCategoryData: PublicCategoryData;
  mode: 'create' | 'update' | 'delete';
}

/**
 * Update the privateClassificationList and classificationList when the category is written.
 *
 * @param categoryId - The id of the category
 * @param privateCategoryData - The private category firebase data
 * @param publicCategoryData - The public category firebase data
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateCategoryInClassificationList = async ({
  categoryId,
  privateCategoryData,
  publicCategoryData,
  mode,
}: UpdateCategoryInClassificationListParameters) => {
  try {
    const publicClassificationRef = db.collection('lists').doc('classificationList');
    const privateClassificationRef = db.collection('privateLists').doc('privateClassificationList');

    const bigBatch = new BigBatch(db);

    const objectKey = `category_${categoryId}`;

    if (mode === 'create') {
      bigBatch.set(publicClassificationRef, { [objectKey]: publicCategoryData }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: privateCategoryData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(publicClassificationRef, { [objectKey]: publicCategoryData }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: privateCategoryData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating category list', error);
  }
};
