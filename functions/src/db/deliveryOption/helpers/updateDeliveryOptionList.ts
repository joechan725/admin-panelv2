import { FieldValue } from 'firebase-admin/firestore';
import { maxDeliveryOptionsPreList } from '../../maxItemsPreList';
import { PrivateDeliveryOptionData } from '../../../models/deliveryOption/PrivateDeliveryOptionData';
import { DeliveryOptionData as PublicDeliveryOptionData } from '../../../models/deliveryOption/DeliveryOptionData';
import { PrivateDeliveryOptionListData } from '../../../models/deliveryOption/PrivateDeliveryOptionListData';
import { DeliveryOptionListData as PublicDeliveryOptionListData } from '../../../models/deliveryOption/DeliveryOptionListData';
import { db } from '../../../admin';
import { BigBatch } from '../../../classes/BigBatch';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdatePrivateDeliveryOptionParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  deliveryOptionId: string;
  privateDeliveryOptionDataBefore?: undefined;
  publicDeliveryOptionDataBefore?: undefined;
  privateDeliveryOptionDataAfter: PrivateDeliveryOptionData;
  publicDeliveryOptionDataAfter: PublicDeliveryOptionData;
  mode: 'create';
}

interface UpdateModeParameters {
  deliveryOptionId: string;
  privateDeliveryOptionDataBefore: PrivateDeliveryOptionData;
  publicDeliveryOptionDataBefore: PublicDeliveryOptionData;
  privateDeliveryOptionDataAfter: PrivateDeliveryOptionData;
  publicDeliveryOptionDataAfter: PublicDeliveryOptionData;
  mode: 'update';
}

interface DeleteModeParameters {
  deliveryOptionId: string;
  privateDeliveryOptionDataBefore: PrivateDeliveryOptionData;
  publicDeliveryOptionDataBefore: PublicDeliveryOptionData;
  privateDeliveryOptionDataAfter?: undefined;
  publicDeliveryOptionDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the privateDeliveryOptionList and publicDeliveryOptionList (denormalization) when the deliveryOption is written.
 *
 * @param deliveryOptionId - The id of the deliveryOption
 * @param privateDeliveryOptionDataBefore - The private deliveryOption firebase data before
 * @param publicDeliveryOptionDataBefore - The public deliveryOption firebase data before
 * @param privateDeliveryOptionDataAfter - The private deliveryOption firebase data after
 * @param publicDeliveryOptionDataAfter - The public coupon firebase data after
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateDeliveryOptionList = async ({
  deliveryOptionId,
  privateDeliveryOptionDataBefore,
  publicDeliveryOptionDataBefore,
  privateDeliveryOptionDataAfter,
  publicDeliveryOptionDataAfter,
  mode,
}: UpdatePrivateDeliveryOptionParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateDeliveryOptionListsRef = db.collection('privateDeliveryOptionLists');
    const publicDeliveryOptionListsRef = db.collection('deliveryOptionLists');

    if (mode === 'create') {
      // Add the deliveryOption to public list (if the deliveryOption is public only)
      if (publicDeliveryOptionDataAfter.isPublic) {
        // The deliveryOption is public
        // Add deliveryOption to a public list
        // List data to be joined
        const publicDeliveryOptionDataAfterWithId = {
          ...publicDeliveryOptionDataAfter,
          id: deliveryOptionId,
        };
        const publicDeliveryOptionListDataUnion: ExtendWithFieldValue<Partial<PublicDeliveryOptionListData>> = {
          deliveryOptions: FieldValue.arrayUnion(publicDeliveryOptionDataAfterWithId),
          ids: FieldValue.arrayUnion(deliveryOptionId),
          itemCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };

        // Find the latest created list which contains deliveryOption < maxDeliveryOptionsPreList
        const publicDeliveryOptionListsRefQuery = publicDeliveryOptionListsRef
          .orderBy('createdAt', 'desc')
          .where('itemCount', '<', maxDeliveryOptionsPreList)
          .limit(1);
        const publicDeliveryOptionListsSnap = await publicDeliveryOptionListsRefQuery.get();
        const publicDeliveryOptionListSnap = publicDeliveryOptionListsSnap.docs.at(0);
        if (publicDeliveryOptionListSnap?.exists) {
          // The latest created list exist
          // Join the deliveryOption to that list
          const publicDeliveryOptionListRef = publicDeliveryOptionListSnap.ref;
          bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataUnion, { merge: true });
        } else {
          // The latest list does not exist
          // Create a new list
          const publicDeliveryOptionListRef = publicDeliveryOptionListsRef.doc();
          publicDeliveryOptionListDataUnion.createdAt = FieldValue.serverTimestamp();
          bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataUnion, { merge: true });
        }
      }

      // Add the deliveryOption to private list
      // List data to be joined
      const privateDeliveryOptionDataAfterWithId = {
        ...privateDeliveryOptionDataAfter,
        id: deliveryOptionId,
      };
      const privateDeliveryOptionListDataUnion: ExtendWithFieldValue<Partial<PrivateDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayUnion(privateDeliveryOptionDataAfterWithId),
        ids: FieldValue.arrayUnion(deliveryOptionId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the latest created list which contains deliveryOption < maxDeliveryOptionsPreList
      const privateDeliveryOptionListsRefQuery = privateDeliveryOptionListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxDeliveryOptionsPreList)
        .limit(1);
      const privateDeliveryOptionListsSnap = await privateDeliveryOptionListsRefQuery.get();
      const privateDeliveryOptionListSnap = privateDeliveryOptionListsSnap.docs.at(0);
      if (privateDeliveryOptionListSnap?.exists) {
        // The latest created list exist
        // Join the deliveryOption to that list
        const privateDeliveryOptionListRef = privateDeliveryOptionListSnap.ref;
        bigBatch.set(privateDeliveryOptionListRef, privateDeliveryOptionListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateDeliveryOptionListRef = privateDeliveryOptionListsRef.doc();
        privateDeliveryOptionListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateDeliveryOptionListRef, privateDeliveryOptionListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // Update the deliveryOption at the public list
      // The list data to be removed
      const publicDeliveryOptionDataBeforeWithId = {
        ...publicDeliveryOptionDataBefore,
        id: deliveryOptionId,
      };
      const publicDeliveryOptionListDataRemove: ExtendWithFieldValue<Partial<PublicDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayRemove(publicDeliveryOptionDataBeforeWithId),
        ids: FieldValue.arrayRemove(deliveryOptionId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const publicDeliveryOptionDataAfterWithId = {
        ...publicDeliveryOptionDataAfter,
        id: deliveryOptionId,
      };
      const publicDeliveryOptionListDataUnion: ExtendWithFieldValue<Partial<PublicDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayUnion(publicDeliveryOptionDataAfterWithId),
        ids: FieldValue.arrayUnion(deliveryOptionId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the coupon
      const publicDeliveryOptionListsRefQuery = publicDeliveryOptionListsRef
        .where('ids', 'array-contains', deliveryOptionId)
        .limit(1);
      const publicDeliveryOptionListsSnap = await publicDeliveryOptionListsRefQuery.get();
      const publicDeliveryOptionListSnap = publicDeliveryOptionListsSnap.docs.at(0);

      // Update the deliveryOption at the public list
      // or Join the deliveryOption at the public list (if the deliveryOption is changed to public only)
      if (publicDeliveryOptionDataAfter.isPublic) {
        if (publicDeliveryOptionListSnap?.exists) {
          // The deliveryOption exists at a list already
          // Update that list
          const publicDeliveryOptionListRef = publicDeliveryOptionListSnap.ref;
          bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataRemove, { merge: true });
          bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataUnion, { merge: true });
        } else {
          // The deliveryOption does not exist at any list
          // Find the latest created list which containing deliveryOptions < maxDeliveryOptionsPreList
          const publicDeliveryOptionListsRefQuery = publicDeliveryOptionListsRef
            .orderBy('createdAt', 'desc')
            .where('itemCount', '<', maxDeliveryOptionsPreList)
            .limit(1);
          const publicDeliveryOptionListsSnap = await publicDeliveryOptionListsRefQuery.get();
          const publicDeliveryOptionListSnap = publicDeliveryOptionListsSnap.docs.at(0);
          if (publicDeliveryOptionListSnap?.exists) {
            // A latest list exists
            // join the deliveryOption to that list
            const publicDeliveryOptionListRef = publicDeliveryOptionListSnap.ref;
            bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataUnion, { merge: true });
          } else {
            // There are no any existing list
            // Create a new list
            const publicDeliveryOptionListRef = publicDeliveryOptionListsRef.doc();
            publicDeliveryOptionListDataUnion.createdAt = FieldValue.serverTimestamp();
            bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataUnion, { merge: true });
          }
        }
      }

      // Remove the deliveryOption from public list (if it is changed to not public only)
      if (!publicDeliveryOptionDataAfter.isPublic) {
        if (publicDeliveryOptionListSnap?.exists) {
          // The deliveryOption exists at a list already
          // Remove the deliveryOption from that lis
          // Remove id from the list
          const publicDeliveryOptionListRef = publicDeliveryOptionListSnap.ref;
          bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataRemove, { merge: true });
        }
        // No actions required if the deliveryOption does not exist at a list
      }

      // Update the deliveryOption at the private list
      // The list data to be removed
      const privateDeliveryOptionDataBeforeWithId = {
        ...privateDeliveryOptionDataBefore,
        id: deliveryOptionId,
      };
      const privateDeliveryOptionListDataRemove: ExtendWithFieldValue<Partial<PrivateDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayRemove(privateDeliveryOptionDataBeforeWithId),
        ids: FieldValue.arrayRemove(deliveryOptionId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const privateDeliveryOptionDataAfterWithId = {
        ...privateDeliveryOptionDataAfter,
        id: deliveryOptionId,
      };
      const privateDeliveryOptionListDataUnion: ExtendWithFieldValue<Partial<PrivateDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayUnion(privateDeliveryOptionDataAfterWithId),
        ids: FieldValue.arrayUnion(deliveryOptionId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      const privateDeliveryOptionListsQuery = privateDeliveryOptionListsRef
        .where('ids', 'array-contains', deliveryOptionId)
        .limit(1);
      const privateDeliveryOptionListsSnap = await privateDeliveryOptionListsQuery.get();
      const privateDeliveryOptionListSnap = privateDeliveryOptionListsSnap.docs.at(0);

      if (privateDeliveryOptionListSnap?.exists) {
        // The deliveryOption exists at a list already
        // Update the deliveryOption at that list
        const privateDeliveryOptionListRef = privateDeliveryOptionListSnap.ref;
        bigBatch.set(privateDeliveryOptionListRef, privateDeliveryOptionListDataRemove, { merge: true });
        bigBatch.set(privateDeliveryOptionListRef, privateDeliveryOptionListDataUnion, { merge: true });
      }
      // No actions required if the deliveryOption does not exist at a list
    }

    if (mode === 'delete') {
      // Remove the deliveryOption from public list
      // The list data to be removed
      const publicDeliveryOptionDataBeforeWithId = {
        ...publicDeliveryOptionDataBefore,
        id: deliveryOptionId,
      };
      const publicDeliveryOptionListDataRemove: ExtendWithFieldValue<Partial<PublicDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayRemove(publicDeliveryOptionDataBeforeWithId),
        ids: FieldValue.arrayRemove(deliveryOptionId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the deliveryOption
      const publicDeliveryOptionListsRefQuery = publicDeliveryOptionListsRef
        .where('ids', 'array-contains', deliveryOptionId)
        .limit(1);
      const publicDeliveryOptionListsSnap = await publicDeliveryOptionListsRefQuery.get();
      const publicDeliveryOptionListSnap = publicDeliveryOptionListsSnap.docs.at(0);

      if (publicDeliveryOptionListSnap?.exists) {
        // The deliveryOption exist at a list
        // Remove the deliveryOption from the list
        const publicDeliveryOptionListRef = publicDeliveryOptionListSnap.ref;
        bigBatch.set(publicDeliveryOptionListRef, publicDeliveryOptionListDataRemove, { merge: true });
      }
      // No actions required if the deliveryOption does not exist at a list

      // Remove the deliveryOption from private list
      // The list data to be removed
      const privateDeliveryOptionDataBeforeWithId = {
        ...privateDeliveryOptionDataBefore,
        id: deliveryOptionId,
      };
      const privateDeliveryOptionListDataRemove: ExtendWithFieldValue<Partial<PrivateDeliveryOptionListData>> = {
        deliveryOptions: FieldValue.arrayRemove(privateDeliveryOptionDataBeforeWithId),
        ids: FieldValue.arrayRemove(deliveryOptionId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the list containing the deliveryOption
      const privateDeliveryOptionListsQuery = privateDeliveryOptionListsRef
        .where('ids', 'array-contains', deliveryOptionId)
        .limit(1);
      const privateDeliveryOptionListsSnap = await privateDeliveryOptionListsQuery.get();
      const privateDeliveryOptionListSnap = privateDeliveryOptionListsSnap.docs.at(0);

      if (privateDeliveryOptionListSnap?.exists) {
        // The deliveryOption exist at a list
        // Remove the deliveryOption from the list
        const privateDeliveryOptionListRef = privateDeliveryOptionListSnap.ref;
        bigBatch.set(privateDeliveryOptionListRef, privateDeliveryOptionListDataRemove, { merge: true });
      }
      // No actions required if the deliveryOption does not exist at a list
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating delivery option list', error);
  }
};
