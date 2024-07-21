import { Product } from '../../../../models/product/Product';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { deleteField } from 'firebase/firestore';
import { CategoryData } from '../../../../models/classification/category/CategoryData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateProductsCategoryParameters {
  categoryId: string;
  categoryData: CategoryData;
  mode: 'update' | 'delete';
}

/**
 * Update the category in products when the category is written.
 *
 * @param categoryId - The id of the category
 * @param categoryData - The category firebase data
 * @param mode - 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateProductsCategory = async ({ categoryId, categoryData, mode }: UpdateProductsCategoryParameters) => {
  try {
    // prepare
    const productsRef = db.collection('products');
    // query the product with category id
    const productsQuery = productsRef.where('categoryId', '==', categoryId);

    // get
    const productsSnap = await productsQuery.get();
    const bigBatch = new BigBatch(db);

    const updatedProduct: ExtendWithFieldValue<Partial<Product>> = {};
    if (mode === 'update') {
      const { nameZH, nameEN } = categoryData;

      // update the category name with name value
      updatedProduct.categoryNameEN = nameEN;
      updatedProduct.categoryNameZH = nameZH;

      productsSnap.docs.forEach((doc) => {
        bigBatch.update(doc.ref, updatedProduct);
      });
    }

    if (mode === 'delete') {
      // delete the category name and slug
      updatedProduct.categoryId = deleteField();
      updatedProduct.categoryNameEN = deleteField();
      updatedProduct.categoryNameZH = deleteField();
      productsSnap.docs.forEach((doc) => {
        bigBatch.update(doc.ref, updatedProduct);
      });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error("Error on updating products's category", error);
  }
};
