import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue } from 'firebase-admin/firestore';
import { Brand } from '../../../models/classification/brand/Brand';
import { Category } from '../../../models/classification/category/Category';
import { Collection } from '../../../models/classification/collection/Collection';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateClassificationCountParameter {
  brandIdBefore?: string;
  brandIdAfter?: string;
  categoryIdBefore?: string;
  categoryIdAfter?: string;
  collectionIdBefore?: string;
  collectionIdAfter?: string;
  mode:
    | 'create-public'
    | 'create-private'
    | 'change-to-public'
    | 'change-to-private'
    | 'delete-public'
    | 'delete-private';
}

/**
 * Update the brand / category and collection count
 *
 * @param brandIdBefore - The brand id before
 * @param brandIdAfter - The brand id after
 * @param categoryIdBefore - The category id before
 * @param categoryIdAfter - The category id after
 * @param collectionIdBefore - The collection id before
 * @param collectionIdAfter - The collection id after
 * @param mode - 'create-public' | 'create-private' | 'change-to-public' | 'change-to-private' | 'delete-public' | 'delete-private'
 * @returns The promise of void
 */

export const updateClassificationCount = async ({
  brandIdBefore,
  brandIdAfter,
  categoryIdBefore,
  categoryIdAfter,
  collectionIdAfter,
  collectionIdBefore,
  mode,
}: UpdateClassificationCountParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    // Brand

    // Handle create
    if (mode === 'create-public') {
      if (brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
    }
    if (mode === 'create-private') {
      if (brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
    }
    // Handle delete
    if (mode === 'delete-public') {
      if (brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
    }
    if (mode === 'delete-private') {
      if (brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
    }
    // Handle update
    if (mode === 'change-to-public') {
      if (brandIdBefore && brandIdAfter && brandIdBefore === brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          privateProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
      if (brandIdBefore && !brandIdAfter) {
        const brandRefBefore = db.collection('brands').doc(brandIdBefore);
        const brandDataBefore: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefBefore, brandDataBefore);
      }
      if (!brandIdBefore && brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
      if (brandIdBefore && brandIdAfter && brandIdBefore !== brandIdAfter) {
        const brandRefBefore = db.collection('brands').doc(brandIdBefore);
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataBefore: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefBefore, brandDataBefore);
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
    }
    if (mode === 'change-to-private') {
      if (brandIdBefore && brandIdAfter && brandIdBefore === brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          publicProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
      if (brandIdBefore && !brandIdAfter) {
        const brandRefBefore = db.collection('brands').doc(brandIdBefore);
        const brandDataBefore: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefBefore, brandDataBefore);
      }
      if (!brandIdBefore && brandIdAfter) {
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
      if (brandIdBefore && brandIdAfter && brandIdBefore !== brandIdAfter) {
        const brandRefBefore = db.collection('brands').doc(brandIdBefore);
        const brandRefAfter = db.collection('brands').doc(brandIdAfter);
        const brandDataBefore: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        const brandDataAfter: ExtendWithFieldValue<Partial<Brand>> = {
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(brandRefBefore, brandDataBefore);
        bigBatch.update(brandRefAfter, brandDataAfter);
      }
    }

    // Category

    // Handle create
    if (mode === 'create-public') {
      if (categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
    }
    if (mode === 'create-private') {
      if (categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
    }
    // Handle delete
    if (mode === 'delete-public') {
      if (categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
    }
    if (mode === 'delete-private') {
      if (categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
    }
    // Handle update
    if (mode === 'change-to-public') {
      if (categoryIdBefore && categoryIdAfter && categoryIdBefore === categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          privateProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
      if (categoryIdBefore && !categoryIdAfter) {
        const categoryRefBefore = db.collection('categories').doc(categoryIdBefore);
        const categoryDataBefore: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefBefore, categoryDataBefore);
      }
      if (!categoryIdBefore && categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
      if (categoryIdBefore && categoryIdAfter && categoryIdBefore !== categoryIdAfter) {
        const categoryRefBefore = db.collection('categories').doc(categoryIdBefore);
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataBefore: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefBefore, categoryDataBefore);
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
    }
    if (mode === 'change-to-private') {
      if (categoryIdBefore && categoryIdAfter && categoryIdBefore === categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          publicProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
      if (categoryIdBefore && !categoryIdAfter) {
        const categoryRefBefore = db.collection('categories').doc(categoryIdBefore);
        const categoryDataBefore: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefBefore, categoryDataBefore);
      }
      if (!categoryIdBefore && categoryIdAfter) {
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
      if (categoryIdBefore && categoryIdAfter && categoryIdBefore !== categoryIdAfter) {
        const categoryRefBefore = db.collection('categories').doc(categoryIdBefore);
        const categoryRefAfter = db.collection('categories').doc(categoryIdAfter);
        const categoryDataBefore: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        const categoryDataAfter: ExtendWithFieldValue<Partial<Category>> = {
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(categoryRefBefore, categoryDataBefore);
        bigBatch.update(categoryRefAfter, categoryDataAfter);
      }
    }

    // Collection

    // Handle create
    if (mode === 'create-public') {
      if (collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
    }
    if (mode === 'create-private') {
      if (collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
    }
    // Handle delete
    if (mode === 'delete-public') {
      if (collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
    }
    if (mode === 'delete-private') {
      if (collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          updatedAt: FieldValue.serverTimestamp(),
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
    }
    // Handle update
    if (mode === 'change-to-public') {
      if (collectionIdBefore && collectionIdAfter && collectionIdBefore === collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          privateProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
      if (collectionIdBefore && !collectionIdAfter) {
        const collectionRefBefore = db.collection('collections').doc(collectionIdBefore);
        const collectionDataBefore: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefBefore, collectionDataBefore);
      }
      if (!collectionIdBefore && collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
      if (collectionIdBefore && collectionIdAfter && collectionIdBefore !== collectionIdAfter) {
        const collectionRefBefore = db.collection('collections').doc(collectionIdBefore);
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataBefore: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(1),
          publicProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefBefore, collectionDataBefore);
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
    }
    if (mode === 'change-to-private') {
      if (collectionIdBefore && collectionIdAfter && collectionIdBefore === collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          publicProductCount: FieldValue.increment(-1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
      if (collectionIdBefore && !collectionIdAfter) {
        const collectionRefBefore = db.collection('collections').doc(collectionIdBefore);
        const collectionDataBefore: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefBefore, collectionDataBefore);
      }
      if (!collectionIdBefore && collectionIdAfter) {
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
      if (collectionIdBefore && collectionIdAfter && collectionIdBefore !== collectionIdAfter) {
        const collectionRefBefore = db.collection('collections').doc(collectionIdBefore);
        const collectionRefAfter = db.collection('collections').doc(collectionIdAfter);
        const collectionDataBefore: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(-1),
          publicProductCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        const collectionDataAfter: ExtendWithFieldValue<Partial<Collection>> = {
          totalProductCount: FieldValue.increment(1),
          privateProductCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(collectionRefBefore, collectionDataBefore);
        bigBatch.update(collectionRefAfter, collectionDataAfter);
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating classification count after product changes', error);
  }
};
