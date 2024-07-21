import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { FieldValue } from 'firebase-admin/firestore';
import { AllHistoryStatistic } from '../../../../models/statistic/AllHistoryStatistic';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateBrandCountParameters {
  mode: 'create' | 'delete';
}

/**
 * Update the brand count
 * (only allHistoryStatistic)
 *
 * @param mode - 'create' | 'delete'
 * @returns The promise of void
 */

export const updateBrandCount = async ({ mode }: UpdateBrandCountParameters) => {
  try {
    // update the statistic
    // prepare
    const allHistoryStatisticRef = db.collection('allHistoryStatistic').doc('allHistoryStatistic');

    const statisticData: ExtendWithFieldValue<AllHistoryStatistic> = {};
    if (mode === 'create') {
      statisticData.brandCount = FieldValue.increment(1);
    }

    if (mode === 'delete') {
      statisticData.brandCount = FieldValue.increment(-1);
    }

    await allHistoryStatisticRef.set(statisticData, { merge: true });
  } catch (error) {
    logger.error('Error on updating brand count', error);
  }
};
