import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { AllHistoryStatistic } from '../../../models/statistic/AllHistoryStatistic';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCouponCountParameters {
  mode:
    | 'create-public'
    | 'create-private'
    | 'change-to-public'
    | 'change-to-private'
    | 'delete-public'
    | 'delete-private';
}

/**
 * Update the coupon count
 * (The coupon count)
 * (only allHistoryStatistic)
 *
 * @param mode - 'create-public' | 'create-private' | 'change-to-public' | 'change-to-private' | 'delete-public' | 'delete-private'
 * @returns The promise of void
 */

export const updateCouponCount = async ({ mode }: UpdateCouponCountParameters) => {
  try {
    // update the statistic
    // prepare
    const allHistoryStatisticRef = db.collection('allHistoryStatistic').doc('allHistoryStatistic');

    const statisticData: ExtendWithFieldValue<AllHistoryStatistic> = {};
    if (mode === 'create-public') {
      statisticData.totalCouponCount = FieldValue.increment(1);
      statisticData.publicCouponCount = FieldValue.increment(1);
    }
    if (mode === 'create-private') {
      statisticData.totalCouponCount = FieldValue.increment(1);
      statisticData.privateCouponCount = FieldValue.increment(1);
    }
    if (mode === 'change-to-public') {
      statisticData.publicCouponCount = FieldValue.increment(1);
      statisticData.privateCouponCount = FieldValue.increment(-1);
    }
    if (mode === 'change-to-private') {
      statisticData.privateCouponCount = FieldValue.increment(1);
      statisticData.publicCouponCount = FieldValue.increment(-1);
    }
    if (mode === 'delete-public') {
      statisticData.totalCouponCount = FieldValue.increment(-1);
      statisticData.publicCouponCount = FieldValue.increment(-1);
    }
    if (mode === 'delete-private') {
      statisticData.totalCouponCount = FieldValue.increment(-1);
      statisticData.privateCouponCount = FieldValue.increment(-1);
    }

    await allHistoryStatisticRef.set(statisticData, { merge: true });
  } catch (error) {
    logger.error('Error on updating coupon count', error);
  }
};
