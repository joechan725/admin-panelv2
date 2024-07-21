import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { AllHistoryStatistic } from '../../../models/statistic/AllHistoryStatistic';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateDeliveryOptionCountParameters {
  mode:
    | 'create-public'
    | 'create-private'
    | 'change-to-public'
    | 'change-to-private'
    | 'delete-public'
    | 'delete-private';
}

/**
 * Update the delivery option related statistic data
 * (The delivery option count)
 * (only allHistoryStatistic)
 *
 * @param mode - 'create-public' | 'create-private' | 'change-to-public' | 'change-to-private' | 'delete-public' | 'delete-private'
 * @returns The promise of void
 */

export const updateDeliveryOptionCount = async ({ mode }: UpdateDeliveryOptionCountParameters) => {
  try {
    // update the statistic
    // prepare
    const allHistoryStatisticRef = db.collection('allHistoryStatistic').doc('allHistoryStatistic');

    const statisticData: ExtendWithFieldValue<AllHistoryStatistic> = {};
    if (mode === 'create-public') {
      statisticData.totalDeliveryOptionCount = FieldValue.increment(1);
      statisticData.publicDeliveryOptionCount = FieldValue.increment(1);
    }
    if (mode === 'create-private') {
      statisticData.totalDeliveryOptionCount = FieldValue.increment(1);
      statisticData.privateDeliveryOptionCount = FieldValue.increment(1);
    }
    if (mode === 'change-to-public') {
      statisticData.publicDeliveryOptionCount = FieldValue.increment(1);
      statisticData.privateDeliveryOptionCount = FieldValue.increment(-1);
    }
    if (mode === 'change-to-private') {
      statisticData.privateDeliveryOptionCount = FieldValue.increment(1);
      statisticData.publicDeliveryOptionCount = FieldValue.increment(-1);
    }
    if (mode === 'delete-public') {
      statisticData.totalDeliveryOptionCount = FieldValue.increment(-1);
      statisticData.publicDeliveryOptionCount = FieldValue.increment(-1);
    }
    if (mode === 'delete-private') {
      statisticData.totalDeliveryOptionCount = FieldValue.increment(-1);
      statisticData.privateDeliveryOptionCount = FieldValue.increment(-1);
    }

    await allHistoryStatisticRef.set(statisticData, { merge: true });
  } catch (error) {
    logger.error('Error on updating delivery option count', error);
  }
};
