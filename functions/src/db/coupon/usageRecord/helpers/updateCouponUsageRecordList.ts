import { FieldValue } from 'firebase-admin/firestore';
import { CouponUsageRecordData } from '../../../../models/coupon/usageRecord/CouponUsageRecordData';
import { CouponUsageRecordListData } from '../../../../models/coupon/usageRecord/CouponUsageRecordListData';
import { maxCouponUsageRecordsPreList } from '../../../maxItemsPreList';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

type UpdateCouponUsageRecordListParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  couponId: string;
  couponUsageRecordId: string;
  couponUsageRecordDataBefore?: undefined;
  couponUsageRecordDataAfter: CouponUsageRecordData;
  mode: 'create';
}

interface UpdateModeParameters {
  couponId: string;
  couponUsageRecordId: string;
  couponUsageRecordDataBefore: CouponUsageRecordData;
  couponUsageRecordDataAfter: CouponUsageRecordData;
  mode: 'update';
}

interface DeleteModeParameters {
  couponId: string;
  couponUsageRecordId: string;
  couponUsageRecordDataBefore: CouponUsageRecordData;
  couponUsageRecordDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the couponUsageRecordList when the usageRecord is written.
 *
 * @param couponId - The id of the coupon
 * @param couponUsageRecordId - The id of the couponUsageRecord
 * @param couponUsageRecordDataBefore: The data of coupon usage record after;
 * @param couponUsageRecordDataAfter: The data of coupon usage record after;
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateCouponUsageRecordList = async ({
  couponId,
  couponUsageRecordDataAfter,
  couponUsageRecordDataBefore,
  couponUsageRecordId,
  mode,
}: UpdateCouponUsageRecordListParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const couponUsageRecordListsRef = db.collection('coupons').doc(couponId).collection('usageRecordLists');

    if (mode === 'create') {
      // List data to be joined
      const usageRecordDataAfterWithId = {
        ...couponUsageRecordDataAfter,
        id: couponUsageRecordId,
      };
      const userId = usageRecordDataAfterWithId.userId;
      const couponUsageRecordListDataUnion: ExtendWithFieldValue<Partial<CouponUsageRecordListData>> = {
        couponUsageRecords: FieldValue.arrayUnion(usageRecordDataAfterWithId),
        ids: FieldValue.arrayUnion(couponUsageRecordId),
        userIds: FieldValue.arrayUnion(userId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Add usage record to the list
      // Find the latest created list which contains usageRecord < maxCouponUsageRecordsPreList
      const couponUsageRecordListsRefQuery = couponUsageRecordListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxCouponUsageRecordsPreList)
        .limit(1);
      const couponUsageRecordListsSnap = await couponUsageRecordListsRefQuery.get();
      const couponUsageRecordListSnap = couponUsageRecordListsSnap.docs.at(0);
      if (couponUsageRecordListSnap?.exists) {
        // The latest created list exist
        // Join the record to that list
        const couponUsageRecordListRef = couponUsageRecordListSnap.ref;
        bigBatch.set(couponUsageRecordListRef, couponUsageRecordListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const couponRecordListRef = couponUsageRecordListsRef.doc();
        couponUsageRecordListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(couponRecordListRef, couponUsageRecordListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // Update private list
      // List data to be removed
      // Note: the userId shall be remain since there might be some other records with same userId at the list
      const usageRecordDataBeforeWithId = {
        ...couponUsageRecordDataBefore,
        id: couponUsageRecordId,
      };
      const couponUsageRecordListDataRemove: ExtendWithFieldValue<Partial<CouponUsageRecordListData>> = {
        couponUsageRecords: FieldValue.arrayRemove(usageRecordDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // List data to be joined
      const usageRecordDataAfterWithId = {
        ...couponUsageRecordDataAfter,
        id: couponUsageRecordId,
      };
      const couponUsageRecordListDataUnion: ExtendWithFieldValue<Partial<CouponUsageRecordListData>> = {
        couponUsageRecords: FieldValue.arrayUnion(usageRecordDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the usage record
      const couponUsageRecordListsQuery = couponUsageRecordListsRef
        .where('ids', 'array-contains', couponUsageRecordId)
        .limit(1);
      const couponUsageRecordListsSnap = await couponUsageRecordListsQuery.get();
      const couponUsageRecordListSnap = couponUsageRecordListsSnap.docs.at(0);

      if (couponUsageRecordListSnap?.exists) {
        // The record exists at a list already
        // Update the record at that list
        const couponUsageRecordListRef = couponUsageRecordListSnap.ref;
        bigBatch.set(couponUsageRecordListRef, couponUsageRecordListDataRemove, { merge: true });
        bigBatch.set(couponUsageRecordListRef, couponUsageRecordListDataUnion, { merge: true });
      } else {
        // No actions required if the record does not exist at a list
        throw new Error(
          `Error on updating coupon usage record ${couponUsageRecordId} from the list. Coupon usage record ${couponUsageRecordId} dose not exist at any list`
        );
      }
    }

    if (mode === 'delete') {
      // Remove the record from private list
      // List data to be removed
      // Note: the userId shall be remain since there might be some other records with same userId at the list
      const usageRecordDataBeforeWithId = {
        ...couponUsageRecordDataBefore,
        id: couponUsageRecordId,
      };
      const couponUsageRecordListDataRemove: ExtendWithFieldValue<Partial<CouponUsageRecordListData>> = {
        couponUsageRecords: FieldValue.arrayRemove(usageRecordDataBeforeWithId),
        ids: FieldValue.arrayRemove(couponUsageRecordId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the usage record
      const couponUsageRecordListsQuery = couponUsageRecordListsRef
        .where('ids', 'array-contains', couponUsageRecordId)
        .limit(1);
      const couponUsageRecordListsSnap = await couponUsageRecordListsQuery.get();
      const couponUsageRecordListSnap = couponUsageRecordListsSnap.docs.at(0);

      if (couponUsageRecordListSnap?.exists) {
        // The record exist at a list
        // Remove the record from the list
        const couponUsageRecordListRef = couponUsageRecordListSnap.ref;
        bigBatch.set(couponUsageRecordListRef, couponUsageRecordListDataRemove, { merge: true });
      } else {
        // No actions required if the record does not exist at a list
        throw new Error(
          `Error on deleting coupon usage record ${couponUsageRecordId} from the list. Coupon usage record ${couponUsageRecordId} dose not exist at any list`
        );
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating coupon usage record list', error);
  }
};
