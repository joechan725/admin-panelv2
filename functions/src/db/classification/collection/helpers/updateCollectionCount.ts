import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { AllHistoryStatistic } from '../../../../models/statistic/AllHistoryStatistic';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCollectionCountParameters {
  mode: 'create' | 'delete';
}

/**
 * Update the collection count
 * (only allHistoryStatistic)
 *
 * @param mode - 'create' | 'delete'
 * @returns The promise of void
 */

export const updateCollectionCount = async ({ mode }: UpdateCollectionCountParameters) => {
  try {
    // update the statistic
    // prepare
    const allHistoryStatisticRef = db.collection('allHistoryStatistic').doc('allHistoryStatistic');

    const statisticData: ExtendWithFieldValue<AllHistoryStatistic> = {};
    if (mode === 'create') {
      statisticData.collectionCount = FieldValue.increment(1);
    }

    if (mode === 'delete') {
      statisticData.collectionCount = FieldValue.increment(-1);
    }

    await allHistoryStatisticRef.set(statisticData, { merge: true });
  } catch (error) {
    logger.error('Error on updating collection count', error);
  }
};
