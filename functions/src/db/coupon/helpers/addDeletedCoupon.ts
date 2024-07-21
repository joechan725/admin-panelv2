import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { PrivateCouponData } from '../../../models/coupon/PrivateCouponData';
import { logger } from 'firebase-functions/v1';

interface AddDeletedCouponParameters {
  couponId: string;
  couponData: PrivateCouponData;
}

/**
 * Delete the coupon and move the data to deletedCoupons collections
 *
 * @param couponId: The id of coupon
 * @param couponData: The original data of the coupon
 */

export const addDeletedCoupon = async ({ couponData, couponId }: AddDeletedCouponParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    // Delete the original coupon
    const couponRef = db.collection('coupons').doc(couponId);
    bigBatch.delete(couponRef);

    // Move the data to deleted coupons collection
    const deletedCouponsRef = db.collection('deletedCoupons').doc(couponId);
    bigBatch.set(deletedCouponsRef, couponData, { merge: true });

    // Commit the batch
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on moving deleted coupon', error);
  }
};
