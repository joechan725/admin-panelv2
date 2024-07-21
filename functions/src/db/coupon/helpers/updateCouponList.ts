import { FieldValue } from 'firebase-admin/firestore';
import { maxCouponsPreList } from '../../maxItemsPreList';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { PrivateCouponData } from '../../../models/coupon/PrivateCouponData';
import { CouponData as PublicCouponData } from '../../../models/coupon/CouponData';
import { PrivateCouponListData } from '../../../models/coupon/PrivateCouponListData';
import { CouponListData as PublicCouponListData } from '../../../models/coupon/CouponListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

type UpdatePrivateCouponParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  couponId: string;
  privateCouponDataBefore?: undefined;
  publicCouponDataBefore?: undefined;
  privateCouponDataAfter: PrivateCouponData;
  publicCouponDataAfter: PublicCouponData;
  mode: 'create';
}

interface UpdateModeParameters {
  couponId: string;
  privateCouponDataBefore: PrivateCouponData;
  publicCouponDataBefore: PublicCouponData;
  privateCouponDataAfter: PrivateCouponData;
  publicCouponDataAfter: PublicCouponData;
  mode: 'update';
}

interface DeleteModeParameters {
  couponId: string;
  privateCouponDataBefore: PrivateCouponData;
  publicCouponDataBefore: PublicCouponData;
  privateCouponDataAfter?: undefined;
  publicCouponDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the privateCouponList and publicCouponList (denormalization) when the coupon is written.
 *
 * @param couponId - The id of the coupon
 * @param privateCouponDataBefore - The private coupon firebase data before
 * @param publicCouponDataBefore - The public coupon firebase data before
 * @param privateCouponDataAfter - The private coupon firebase data after
 * @param publicCouponDataAfter - The public coupon firebase data after
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateCouponList = async ({
  couponId,
  privateCouponDataBefore,
  publicCouponDataBefore,
  privateCouponDataAfter,
  publicCouponDataAfter,
  mode,
}: UpdatePrivateCouponParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateCouponListsRef = db.collection('privateCouponLists');
    const publicCouponListsRef = db.collection('couponLists');

    if (mode === 'create') {
      // Add coupon to the public list (if the coupon is public only)
      if (publicCouponDataAfter.isPublic) {
        // The coupon is public
        // Add coupon to a public list
        // The list data to be joined
        const publicCouponDataAfterWithId = {
          ...publicCouponDataAfter,
          id: couponId,
        };
        const code = publicCouponDataAfterWithId.code;
        const publicCouponListDataUnion: ExtendWithFieldValue<Partial<PublicCouponListData>> = {
          coupons: FieldValue.arrayUnion(publicCouponDataAfterWithId),
          ids: FieldValue.arrayUnion(couponId),
          codes: FieldValue.arrayUnion(code),
          itemCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        };
        // Find the latest created list which contains coupons < maxCouponsPreList
        const publicCouponListsRefQuery = publicCouponListsRef
          .orderBy('createdAt', 'desc')
          .where('itemCount', '<', maxCouponsPreList)
          .limit(1);
        const publicCouponListsSnap = await publicCouponListsRefQuery.get();
        const publicCouponListSnap = publicCouponListsSnap.docs.at(0);
        if (publicCouponListSnap?.exists) {
          // The latest created list exist
          // Join the coupon to that list
          const publicCouponListRef = publicCouponListSnap.ref;
          bigBatch.set(publicCouponListRef, publicCouponListDataUnion, { merge: true });
        } else {
          // The latest list does not exist
          // Create a new list
          const publicCouponListRef = publicCouponListsRef.doc();
          publicCouponListDataUnion.createdAt = FieldValue.serverTimestamp();
          bigBatch.set(publicCouponListRef, publicCouponListDataUnion, { merge: true });
        }
      }

      // Add coupon to the private list
      // The list data to be joined
      const privateCouponDataAfterWithId = {
        ...privateCouponDataAfter,
        id: couponId,
      };
      const code = privateCouponDataAfterWithId.code;
      const privateCouponListDataUnion: ExtendWithFieldValue<Partial<PrivateCouponListData>> = {
        coupons: FieldValue.arrayUnion(privateCouponDataAfterWithId),
        ids: FieldValue.arrayUnion(couponId),
        codes: FieldValue.arrayUnion(code),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };
      // Find the latest created list which contains coupons < maxCouponsPreList
      const privateCouponListsRefQuery = privateCouponListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxCouponsPreList)
        .limit(1);
      const privateCouponListsSnap = await privateCouponListsRefQuery.get();
      const privateCouponListSnap = privateCouponListsSnap.docs.at(0);
      if (privateCouponListSnap?.exists) {
        // The latest created list exist
        // Join the coupon to that list
        const privateCouponListRef = privateCouponListSnap.ref;
        bigBatch.set(privateCouponListRef, privateCouponListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateCouponListRef = privateCouponListsRef.doc();
        privateCouponListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateCouponListRef, privateCouponListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // Update the coupon at public list
      // The list data to be removed
      const publicCouponDataBeforeWithId = {
        ...publicCouponDataBefore,
        id: couponId,
      };
      const publicCodeBefore = publicCouponDataBeforeWithId.code;
      const publicCouponListDataRemove: ExtendWithFieldValue<Partial<PublicCouponListData>> = {
        coupons: FieldValue.arrayRemove(publicCouponDataBeforeWithId),
        ids: FieldValue.arrayRemove(couponId),
        codes: FieldValue.arrayRemove(publicCodeBefore),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const publicCouponDataAfterWithId = {
        ...publicCouponDataAfter,
        id: couponId,
      };
      const publicCodeAfter = publicCouponDataAfterWithId.code;
      const publicCouponListDataUnion: ExtendWithFieldValue<Partial<PublicCouponListData>> = {
        coupons: FieldValue.arrayUnion(publicCouponDataAfterWithId),
        ids: FieldValue.arrayUnion(couponId),
        codes: FieldValue.arrayUnion(publicCodeAfter),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the coupon
      const publicCouponListsRefQuery = publicCouponListsRef.where('ids', 'array-contains', couponId).limit(1);
      const publicCouponListsSnap = await publicCouponListsRefQuery.get();
      const publicCouponListSnap = publicCouponListsSnap.docs.at(0);

      // Update the coupon at the public list
      // or Join the coupon to public (if the coupon is changed to public)
      if (publicCouponDataAfterWithId.isPublic) {
        if (publicCouponListSnap?.exists) {
          // The coupon exists at a list already
          // Update that list (coupons and codes)
          const publicCouponListRef = publicCouponListSnap.ref;
          bigBatch.set(publicCouponListRef, publicCouponListDataRemove, { merge: true });
          bigBatch.set(publicCouponListRef, publicCouponListDataUnion, { merge: true });
        } else {
          // The coupon does not exist at any list
          // Join it to the list
          // Find the latest created list which containing coupons < maxCouponsPreList
          const publicCouponListsRefQuery = publicCouponListsRef
            .orderBy('createdAt', 'desc')
            .where('itemCount', '<', maxCouponsPreList)
            .limit(1);
          const publicCouponListsSnap = await publicCouponListsRefQuery.get();
          const publicCouponListSnap = publicCouponListsSnap.docs.at(0);
          if (publicCouponListSnap?.exists) {
            // A latest list exists
            // join the coupon to that list
            const publicCouponListRef = publicCouponListSnap.ref;
            bigBatch.set(publicCouponListRef, publicCouponListDataUnion, { merge: true });
          } else {
            // There are no any existing list or list > maxCouponsPreList
            // Create a new list
            const publicCouponListRef = publicCouponListsRef.doc();
            publicCouponListDataUnion.createdAt = FieldValue.serverTimestamp();
            bigBatch.set(publicCouponListRef, publicCouponListDataUnion, { merge: true });
          }
        }
      }

      // Remove the coupon from the public list (if the coupon is changed to not public)
      if (!publicCouponDataAfterWithId.isPublic) {
        if (publicCouponListSnap?.exists) {
          // The coupon exists at a list already
          // Remove the coupon from that list
          const publicCouponListRef = publicCouponListSnap.ref;
          bigBatch.set(publicCouponListRef, publicCouponListDataRemove, { merge: true });
        }
        // No actions required if the coupon does not exist at a list
      }

      // Update private list
      // The list data to be removed
      const privateCouponDataBeforeWithId = {
        ...privateCouponDataBefore,
        id: couponId,
      };
      const privateCodeBefore = privateCouponDataBeforeWithId.code;
      const privateCouponListDataRemove: ExtendWithFieldValue<Partial<PrivateCouponListData>> = {
        coupons: FieldValue.arrayRemove(privateCouponDataBeforeWithId),
        ids: FieldValue.arrayRemove(couponId),
        codes: FieldValue.arrayRemove(privateCodeBefore),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const privateCouponDataAfterWithId = {
        ...privateCouponDataAfter,
        id: couponId,
      };
      const privateCodeAfter = privateCouponDataAfterWithId.code;
      const privateCouponListDataUnion: ExtendWithFieldValue<Partial<PrivateCouponListData>> = {
        coupons: FieldValue.arrayUnion(privateCouponDataAfterWithId),
        ids: FieldValue.arrayUnion(couponId),
        codes: FieldValue.arrayUnion(privateCodeAfter),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the coupon
      const privateCouponListsQuery = privateCouponListsRef.where('ids', 'array-contains', couponId).limit(1);
      const privateCouponListsSnap = await privateCouponListsQuery.get();
      const privateCouponListSnap = privateCouponListsSnap.docs.at(0);

      if (privateCouponListSnap?.exists) {
        // The coupon exists at a list already
        // Update the coupon at that list
        const privateCouponListRef = privateCouponListSnap.ref;

        bigBatch.set(privateCouponListRef, privateCouponListDataRemove, { merge: true });
        bigBatch.set(privateCouponListRef, privateCouponListDataUnion, { merge: true });
      }
      // No actions required if the coupon does not exist at a list
    }

    if (mode === 'delete') {
      // Remove the coupon from public list
      // The list data to be removed
      const publicCouponDataBeforeWithId = {
        ...publicCouponDataBefore,
        id: couponId,
      };
      const publicCodeBefore = publicCouponDataBeforeWithId.code;
      const publicCouponListDataRemove: ExtendWithFieldValue<Partial<PublicCouponListData>> = {
        coupons: FieldValue.arrayRemove(publicCouponDataBeforeWithId),
        ids: FieldValue.arrayRemove(couponId),
        codes: FieldValue.arrayRemove(publicCodeBefore),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing the coupon
      const publicCouponListsRefQuery = publicCouponListsRef.where('ids', 'array-contains', couponId).limit(1);
      const publicCouponListsSnap = await publicCouponListsRefQuery.get();
      const publicCouponListSnap = publicCouponListsSnap.docs.at(0);

      if (publicCouponListSnap?.exists) {
        // The coupon exist at a list
        // Remove the coupon from the list
        const publicCouponListRef = publicCouponListSnap.ref;
        bigBatch.set(publicCouponListRef, publicCouponListDataRemove, { merge: true });
      }
      // No actions required if the coupon does not exist at a list

      // Remove the coupon from private list
      // The list data to be removed
      const privateCouponDataBeforeWithId = {
        ...privateCouponDataBefore,
        id: couponId,
      };
      const privateCodeBefore = privateCouponDataBeforeWithId.code;
      const privateCouponListDataRemove: ExtendWithFieldValue<Partial<PrivateCouponListData>> = {
        coupons: FieldValue.arrayRemove(privateCouponDataBeforeWithId),
        ids: FieldValue.arrayRemove(couponId),
        codes: FieldValue.arrayRemove(privateCodeBefore),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Find the list containing coupons
      const privateCouponListsQuery = privateCouponListsRef.where('ids', 'array-contains', couponId).limit(1);
      const privateCouponListsSnap = await privateCouponListsQuery.get();
      const privateCouponListSnap = privateCouponListsSnap.docs.at(0);

      if (privateCouponListSnap?.exists) {
        // The coupon exist at a list
        // Remove the coupon from the list
        const privateCouponListRef = privateCouponListSnap.ref;
        bigBatch.set(privateCouponListRef, privateCouponListDataRemove, { merge: true });
      }
      // No actions required if the coupon does not exist at a list
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating coupon list', error);
  }
};
