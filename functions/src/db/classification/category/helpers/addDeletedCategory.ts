import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { PrivateCategoryData } from '../../../../models/classification/category/PrivateCategoryData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedCategoryParameters {
  categoryId: string;
  categoryData: PrivateCategoryData;
}

/**
 * Delete the category and move the data to deletedCategories collections
 *
 * @param categoryId: The id of category
 * @param categoryData: The original data of the category
 */

export const addDeletedCategory = async ({ categoryData, categoryId }: AddDeletedCategoryParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original category
    const categoryRef = db.collection('categories').doc(categoryId);
    bigBatch.delete(categoryRef);

    // Move the data to deleted categories collection
    const deletedCategoriesRef = db.collection('deletedCategories').doc(categoryId);
    bigBatch.set(deletedCategoriesRef, categoryData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted category', error);
  }
};
