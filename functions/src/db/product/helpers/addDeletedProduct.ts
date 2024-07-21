import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { PrivateProductData } from '../../../models/product/PrivateProductData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedProductParameters {
  productId: string;
  productData: PrivateProductData;
}

/**
 * Delete the product and move the data to deletedProducts collections
 *
 * @param productId: The id of product
 * @param productData: The original data of the product
 */

export const addDeletedProduct = async ({ productData, productId }: AddDeletedProductParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original product
    const productRef = db.collection('products').doc(productId);
    bigBatch.delete(productRef);

    // Move the data to deleted products collection
    const deletedProductsRef = db.collection('deletedProducts').doc(productId);
    bigBatch.set(deletedProductsRef, productData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted product', error);
  }
};
