import { Product } from '../../../../models/product/Product';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { deleteField } from 'firebase/firestore';
import { BrandData } from '../../../../models/classification/brand/BrandData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateProductsBrandParameters {
  brandId: string;
  brandData: BrandData;
  mode: 'update' | 'delete';
}

/**
 * Update the brand in products when the brand is written.
 *
 * @param brandId - The id of the brand
 * @param brandData - The brand firebase data
 * @param mode - 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateProductsBrand = async ({ brandId, brandData, mode }: UpdateProductsBrandParameters) => {
  try {
    // prepare
    const productsRef = db.collection('products');
    // query the product with brand id
    const productsQuery = productsRef.where('brandId', '==', brandId);

    // get
    const productsSnap = await productsQuery.get();
    const bigBatch = new BigBatch(db);

    const updatedProduct: ExtendWithFieldValue<Partial<Product>> = {};
    if (mode === 'update') {
      const { nameZH, nameEN } = brandData;

      // update the brand name with name value
      updatedProduct.brandNameZH = nameZH;
      updatedProduct.brandNameEN = nameEN;

      productsSnap.docs.forEach((doc) => {
        bigBatch.update(doc.ref, updatedProduct);
      });
    }

    if (mode === 'delete') {
      // delete the brand name and slug
      updatedProduct.brandId = deleteField();
      updatedProduct.brandNameZH = deleteField();
      updatedProduct.brandNameEN = deleteField();
      productsSnap.docs.forEach((doc) => {
        bigBatch.update(doc.ref, updatedProduct);
      });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error("Error on updating products' brand", error);
  }
};
