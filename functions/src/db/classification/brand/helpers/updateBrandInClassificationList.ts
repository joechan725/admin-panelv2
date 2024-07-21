import { FieldValue } from 'firebase-admin/firestore';
import { PrivateBrandData } from '../../../../models/classification/brand/PrivateBrandData';
import { BrandData as PublicBrandData } from '../../../../models/classification/brand/BrandData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateBrandInClassificationListParameters {
  brandId: string;
  privateBrandData: PrivateBrandData;
  publicBrandData: PublicBrandData;
  mode: 'create' | 'update' | 'delete';
}

/**
 * Update the privateClassificationList and classificationList when the brand is written.
 *
 * @param brandId - The id of the brand
 * @param privateBrandData - The private brand firebase data
 * @param publicBrandData - The public brand firebase data
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateBrandInClassificationList = async ({
  brandId,
  privateBrandData,
  publicBrandData,
  mode,
}: UpdateBrandInClassificationListParameters) => {
  try {
    const publicClassificationRef = db.collection('lists').doc('classificationList');
    const privateClassificationRef = db.collection('privateLists').doc('privateClassificationList');

    const bigBatch = new BigBatch(db);

    const objectKey = `brand_${brandId}`;

    if (mode === 'create') {
      bigBatch.set(publicClassificationRef, { [objectKey]: publicBrandData }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: privateBrandData }, { merge: true });
    }

    if (mode === 'update') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(publicClassificationRef, { [objectKey]: publicBrandData }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: privateBrandData }, { merge: true });
    }

    if (mode === 'delete') {
      bigBatch.set(publicClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
      bigBatch.set(privateClassificationRef, { [objectKey]: FieldValue.delete() }, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating brand list', error);
  }
};
