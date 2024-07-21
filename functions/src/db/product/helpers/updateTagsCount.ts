import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { Tag } from '../../../models/tag/Tag';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateTagsCountParameters {
  productIsPublicAfter: boolean;
  productIsPublicBefore?: boolean;
  tagsAfter: string[];
  tagsBefore?: string[];
  mode: 'create' | 'update' | 'delete';
}

export const updateTagsCount = async ({
  tagsAfter,
  tagsBefore,
  mode,
  productIsPublicAfter,
  productIsPublicBefore,
}: UpdateTagsCountParameters) => {
  try {
    const tagsRef = db.collection('tags');

    const bigBatch = new BigBatch(db);

    // Handle creation of a new product.
    if (mode === 'create') {
      tagsAfter.forEach((tag) => {
        const tagRef = tagsRef.doc(tag);

        if (productIsPublicAfter) {
          // A public product is created
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(1),
            totalPublicProductCount: FieldValue.increment(1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }

        if (!productIsPublicAfter) {
          // A private product is created
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(1),
            totalPrivateProductCount: FieldValue.increment(1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }
      });
    }

    // Handle updates to an existing product.
    if (mode === 'update' && tagsBefore) {
      // Find the added tags
      const tagsAdded = tagsAfter.filter((tagAfter) => !tagsBefore.some((tagBefore) => tagBefore === tagAfter));
      // Update the tags added.
      tagsAdded.map((tag) => {
        const tagRef = tagsRef.doc(tag);

        if (productIsPublicAfter) {
          // The product is changed to public
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(1),
            totalPublicProductCount: FieldValue.increment(1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }
        if (!productIsPublicAfter) {
          // The product is changed to private
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(1),
            totalPrivateProductCount: FieldValue.increment(1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }
      });

      // Find the removed tags
      const tagsRemoved = tagsBefore.filter((tagBefore) => !tagsAfter.some((tagAfter) => tagAfter === tagBefore));
      // Update the tags removed
      tagsRemoved.map((tag) => {
        const tagRef = tagsRef.doc(tag);

        if (productIsPublicBefore) {
          // The product is originally public
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(-1),
            totalPublicProductCount: FieldValue.increment(-1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }

        if (!productIsPublicBefore) {
          // The product is originally private
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(-1),
            totalPrivateProductCount: FieldValue.increment(-1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }
      });
      if (productIsPublicAfter !== productIsPublicBefore) {
        // The publicity of product is changed
        // Find the tags overlapped
        const tagsOverlapped = tagsBefore.filter((tagBefore) => tagsAfter.some((tagAfter) => tagAfter === tagBefore));
        // Update the tags overlapped
        tagsOverlapped.forEach((tag) => {
          const tagRef = tagsRef.doc(tag);
          if (productIsPublicAfter) {
            // The product is changed to public
            const tagData: ExtendWithFieldValue<Partial<Tag>> = {
              totalPublicProductCount: FieldValue.increment(1),
              totalPrivateProductCount: FieldValue.increment(-1),
              updatedAt: FieldValue.serverTimestamp(),
            };
            bigBatch.set(tagRef, tagData, { merge: true });
          }
          if (!productIsPublicAfter) {
            // The product is changed to private
            const tagData: ExtendWithFieldValue<Partial<Tag>> = {
              totalPublicProductCount: FieldValue.increment(-1),
              totalPrivateProductCount: FieldValue.increment(1),
              updatedAt: FieldValue.serverTimestamp(),
            };
            bigBatch.set(tagRef, tagData, { merge: true });
          }
        });
      }
    }

    // Handle deletion of a product.
    if (mode === 'delete') {
      tagsAfter.forEach((tag) => {
        const tagRef = tagsRef.doc(tag);

        if (productIsPublicAfter) {
          // A public product is deleted
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(-1),
            totalPublicProductCount: FieldValue.increment(-1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }
        if (!productIsPublicAfter) {
          // A private product is deleted
          const tagData: ExtendWithFieldValue<Partial<Tag>> = {
            totalProductCount: FieldValue.increment(-1),
            totalPrivateProductCount: FieldValue.increment(-1),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.set(tagRef, tagData, { merge: true });
        }
      });
    }

    // Commit all changes made in the bigBatch.
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating tags count after product changes', error);
  }
};
