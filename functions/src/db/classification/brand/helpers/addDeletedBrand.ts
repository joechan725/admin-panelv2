import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { PrivateBrandData } from '../../../../models/classification/brand/PrivateBrandData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedBrandParameters {
  brandId: string;
  brandData: PrivateBrandData;
}

/**
 * Delete the brand and move the data to deletedBrands collections
 *
 * @param brandId: The id of brand
 * @param brandData: The original data of the brand
 */

export const addDeletedBrand = async ({ brandData, brandId }: AddDeletedBrandParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original brand
    const brandRef = db.collection('brands').doc(brandId);
    bigBatch.delete(brandRef);

    // Move the data to deleted brands collection
    const deletedBrandsRef = db.collection('deletedBrands').doc(brandId);
    bigBatch.set(deletedBrandsRef, brandData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted brand', error);
  }
};
