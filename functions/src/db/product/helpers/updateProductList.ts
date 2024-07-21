import { FieldValue } from 'firebase-admin/firestore';
import { maxProductsPreList } from '../../maxItemsPreList';
import { PrivateProductData } from '../../../models/product/PrivateProductData';
import { ProductData as PublicProductData } from '../../../models/product/ProductData';
import { PrivateProductListData } from '../../../models/product/PrivateProductListData';
import { ProductListData as PublicProductListData } from '../../../models/product/ProductListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdatePrivateProductParameters = CreateMode | UpdateMode | DeleteMode;

interface CreateMode {
  productId: string;
  privateProductDataBefore?: undefined;
  publicProductDataBefore?: undefined;
  privateProductDataAfter: PrivateProductData;
  publicProductDataAfter: PublicProductData;
  mode: 'create';
}

interface UpdateMode {
  productId: string;
  privateProductDataBefore: PrivateProductData;
  publicProductDataBefore: PublicProductData;
  privateProductDataAfter: PrivateProductData;
  publicProductDataAfter: PublicProductData;
  mode: 'update';
}

interface DeleteMode {
  productId: string;
  privateProductDataBefore: PrivateProductData;
  publicProductDataBefore: PublicProductData;
  privateProductDataAfter?: undefined;
  publicProductDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the privateProductList and publicProductList (denormalization) when the product is written.
 *
 * @param productId - The id of the product
 * @param privateProductData - The private product firebase data
 * @param publicProductData - The public product firebase data
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateProductList = async ({
  productId,
  privateProductDataBefore,
  publicProductDataBefore,
  privateProductDataAfter,
  publicProductDataAfter,
  mode,
}: UpdatePrivateProductParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateProductListsRef = db.collection('privateProductLists');
    const publicProductListsRef = db.collection('productLists');

    if (mode === 'create') {
      if (publicProductDataAfter.isPublic) {
        // The product is public
        // Add product to a public list
        const publicProductDataAfterWithId = {
          ...publicProductDataAfter,
          id: productId,
        };
        const publicProductListDataUnion: ExtendWithFieldValue<Partial<PublicProductListData>> = {
          ids: FieldValue.arrayUnion(productId),
          products: FieldValue.arrayUnion(publicProductDataAfterWithId),
          itemCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        // Find the latest created list which contains products < maxProductsPreList
        const publicProductListsRefQuery = publicProductListsRef
          .orderBy('createdAt', 'desc')
          .where('itemCount', '<', maxProductsPreList)
          .limit(1);
        const publicProductListsSnap = await publicProductListsRefQuery.get();
        const publicProductListSnap = publicProductListsSnap.docs.at(0);
        if (publicProductListSnap?.exists) {
          // The latest created list exist
          // Join the product to that list
          const publicProductListRef = publicProductListSnap.ref;
          bigBatch.set(publicProductListRef, publicProductListDataUnion, { merge: true });
        } else {
          // The latest list does not exist
          // Create a new list
          const publicProductListRef = publicProductListsRef.doc();
          publicProductListDataUnion.createdAt = FieldValue.serverTimestamp();
          bigBatch.set(publicProductListRef, publicProductListDataUnion, { merge: true });
        }
      }

      // Add product to private list
      const privateProductDataAfterWithId = {
        ...privateProductDataAfter,
        id: productId,
      };
      const privateProductListDataUnion: ExtendWithFieldValue<Partial<PrivateProductListData>> = {
        ids: FieldValue.arrayUnion(productId),
        products: FieldValue.arrayUnion(privateProductDataAfterWithId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the created latest list which contains products < maxProductsPreList
      const privateProductListsRefQuery = privateProductListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxProductsPreList)
        .limit(1);
      const privateProductListsSnap = await privateProductListsRefQuery.get();
      const privateProductListSnap = privateProductListsSnap.docs.at(0);
      if (privateProductListSnap?.exists) {
        // The latest created list exist
        // Join the product to that list
        const privateProductListRef = privateProductListSnap.ref;
        bigBatch.set(privateProductListRef, privateProductListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateProductListRef = privateProductListsRef.doc();
        privateProductListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateProductListRef, privateProductListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // Update the product at public list
      const publicProductDataBeforeWithId = {
        ...publicProductDataBefore,
        id: productId,
      };
      const publicProductListDataRemove: ExtendWithFieldValue<Partial<PublicProductListData>> = {
        products: FieldValue.arrayRemove(publicProductDataBeforeWithId),
        ids: FieldValue.arrayRemove(productId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      const publicProductDataAfterWithId = {
        ...publicProductDataAfter,
        id: productId,
      };
      const publicProductListDataUnion: ExtendWithFieldValue<Partial<PublicProductListData>> = {
        products: FieldValue.arrayUnion(publicProductDataAfterWithId),
        ids: FieldValue.arrayUnion(productId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the list containing the product
      const publicProductListsRefQuery = publicProductListsRef.where('ids', 'array-contains', productId).limit(1);
      const publicProductListsSnap = await publicProductListsRefQuery.get();
      const publicProductListSnap = publicProductListsSnap.docs.at(0);

      if (publicProductDataAfter.isPublic) {
        if (publicProductListSnap?.exists) {
          // The product exists at a list already
          // Update that list
          const publicProductListRef = publicProductListSnap.ref;
          bigBatch.set(publicProductListRef, publicProductListDataRemove, { merge: true });
          bigBatch.set(publicProductListRef, publicProductListDataUnion, { merge: true });
        } else {
          // The product does not exist at any list
          // Find the latest created list which contains products < maxProductsPreList
          const publicProductListsRefQuery = publicProductListsRef
            .orderBy('createdAt', 'desc')
            .where('itemCount', '<', maxProductsPreList)
            .limit(1);
          const publicProductListsSnap = await publicProductListsRefQuery.get();
          const publicProductListSnap = publicProductListsSnap.docs.at(0);
          if (publicProductListSnap?.exists) {
            // A latest list exists
            // join the product to that list
            const publicProductListRef = publicProductListSnap.ref;
            bigBatch.set(publicProductListRef, publicProductListDataUnion, { merge: true });
          } else {
            // There are no any existing list
            // Create a new list
            const publicProductListRef = publicProductListsRef.doc();
            publicProductListDataUnion.createdAt = FieldValue.serverTimestamp();
            bigBatch.set(publicProductListRef, publicProductListDataUnion, { merge: true });
          }
        }
      }

      if (!publicProductDataAfter.isPublic) {
        if (publicProductListSnap?.exists) {
          // The product exists at a list already
          // Remove the product from that list
          const publicProductListRef = publicProductListSnap.ref;
          bigBatch.set(publicProductListRef, publicProductListDataRemove, { merge: true });
        }
        // No actions required if the product does not exist at a list
      }

      // Update the product at the private list
      const privateProductDataBeforeWithId = {
        ...privateProductDataBefore,
        id: productId,
      };
      const privateProductListDataRemove: ExtendWithFieldValue<Partial<PrivateProductListData>> = {
        products: FieldValue.arrayRemove(privateProductDataBeforeWithId),
        ids: FieldValue.arrayRemove(productId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      const privateProductDataAfterWithId = {
        ...privateProductDataAfter,
        id: productId,
      };
      const privateProductListDataUnion: ExtendWithFieldValue<Partial<PrivateProductListData>> = {
        products: FieldValue.arrayUnion(privateProductDataAfterWithId),
        ids: FieldValue.arrayUnion(productId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the list containing the product
      const privateProductListsQuery = privateProductListsRef.where('ids', 'array-contains', productId).limit(1);
      const privateProductListsSnap = await privateProductListsQuery.get();
      const privateProductListSnap = privateProductListsSnap.docs.at(0);

      if (privateProductListSnap?.exists) {
        // The product exists at a list already
        // Update the product at that list
        const privateProductListRef = privateProductListSnap.ref;
        bigBatch.set(privateProductListRef, privateProductListDataRemove, { merge: true });
        bigBatch.set(privateProductListRef, privateProductListDataUnion, { merge: true });
      }
      // No actions required if the product does not exist at a list
    }

    if (mode === 'delete') {
      // Remove the product from public list
      const publicProductDataBeforeWithId = {
        ...publicProductDataBefore,
        id: productId,
      };
      const publicProductListDataRemove: ExtendWithFieldValue<Partial<PublicProductListData>> = {
        products: FieldValue.arrayRemove(publicProductDataBeforeWithId),
        ids: FieldValue.arrayRemove(productId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the list containing the product
      const publicProductListsRefQuery = publicProductListsRef.where('ids', 'array-contains', productId).limit(1);
      const publicProductListsSnap = await publicProductListsRefQuery.get();
      const publicProductListSnap = publicProductListsSnap.docs.at(0);

      if (publicProductListSnap?.exists) {
        // The product exist at a list
        // Remove the product from the list
        const publicProductListRef = publicProductListSnap.ref;
        bigBatch.set(publicProductListRef, publicProductListDataRemove, { merge: true });
      }
      // No actions required if the product does not exist at a list

      // Remove the product from private list
      const privateProductDataBeforeWithId = {
        ...privateProductDataBefore,
        id: productId,
      };
      const privateProductListDataRemove: ExtendWithFieldValue<Partial<PrivateProductListData>> = {
        products: FieldValue.arrayRemove(privateProductDataBeforeWithId),
        ids: FieldValue.arrayRemove(productId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the list containing the product
      const privateProductListsQuery = privateProductListsRef.where('ids', 'array-contains', productId).limit(1);
      const privateProductListsSnap = await privateProductListsQuery.get();
      const privateProductListSnap = privateProductListsSnap.docs.at(0);

      if (privateProductListSnap?.exists) {
        // The product exist at a list
        // Remove the product from the list
        const privateProductListRef = privateProductListSnap.ref;
        bigBatch.set(privateProductListRef, privateProductListDataRemove, { merge: true });
      }
      // No actions required if the product does not exist at a list
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating product list', error);
  }
};
