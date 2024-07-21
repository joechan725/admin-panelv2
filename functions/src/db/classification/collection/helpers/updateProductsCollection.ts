import { Product } from '../../../../models/product/Product';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { deleteField } from 'firebase/firestore';
import { CollectionData } from '../../../../models/classification/collection/CollectionData';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateProductsCollectionParameters {
  collectionId: string;
  collectionData: CollectionData;
  mode: 'update' | 'delete';
}

/**
 * Update the collection in products when the collection is written.
 *
 * @param collectionId - The id of the collection
 * @param collectionData - The collection firebase data
 * @param mode - 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateProductsCollection = async ({
  collectionId,
  collectionData,
  mode,
}: UpdateProductsCollectionParameters) => {
  try {
    // prepare
    const productsRef = db.collection('products');
    // query the product with collection id
    const productsQuery = productsRef.where('collectionId', '==', collectionId);

    // get
    const productsSnap = await productsQuery.get();
    const bigBatch = new BigBatch(db);

    const updatedProduct: ExtendWithFieldValue<Partial<Product>> = {};
    if (mode === 'update') {
      const { nameZH, nameEN } = collectionData;

      // update the collection name with name value
      updatedProduct.collectionNameZH = nameZH;
      updatedProduct.collectionNameEN = nameEN;

      productsSnap.docs.forEach((doc) => {
        bigBatch.update(doc.ref, updatedProduct);
      });
    }

    if (mode === 'delete') {
      // delete the collection name and slug
      updatedProduct.collectionId = deleteField();
      updatedProduct.collectionNameZH = deleteField();
      updatedProduct.collectionNameEN = deleteField();
      productsSnap.docs.forEach((doc) => {
        bigBatch.update(doc.ref, updatedProduct);
      });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error("Error on updating product's collection", error);
  }
};
