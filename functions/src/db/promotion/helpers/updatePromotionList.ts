import { FieldValue } from 'firebase-admin/firestore';
import { maxPromotionsPreList } from '../../maxItemsPreList';
import { PromotionData } from '../../../models/promotion/PromotionData';
import { PromotionListData } from '../../../models/promotion/PromotionListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdatePromotionListParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  promotionId: string;
  promotionDataBefore?: undefined;
  promotionDataAfter: PromotionData;
  mode: 'create';
}

interface UpdateModeParameters {
  promotionId: string;
  promotionDataBefore: PromotionData;
  promotionDataAfter: PromotionData;
  mode: 'update';
}

interface DeleteModeParameters {
  promotionId: string;
  promotionDataBefore: PromotionData;
  promotionDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the promotionList (denormalization) when the promotion is written.
 *
 * @param promotionId - The id of the promotion
 * @param promotionDataAfter - The promotion firebase data after
 * @param promotionDataBefore - The promotion firebase data before
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updatePromotionList = async ({
  promotionId,
  promotionDataAfter,
  promotionDataBefore,
  mode,
}: UpdatePromotionListParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const promotionListsRef = db.collection('promotionLists');

    if (mode === 'create') {
      // List data to be joined
      const promotionDataAfterWithId = {
        ...promotionDataAfter,
        id: promotionId,
      };
      const promotionListDataUnion: ExtendWithFieldValue<Partial<PromotionListData>> = {
        ids: FieldValue.arrayUnion(promotionId),
        promotions: FieldValue.arrayUnion(promotionDataAfterWithId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update private list
      // Find the latest list which contains promotions < maxPromotionsPreList
      const promotionListsRefQuery = promotionListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxPromotionsPreList)
        .limit(1);
      const promotionListsSnap = await promotionListsRefQuery.get();
      const promotionListSnap = promotionListsSnap.docs.at(0);
      if (promotionListSnap?.exists) {
        // Update private list
        // The latest created list exist
        // Join the product to that list
        const promotionListRef = promotionListSnap.ref;
        bigBatch.set(promotionListRef, promotionListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const promotionListRef = promotionListsRef.doc();
        promotionListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(promotionListRef, promotionListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // List data to be removed
      const promotionDataBeforeWithId = {
        ...promotionDataBefore,
        id: promotionId,
      };
      const promotionListDataRemove: ExtendWithFieldValue<Partial<PromotionListData>> = {
        promotions: FieldValue.arrayRemove(promotionDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // List data to be joined
      const promotionDataAfterWithId = {
        ...promotionDataAfter,
        id: promotionId,
      };
      const promotionListDataUnion: ExtendWithFieldValue<Partial<PromotionListData>> = {
        promotions: FieldValue.arrayUnion(promotionDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update private list
      const promotionListsQuery = promotionListsRef.where('ids', 'array-contains', promotionId).limit(1);
      const promotionListsSnap = await promotionListsQuery.get();
      const promotionListSnap = promotionListsSnap.docs.at(0);

      if (promotionListSnap?.exists) {
        // The promotion exists at a list already
        // Update the promotion at that list
        const promotionListRef = promotionListSnap.ref;
        bigBatch.set(promotionListRef, promotionListDataRemove, { merge: true });
        bigBatch.set(promotionListRef, promotionListDataUnion, { merge: true });
      } else {
        // No actions required if the user does not exist at a list
        throw new Error(
          `Error on updating promotion ${promotionId} from the list. Promotion ${promotionId} dose not exist at any list`
        );
      }
    }

    if (mode === 'delete') {
      // List data to be removed
      const promotionDataBeforeWithId = {
        ...promotionDataBefore,
        id: promotionId,
      };
      const promotionListDataRemove: ExtendWithFieldValue<Partial<PromotionListData>> = {
        ids: FieldValue.arrayRemove(promotionId),
        itemCount: FieldValue.increment(-1),
        promotions: FieldValue.arrayRemove(promotionDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update private list
      const promotionListsQuery = promotionListsRef.where('ids', 'array-contains', promotionId).limit(1);
      const promotionListsSnap = await promotionListsQuery.get();
      const promotionListSnap = promotionListsSnap.docs.at(0);

      if (promotionListSnap?.exists) {
        // The promotion exist at a list
        // Remove the promotion from the list
        const promotionListRef = promotionListSnap.ref;
        bigBatch.set(promotionListRef, promotionListDataRemove, { merge: true });
      } else {
        // No actions required if the promotion does not exist at a list
        throw new Error(
          `Error on deleting promotion ${promotionId} from the list. Promotion ${promotionId} dose not exist at any list`
        );
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating promotion list', error);
  }
};
