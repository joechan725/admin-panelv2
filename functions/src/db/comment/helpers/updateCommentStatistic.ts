import { getDateString } from '../../../lib/helpers/date/getDateString';
import { DailyStatistic } from '../../../models/statistic/DailyStatistic';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { MonthlyStatistic } from '../../../models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '../../../models/statistic/YearlyStatistic';
import { AllHistoryStatistic } from '../../../models/statistic/AllHistoryStatistic';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCommentStatisticParameters {
  mode: 'increment' | 'decrement';
  date?: Date | Timestamp | number;
}

/**
 * Update the comment related statistic data
 * (daily, monthlyStatistics, yearlyStatistics, allHistoryStatistic)
 *
 * @param mode - 'increment' | 'decrement'
 * @param date @optional - Updating a specific day data. Leave it blank to update today data.
 * @returns The promise of void
 */

export const updateCommentStatistic = async ({ mode, date }: UpdateCommentStatisticParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const { futureDayStrings, futureMonthStrings, futureYearStrings } = getDateString(date);
    const dailyStatisticRefs = futureDayStrings.map((dayString) => {
      return db.collection('dailyStatistics').doc(dayString);
    });
    const monthlyStatisticRefs = futureMonthStrings.map((monthString) => {
      return db.collection('monthlyStatistics').doc(monthString);
    });
    const yearlyStatisticRefs = futureYearStrings.map((yearString) => {
      return db.collection('yearlyStatistic').doc(yearString);
    });

    const allHistoryStatisticRef = db.collection('allHistoryStatistic').doc('allHistoryStatistic');

    if (mode === 'increment') {
      dailyStatisticRefs.forEach((dailyRef, index) => {
        if (index === 0) {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            commentCountToday: FieldValue.increment(1),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        } else {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            [`commentCount${index}DayAgo`]: FieldValue.increment(1),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        }
      });

      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        if (index === 0) {
          const statisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            commentCountThisMonth: FieldValue.increment(1),
          };
          bigBatch.set(monthlyRef, statisticData, { merge: true });
        } else {
          const statisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            [`commentCount${index}MonthAgo`]: FieldValue.increment(1),
          };
          bigBatch.set(monthlyRef, statisticData, { merge: true });
        }
      });

      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        if (index === 0) {
          const statisticData: ExtendWithFieldValue<YearlyStatistic> = {
            commentCountThisYear: FieldValue.increment(1),
          };
          bigBatch.set(yearlyRef, statisticData, { merge: true });
        } else {
          const statisticData: ExtendWithFieldValue<YearlyStatistic> = {
            [`commentCount${index}YearAgo`]: FieldValue.increment(1),
          };
          bigBatch.set(yearlyRef, statisticData, { merge: true });
        }
      });

      const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
        commentCount: FieldValue.increment(1),
      };
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    if (mode === 'decrement') {
      dailyStatisticRefs.forEach((dailyRef, index) => {
        if (index === 0) {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            commentCountToday: FieldValue.increment(-1),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        } else {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            [`commentCount${index}DayAgo`]: FieldValue.increment(-1),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        }
      });

      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        if (index === 0) {
          const statisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            commentCountThisMonth: FieldValue.increment(-1),
          };
          bigBatch.set(monthlyRef, statisticData, { merge: true });
        } else {
          const statisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            [`commentCount${index}MonthAgo`]: FieldValue.increment(-1),
          };
          bigBatch.set(monthlyRef, statisticData, { merge: true });
        }
      });

      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        if (index === 0) {
          const statisticData: ExtendWithFieldValue<YearlyStatistic> = {
            commentCountThisYear: FieldValue.increment(-1),
          };
          bigBatch.set(yearlyRef, statisticData, { merge: true });
        } else {
          const statisticData: ExtendWithFieldValue<YearlyStatistic> = {
            [`commentCount${index}YearAgo`]: FieldValue.increment(-1),
          };
          bigBatch.set(yearlyRef, statisticData, { merge: true });
        }
      });

      const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
        commentCount: FieldValue.increment(-1),
      };
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating comment statistic', error);
  }
};
