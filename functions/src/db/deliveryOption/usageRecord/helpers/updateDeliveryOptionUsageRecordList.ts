import { FieldValue } from 'firebase-admin/firestore';
import { DeliveryOptionUsageRecordData } from '../../../../models/deliveryOption/usageRecord/DeliveryOptionUsageRecordData';
import { DeliveryOptionUsageRecordListData } from '../../../../models/deliveryOption/usageRecord/DeliveryOptionUsageRecordListData';
import { maxDeliveryOptionUsageRecordsPreList } from '../../../maxItemsPreList';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

type UpdatePrivateDeliveryOptionParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  deliveryOptionId: string;
  deliveryOptionUsageRecordId: string;
  deliveryOptionUsageRecordDataBefore?: undefined;
  deliveryOptionUsageRecordDataAfter: DeliveryOptionUsageRecordData;
  mode: 'create';
}

interface UpdateModeParameters {
  deliveryOptionId: string;
  deliveryOptionUsageRecordId: string;
  deliveryOptionUsageRecordDataBefore: DeliveryOptionUsageRecordData;
  deliveryOptionUsageRecordDataAfter: DeliveryOptionUsageRecordData;
  mode: 'update';
}

interface DeleteModeParameters {
  deliveryOptionId: string;
  deliveryOptionUsageRecordId: string;
  deliveryOptionUsageRecordDataBefore: DeliveryOptionUsageRecordData;
  deliveryOptionUsageRecordDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the deliveryOptionUsageRecordList when the usageRecord is written.
 *
 * @param deliveryOptionId - The id of the deliveryOption
 * @param deliveryOptionUsageRecordId - The id of the deliveryOptionUsageRecord
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateDeliveryOptionUsageRecordList = async ({
  deliveryOptionId,
  deliveryOptionUsageRecordDataAfter,
  deliveryOptionUsageRecordDataBefore,
  deliveryOptionUsageRecordId,
  mode,
}: UpdatePrivateDeliveryOptionParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const deliveryOptionUsageRecordListsRef = db
      .collection('deliveryOptions')
      .doc(deliveryOptionId)
      .collection('usageRecordLists');

    if (mode === 'create') {
      // List data to be joined
      const usageRecordDataAfterWithId = {
        ...deliveryOptionUsageRecordDataAfter,
        id: deliveryOptionUsageRecordId,
      };
      const userId = usageRecordDataAfterWithId.userId;
      const deliveryOptionUsageRecordListDataUnion: ExtendWithFieldValue<Partial<DeliveryOptionUsageRecordListData>> = {
        deliveryOptionUsageRecords: FieldValue.arrayUnion(usageRecordDataAfterWithId),
        ids: FieldValue.arrayUnion(deliveryOptionUsageRecordId),
        userIds: FieldValue.arrayUnion(userId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Add usage record to the list which contains usageRecord < maxDeliveryOptionUsageRecordsPreList
      const deliveryOptionUsageRecordListsRefQuery = deliveryOptionUsageRecordListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxDeliveryOptionUsageRecordsPreList)
        .limit(1);
      const deliveryOptionUsageRecordListsSnap = await deliveryOptionUsageRecordListsRefQuery.get();
      const deliveryOptionUsageRecordListSnap = deliveryOptionUsageRecordListsSnap.docs.at(0);
      if (deliveryOptionUsageRecordListSnap?.exists) {
        // The latest created list exist
        // Join the record to that list
        const deliveryOptionUsageRecordListRef = deliveryOptionUsageRecordListSnap.ref;
        bigBatch.set(deliveryOptionUsageRecordListRef, deliveryOptionUsageRecordListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const deliveryOptionRecordListRef = deliveryOptionUsageRecordListsRef.doc();
        deliveryOptionUsageRecordListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(deliveryOptionRecordListRef, deliveryOptionUsageRecordListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // Update private list
      // List data to be removed
      // Note: the userId shall be remain since there might be some other records with same userId at the list
      const usageRecordDataBeforeWithId = {
        ...deliveryOptionUsageRecordDataBefore,
        id: deliveryOptionUsageRecordId,
      };
      const deliveryOptionUsageRecordListDataRemove: ExtendWithFieldValue<Partial<DeliveryOptionUsageRecordListData>> =
        {
          deliveryOptionUsageRecords: FieldValue.arrayRemove(usageRecordDataBeforeWithId),
          updatedAt: FieldValue.serverTimestamp(),
        };

      // List data to be joined
      const usageRecordDataAfterWithId = {
        ...deliveryOptionUsageRecordDataAfter,
        id: deliveryOptionUsageRecordId,
      };
      const deliveryOptionUsageRecordListDataUnion: ExtendWithFieldValue<Partial<DeliveryOptionUsageRecordListData>> = {
        deliveryOptionUsageRecords: FieldValue.arrayUnion(usageRecordDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the usage record
      const deliveryOptionUsageRecordListsQuery = deliveryOptionUsageRecordListsRef
        .where('ids', 'array-contains', deliveryOptionUsageRecordId)
        .limit(1);
      const deliveryOptionUsageRecordListsSnap = await deliveryOptionUsageRecordListsQuery.get();
      const deliveryOptionUsageRecordListSnap = deliveryOptionUsageRecordListsSnap.docs.at(0);

      if (deliveryOptionUsageRecordListSnap?.exists) {
        // The record exists at a list already
        // Update the record at that list
        const deliveryOptionUsageRecordListRef = deliveryOptionUsageRecordListSnap.ref;
        bigBatch.set(deliveryOptionUsageRecordListRef, deliveryOptionUsageRecordListDataRemove, { merge: true });
        bigBatch.set(deliveryOptionUsageRecordListRef, deliveryOptionUsageRecordListDataUnion, { merge: true });
      } else {
        // No actions required if the record does not exist at a list
        throw new Error(
          `Error on updating deliveryOption usage record ${deliveryOptionUsageRecordId} from the list. DeliveryOption usage record ${deliveryOptionUsageRecordId} dose not exist at any list`
        );
      }
    }

    if (mode === 'delete') {
      // Remove the record from private list
      // List data to be removed
      // Note: the userId shall be remain since there might be some other records with same userId at the list
      const usageRecordDataBeforeWithId = {
        ...deliveryOptionUsageRecordDataBefore,
        id: deliveryOptionUsageRecordId,
      };
      const deliveryOptionUsageRecordListDataRemove: ExtendWithFieldValue<Partial<DeliveryOptionUsageRecordListData>> =
        {
          deliveryOptionUsageRecords: FieldValue.arrayRemove(usageRecordDataBeforeWithId),
          ids: FieldValue.arrayRemove(deliveryOptionUsageRecordId),
          itemCount: FieldValue.increment(-1),
          updatedAt: FieldValue.serverTimestamp(),
        };

      // Find the list containing the usage record
      const deliveryOptionUsageRecordListsQuery = deliveryOptionUsageRecordListsRef
        .where('ids', 'array-contains', deliveryOptionUsageRecordId)
        .limit(1);
      const deliveryOptionUsageRecordListsSnap = await deliveryOptionUsageRecordListsQuery.get();
      const deliveryOptionUsageRecordListSnap = deliveryOptionUsageRecordListsSnap.docs.at(0);

      if (deliveryOptionUsageRecordListSnap?.exists) {
        // The record exist at a list
        // Remove the record from the list
        const deliveryOptionUsageRecordListRef = deliveryOptionUsageRecordListSnap.ref;
        bigBatch.set(deliveryOptionUsageRecordListRef, deliveryOptionUsageRecordListDataRemove, { merge: true });
      } else {
        // No actions required if the record does not exist at a list
        throw new Error(
          `Error on updating deliveryOption usage record ${deliveryOptionUsageRecordId} from the list. DeliveryOption usage record ${deliveryOptionUsageRecordId} dose not exist at any list`
        );
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating delivery option usage record list', error);
  }
};
