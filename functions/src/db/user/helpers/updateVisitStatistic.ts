import { getDateString } from '../../../lib/helpers/date/getDateString';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { DailyStatistic } from '../../../models/statistic/DailyStatistic';
import { MonthlyStatistic } from '../../../models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '../../../models/statistic/YearlyStatistic';
import { AllHistoryStatistic } from '../../../models/statistic/AllHistoryStatistic';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

export type UpdateVisitStatisticMode =
  | 'addAnonymousUser'
  | 'register'
  | 'deleteAnonymousUser'
  | 'deleteRegisteredUser'
  | 'increment-daily-visitorCount-anonymousUser'
  | 'increment-monthly-visitorCount-anonymousUser'
  | 'increment-yearly-visitorCount-anonymousUser'
  | 'increment-daily-visitorCount-registeredUser'
  | 'increment-monthly-visitorCount-registeredUser'
  | 'increment-yearly-visitorCount-registeredUser';

interface UpdateVisitStatisticParameters {
  modes: UpdateVisitStatisticMode[];
  date: Date | Timestamp | number;
}

/**
 * Update the user related statistic data: visitedTimes
 * (dailyStatistics, monthlyStatistics, yearlyStatistic, allHistoryStatistic)
 *
 * @param mode - | 'addAnonymousUser'
  | 'register'
  | 'deleteAnonymousUser'
  | 'deleteRegisteredUser'
  | 'increment-daily-visitorCount-anonymousUser'
  | 'increment-monthly-visitorCount-anonymousUser'
  | 'increment-yearly-visitorCount-anonymousUser'
  | 'increment-daily-visitorCount-registeredUser'
  | 'increment-monthly-visitorCount-registeredUser'
  | 'increment-yearly-visitorCount-registeredUser';
 * @param date - Updating a specific day data. Leave it blank to update today data.
 * @return The promise of void
 */

export const updateVisitStatistic = async ({ modes, date }: UpdateVisitStatisticParameters) => {
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
    const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {};

    if (modes.includes('addAnonymousUser')) {
      dailyStatisticRefs.forEach((dailyRef, index) => {
        const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {};
        if (index === 0) {
          dailyStatisticData.firstTimeVisitorCountToday = FieldValue.increment(1);
          dailyStatisticData.visitorCountToday = FieldValue.increment(1);
          dailyStatisticData.anonymousVisitorCountToday = FieldValue.increment(1);
        } else {
          dailyStatisticData[`firstTimeVisitorCount${index}DayAgo` as keyof typeof dailyStatisticData] =
            FieldValue.increment(1);
          dailyStatisticData[`visitorCount${index}DayAgo` as keyof typeof dailyStatisticData] = FieldValue.increment(1);
          dailyStatisticData[`anonymousVisitorCount${index}DayAgo` as keyof typeof dailyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
      });

      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {};
        if (index === 0) {
          monthlyStatisticData.firstTimeVisitorCountThisMonth = FieldValue.increment(1);
          monthlyStatisticData.visitorCountThisMonth = FieldValue.increment(1);
          monthlyStatisticData.anonymousVisitorCountThisMonth = FieldValue.increment(1);
        } else {
          monthlyStatisticData[`firstTimeVisitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
          monthlyStatisticData[`VisitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
          monthlyStatisticData[`anonymousVisitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
      });

      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {};
        if (index === 0) {
          yearlyStatisticData.firstTimeVisitorCountThisYear = FieldValue.increment(1);
          yearlyStatisticData.visitorCountThisYear = FieldValue.increment(1);
          yearlyStatisticData.anonymousVisitorCountThisYear = FieldValue.increment(1);
        } else {
          yearlyStatisticData[`firstTimeVisitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
          yearlyStatisticData[`visitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
          yearlyStatisticData[`anonymousVisitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
      });

      allHistoryStatisticData.firstTimeVisitorCount = FieldValue.increment(1);
      allHistoryStatisticData.userCount = FieldValue.increment(1);
      allHistoryStatisticData.anonymousUserCount = FieldValue.increment(1);
      allHistoryStatisticData.visitorCount = FieldValue.increment(1);
      allHistoryStatisticData.anonymousVisitorCount = FieldValue.increment(1);
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    if (modes.includes('register')) {
      allHistoryStatisticData.anonymousUserCount = FieldValue.increment(-1);
      allHistoryStatisticData.registeredUserCount = FieldValue.increment(1);
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    if (modes.includes('deleteAnonymousUser')) {
      allHistoryStatisticData.userCount = FieldValue.increment(-1);
      allHistoryStatisticData.anonymousUserCount = FieldValue.increment(-1);
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    if (modes.includes('deleteRegisteredUser')) {
      allHistoryStatisticData.userCount = FieldValue.increment(-1);
      allHistoryStatisticData.registeredUserCount = FieldValue.increment(-1);
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    if (modes.includes('increment-daily-visitorCount-anonymousUser')) {
      dailyStatisticRefs.forEach((dailyRef, index) => {
        const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {};
        if (index === 0) {
          dailyStatisticData.visitorCountToday = FieldValue.increment(1);
          dailyStatisticData.anonymousVisitorCountToday = FieldValue.increment(1);
        } else {
          dailyStatisticData[`visitorCount${index}DayAgo` as keyof typeof dailyStatisticData] = FieldValue.increment(1);
          dailyStatisticData[`anonymousVisitorCount${index}DayAgo` as keyof typeof dailyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
      });
    }

    if (modes.includes('increment-monthly-visitorCount-anonymousUser')) {
      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {};
        if (index === 0) {
          monthlyStatisticData.visitorCountThisMonth = FieldValue.increment(1);
          monthlyStatisticData.anonymousVisitorCountThisMonth = FieldValue.increment(1);
        } else {
          monthlyStatisticData[`visitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
          monthlyStatisticData[`anonymousVisitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(monthlyRef, monthlyStatisticRefs, { merge: true });
      });
    }

    if (modes.includes('increment-yearly-visitorCount-anonymousUser')) {
      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {};
        if (index === 0) {
          yearlyStatisticData.visitorCountThisYear = FieldValue.increment(1);
          yearlyStatisticData.anonymousVisitorCountThisYear = FieldValue.increment(1);
        } else {
          yearlyStatisticData[`visitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
          yearlyStatisticData[`anonymousVisitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
      });
    }

    if (modes.includes('increment-daily-visitorCount-registeredUser')) {
      dailyStatisticRefs.forEach((dailyRef, index) => {
        const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {};
        if (index === 0) {
          dailyStatisticData.visitorCountToday = FieldValue.increment(1);
          dailyStatisticData.registeredVisitorCountToday = FieldValue.increment(1);
        } else {
          dailyStatisticData[`visitorCount${index}DayAgo` as keyof typeof dailyStatisticData] = FieldValue.increment(1);
          dailyStatisticData[`registeredVisitorCount${index}DayAgo` as keyof typeof dailyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
      });
    }

    if (modes.includes('increment-monthly-visitorCount-registeredUser')) {
      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {};
        if (index === 0) {
          monthlyStatisticData.visitorCountThisMonth = FieldValue.increment(1);
          monthlyStatisticData.registeredVisitorCountThisMonth = FieldValue.increment(1);
        } else {
          monthlyStatisticData[`visitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
          monthlyStatisticData[`registeredVisitorCount${index}MonthAgo` as keyof typeof monthlyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
      });
    }

    if (modes.includes('increment-yearly-visitorCount-registeredUser')) {
      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {};
        if (index === 0) {
          yearlyStatisticData.visitorCountThisYear = FieldValue.increment(1);
          yearlyStatisticData.registeredVisitorCountThisYear = FieldValue.increment(1);
        } else {
          yearlyStatisticData[`visitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
          yearlyStatisticData[`registeredVisitorCount${index}YearAgo` as keyof typeof yearlyStatisticData] =
            FieldValue.increment(1);
        }
        bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
      });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating visit statistic', error);
  }
};
