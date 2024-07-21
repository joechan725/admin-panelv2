import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { AllHistoryStatistic } from '../../../models/statistic/AllHistoryStatistic';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateProductCountParameter {
  mode:
    | 'create-public'
    | 'create-private'
    | 'change-to-public'
    | 'change-to-private'
    | 'delete-public'
    | 'delete-private';
}

/**
 * Update the product count
 * (only allHistoryStatistic)
 *
 * @param mode - 'create-public' | 'create-private' | 'change-to-public' | 'change-to-private' | 'delete-public' | 'delete-private'
 * @returns The promise of void
 */

export const updateProductCount = async ({ mode }: UpdateProductCountParameter) => {
  try {
    // update the statistic
    // prepare
    const allHistoryStatisticRef = db.collection('allHistoryStatistic').doc('allHistoryStatistic');

    const statisticData: ExtendWithFieldValue<AllHistoryStatistic> = {};
    if (mode === 'create-public') {
      statisticData.totalProductCount = FieldValue.increment(1);
      statisticData.publicProductCount = FieldValue.increment(1);
    }
    if (mode === 'create-private') {
      statisticData.totalProductCount = FieldValue.increment(1);
      statisticData.privateProductCount = FieldValue.increment(1);
    }
    if (mode === 'change-to-public') {
      statisticData.publicProductCount = FieldValue.increment(1);
      statisticData.privateProductCount = FieldValue.increment(-1);
    }
    if (mode === 'change-to-private') {
      statisticData.privateProductCount = FieldValue.increment(1);
      statisticData.publicProductCount = FieldValue.increment(-1);
    }
    if (mode === 'delete-public') {
      statisticData.totalProductCount = FieldValue.increment(-1);
      statisticData.publicProductCount = FieldValue.increment(-1);
    }
    if (mode === 'delete-private') {
      statisticData.totalProductCount = FieldValue.increment(-1);
      statisticData.privateProductCount = FieldValue.increment(-1);
    }

    await allHistoryStatisticRef.set(statisticData, { merge: true });
  } catch (error) {
    logger.error('Error on updating product count', error);
  }
};
