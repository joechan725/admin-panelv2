import { FieldValue } from 'firebase-admin/firestore';
import { maxSmartBarsPreList } from '../../maxItemsPreList';
import { SmartBarData } from '../../../models/smartBar/SmartBarData';
import { SmartBarListData } from '../../../models/smartBar/SmartBarListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdatePrivateSmartBarParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  smartBarId: string;
  smartBarDataBefore?: undefined;
  smartBarDataAfter: SmartBarData;
  mode: 'create';
}

interface UpdateModeParameters {
  smartBarId: string;
  smartBarDataBefore: SmartBarData;
  smartBarDataAfter: SmartBarData;
  mode: 'update';
}

interface DeleteModeParameters {
  smartBarId: string;
  smartBarDataBefore: SmartBarData;
  smartBarDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the smartBarList (denormalization) when the smartBar is written.
 *
 * @param smartBarId - The id of the smartBar
 * @param smartBarDataBefore - The smartBar firebase data before
 * @param smartBarDataAfter - The smartBar firebase data after
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateSmartBarList = async ({
  smartBarId,
  smartBarDataAfter,
  smartBarDataBefore,
  mode,
}: UpdatePrivateSmartBarParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateSmartBarListsRef = db.collection('privateSmartBarLists');
    const publicSmartBarListsRef = db.collection('smartBarLists');

    if (mode === 'create') {
      // List data to be joined
      const smartBarDataAfterWithId = {
        ...smartBarDataAfter,
        id: smartBarId,
      };
      const smartBarListDataUnion: ExtendWithFieldValue<Partial<SmartBarListData>> = {
        smartBars: FieldValue.arrayUnion(smartBarDataAfterWithId),
        ids: FieldValue.arrayUnion(smartBarId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (smartBarDataAfter.isPublic) {
        // The smartBar is public
        // Add smartBar to a public list
        // Find the latest created list which contains smartBars < maxSmartBarsPreList
        const publicSmartBarListsRefQuery = publicSmartBarListsRef
          .orderBy('createdAt', 'desc')
          .where('itemCount', '<', maxSmartBarsPreList)
          .limit(1);
        const publicSmartBarListsSnap = await publicSmartBarListsRefQuery.get();
        const publicSmartBarListSnap = publicSmartBarListsSnap.docs.at(0);
        if (publicSmartBarListSnap?.exists) {
          // The latest created list exist
          // Join the smartBar to that list
          const publicSmartBarListRef = publicSmartBarListSnap.ref;
          bigBatch.set(publicSmartBarListRef, smartBarListDataUnion, { merge: true });
        } else {
          // The latest list does not exist
          // Create a new list
          const publicSmartBarListRef = publicSmartBarListsRef.doc();
          smartBarListDataUnion.createdAt = FieldValue.serverTimestamp();
          bigBatch.set(publicSmartBarListRef, smartBarListDataUnion, { merge: true });
        }
      }

      // Add smart bar to private list
      // Find the latest created list which contains smartBars < maxSmartBarsPreList
      const privateSmartBarListsRefQuery = privateSmartBarListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxSmartBarsPreList)
        .limit(1);
      const privateSmartBarListsSnap = await privateSmartBarListsRefQuery.get();
      const privateSmartBarListSnap = privateSmartBarListsSnap.docs.at(0);
      if (privateSmartBarListSnap?.exists) {
        // Update private list
        // The latest created list exist
        // Join the product to that list
        const privateSmartBarListRef = privateSmartBarListSnap.ref;
        bigBatch.set(privateSmartBarListRef, smartBarListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateSmartBarListRef = privateSmartBarListsRef.doc();
        smartBarListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateSmartBarListRef, smartBarListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // The list data to be removed
      const smartBarDataBeforeWithId = {
        ...smartBarDataBefore,
        id: smartBarId,
      };
      const smartBarListDataRemove: ExtendWithFieldValue<Partial<SmartBarListData>> = {
        smartBars: FieldValue.arrayRemove(smartBarDataBeforeWithId),
        ids: FieldValue.arrayRemove(smartBarId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const smartBarDataAfterWithId = {
        ...smartBarDataAfter,
        id: smartBarId,
      };
      const smartBarListDataUnion: ExtendWithFieldValue<Partial<SmartBarListData>> = {
        smartBars: FieldValue.arrayUnion(smartBarDataAfterWithId),
        ids: FieldValue.arrayUnion(smartBarId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update public list
      // Find the list containing the smartBar
      const publicSmartBarListsRefQuery = publicSmartBarListsRef.where('ids', 'array-contains', smartBarId).limit(1);
      const publicSmartBarListsSnap = await publicSmartBarListsRefQuery.get();
      const publicSmartBarListSnap = publicSmartBarListsSnap.docs.at(0);

      if (smartBarDataAfter.isPublic) {
        if (publicSmartBarListSnap?.exists) {
          // The smartBar exists at a list already
          // Update that list
          const publicSmartBarListRef = publicSmartBarListSnap.ref;
          bigBatch.set(publicSmartBarListRef, smartBarListDataRemove, { merge: true });
          bigBatch.set(publicSmartBarListRef, smartBarListDataUnion, { merge: true });
        } else {
          // The smartBar does not exist at any list
          // Find the latest created list which containing smartBars < maxSmartBarsPreList
          const publicSmartBarListsRefQuery = publicSmartBarListsRef
            .orderBy('createdAt', 'desc')
            .where('itemCount', '<', maxSmartBarsPreList)
            .limit(1);
          const publicSmartBarListsSnap = await publicSmartBarListsRefQuery.get();
          const publicSmartBarListSnap = publicSmartBarListsSnap.docs.at(0);
          if (publicSmartBarListSnap?.exists) {
            // A latest list exists
            // The latest list contains less than maxSmartBarsPreList smartBars
            // join the smartBar to that list
            const publicSmartBarListRef = publicSmartBarListSnap.ref;
            bigBatch.set(publicSmartBarListRef, smartBarListDataRemove, { merge: true });
            bigBatch.set(publicSmartBarListRef, smartBarListDataUnion, { merge: true });
          } else {
            // There are no any existing list
            // Create a new list
            const publicSmartBarListRef = publicSmartBarListsRef.doc();
            smartBarListDataUnion.createdAt = FieldValue.serverTimestamp();
            bigBatch.set(publicSmartBarListRef, smartBarListDataUnion, { merge: true });
          }
        }
      }

      if (!smartBarDataAfter.isPublic) {
        if (publicSmartBarListSnap?.exists) {
          // The smartBar exists at a list already
          // Remove the smartBar from that list
          const publicSmartBarListRef = publicSmartBarListSnap.ref;
          bigBatch.set(publicSmartBarListRef, smartBarListDataRemove, { merge: true });
        }
        // No actions required if the smartBar does not exist at a list
      }

      // Update private list
      // Find the list containing the smartBar
      const privateSmartBarListsQuery = privateSmartBarListsRef.where('ids', 'array-contains', smartBarId).limit(1);
      const privateSmartBarListsSnap = await privateSmartBarListsQuery.get();
      const privateSmartBarListSnap = privateSmartBarListsSnap.docs.at(0);

      if (privateSmartBarListSnap?.exists) {
        // The smartBar exists at a list already
        // Update the smartBar at that list
        const privateSmartBarListRef = privateSmartBarListSnap.ref;
        bigBatch.set(privateSmartBarListRef, smartBarListDataRemove, { merge: true });
        bigBatch.set(privateSmartBarListRef, smartBarListDataUnion, { merge: true });
      }
      // No actions required if the smartBar does not exist at a list
    }

    if (mode === 'delete') {
      // Update public list
      // The list data to be removed
      const smartBarDataBeforeWithId = {
        ...smartBarDataBefore,
        id: smartBarId,
      };
      const smartBarListDataRemove: ExtendWithFieldValue<Partial<SmartBarListData>> = {
        smartBars: FieldValue.arrayRemove(smartBarDataBeforeWithId),
        ids: FieldValue.arrayRemove(smartBarId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the smartBar
      const publicSmartBarListsRefQuery = publicSmartBarListsRef.where('ids', 'array-contains', smartBarId).limit(1);
      const publicSmartBarListsSnap = await publicSmartBarListsRefQuery.get();
      const publicSmartBarListSnap = publicSmartBarListsSnap.docs.at(0);

      if (publicSmartBarListSnap?.exists) {
        // The smartBar exist at a list
        // Remove the smartBar from the list
        const publicSmartBarListRef = publicSmartBarListSnap.ref;
        bigBatch.set(publicSmartBarListRef, smartBarListDataRemove, { merge: true });
      }
      // No actions required if the smartBar does not exist at a list

      // Update private list
      const privateSmartBarListsQuery = privateSmartBarListsRef.where('ids', 'array-contains', smartBarId).limit(1);
      const privateSmartBarListsSnap = await privateSmartBarListsQuery.get();
      const privateSmartBarListSnap = privateSmartBarListsSnap.docs.at(0);

      if (privateSmartBarListSnap?.exists) {
        // The smartBar exist at a list
        // Remove the smartBar from the list
        // Remove id from the list
        const privateSmartBarListRef = privateSmartBarListSnap.ref;
        bigBatch.set(privateSmartBarListRef, smartBarListDataRemove, { merge: true });
      }
      // No actions required if the smartBar does not exist at a list
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating smart bar list', error);
  }
};
