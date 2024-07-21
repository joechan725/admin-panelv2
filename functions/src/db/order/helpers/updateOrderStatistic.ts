import { getDateString } from '../../../lib/helpers/date/getDateString';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { DailyStatistic } from '../../../models/statistic/DailyStatistic';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { MonthlyStatistic } from '../../../models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '../../../models/statistic/YearlyStatistic';
import { AllHistoryStatistic } from '../../../models/statistic/AllHistoryStatistic';
import { OrderData } from '../../../models/order/OrderData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateStatisticParameters {
  orderId: string;
  orderData: OrderData;
  mode: 'increment' | 'decrement';
  date?: Date | number | Timestamp;
}

/**
 * Update the order related statistic data
 * (daily, monthlyStatistics, yearlyStatistics, allHistoryStatistic)
 *
 * @param orderId - The order id
 * @param orderData - The order data
 * @param mode - 'increment' | 'decrement'
 * @param date? - Updating a specific day data. Leave it blank to update today data.
 * @returns The promise of void
 */

export const updateOrderStatistic = async ({ orderId, orderData, mode, date }: UpdateStatisticParameters) => {
  try {
    // update the statistic
    // prepare
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
            // order related
            revenueToday: FieldValue.increment(orderData.totalPriceAfterDiscount),
            salesToday: FieldValue.increment(orderData.totalQuantity),
            orderCountToday: FieldValue.increment(1),

            // order - coupon related
            couponUsageCountToday: FieldValue.increment(orderData.couponsUsed.length),
            discountAmountToday: FieldValue.increment(orderData.discountAmount ?? 0),

            // order - deliveryOption related
            deliveryChargeToday: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        } else {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            // order related
            [`revenue${index}DayAgo`]: FieldValue.increment(orderData.totalPriceAfterDiscount),
            [`sales${index}DayAgo`]: FieldValue.increment(orderData.totalQuantity),
            [`orderCount${index}DayAgo`]: FieldValue.increment(1),

            // order - coupon related
            [`couponUsageCount${index}DayAgo`]: FieldValue.increment(orderData.couponsUsed.length),
            [`discountAmount${index}DayAgo`]: FieldValue.increment(orderData.discountAmount ?? 0),

            // order - deliveryOption related
            [`deliveryCharge${index}DayAgo`]: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        }
      });

      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        if (index === 0) {
          const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            // order related
            revenueThisMonth: FieldValue.increment(orderData.totalPriceAfterDiscount),
            salesThisMonth: FieldValue.increment(orderData.totalQuantity),
            orderCountThisMonth: FieldValue.increment(1),

            // order - coupon related
            couponUsageCountThisMonth: FieldValue.increment(orderData.couponsUsed.length),
            discountAmountThisMonth: FieldValue.increment(orderData.discountAmount ?? 0),

            // order - deliveryOption related
            deliveryChargeThisMonth: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
        } else {
          const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            // order related
            [`revenue${index}MonthAgo`]: FieldValue.increment(orderData.totalPriceAfterDiscount),
            [`sales${index}MonthAgo`]: FieldValue.increment(orderData.totalQuantity),
            [`orderCount${index}MonthAgo`]: FieldValue.increment(1),

            // order - coupon related
            [`couponUsageCount${index}MonthAgo`]: FieldValue.increment(orderData.couponsUsed.length),
            [`discountAmount${index}MonthAgo`]: FieldValue.increment(orderData.discountAmount ?? 0),

            // order - deliveryOption related
            [`deliveryCharge${index}MonthAgo`]: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
        }
      });

      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        if (index === 0) {
          const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
            // order related
            revenueThisYear: FieldValue.increment(orderData.totalPriceAfterDiscount),
            salesThisYear: FieldValue.increment(orderData.totalQuantity),
            orderCountThisYear: FieldValue.increment(1),

            // order - coupon related
            couponUsageCountThisYear: FieldValue.increment(orderData.couponsUsed.length),
            discountAmountThisYear: FieldValue.increment(orderData.discountAmount ?? 0),

            // order - deliveryOption related
            deliveryChargeThisYear: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
        } else {
          const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
            // order related
            [`revenue${index}YearAgo`]: FieldValue.increment(orderData.totalPriceAfterDiscount),
            [`sales${index}YearAgo`]: FieldValue.increment(orderData.totalQuantity),
            [`orderCount${index}YearAgo`]: FieldValue.increment(1),

            // order - coupon related
            [`couponUsageCount${index}YearAgo`]: FieldValue.increment(orderData.couponsUsed.length),
            [`discountAmount${index}YearAgo`]: FieldValue.increment(orderData.discountAmount ?? 0),

            // order - deliveryOption related
            [`deliveryCharge${index}YearAgo`]: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
        }
      });

      const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
        // order related
        revenue: FieldValue.increment(orderData.totalPriceAfterDiscount),
        sales: FieldValue.increment(orderData.totalQuantity),
        orderCount: FieldValue.increment(1),
        // order - coupon related
        couponUsageCount: FieldValue.increment(orderData.couponsUsed.length),
        discountAmount: FieldValue.increment(orderData.discountAmount ?? 0),
        // order - deliveryOption related
        deliveryCharge: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
      };

      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    if (mode === 'decrement') {
      dailyStatisticRefs.forEach((dailyRef, index) => {
        if (index === 0) {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            // order related
            revenueToday: FieldValue.increment(-orderData.totalPriceAfterDiscount),
            salesToday: FieldValue.increment(-orderData.totalQuantity),
            orderCountToday: FieldValue.increment(-1),

            // order - coupon related
            couponUsageCountToday: FieldValue.increment(-orderData.couponsUsed.length),
            discountAmountToday: FieldValue.increment(-(orderData.discountAmount ?? 0)),

            // order - deliveryOption related
            deliveryChargeToday: FieldValue.increment(-orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        } else {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            // order related
            [`revenue${index}DayAgo`]: FieldValue.increment(-orderData.totalPriceAfterDiscount),
            [`sales${index}DayAgo`]: FieldValue.increment(-orderData.totalQuantity),
            [`orderCount${index}DayAgo`]: FieldValue.increment(-1),

            // order - coupon related
            [`couponUsageCount${index}DayAgo`]: FieldValue.increment(-orderData.couponsUsed.length),
            [`discountAmount${index}DayAgo`]: FieldValue.increment(-(orderData.discountAmount ?? 0)),

            // order - deliveryOption related
            [`deliveryCharge${index}DayAgo`]: FieldValue.increment(-orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        }
      });

      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        if (index === 0) {
          const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            // order related
            revenueThisMonth: FieldValue.increment(-orderData.totalPriceAfterDiscount),
            salesThisMonth: FieldValue.increment(-orderData.totalQuantity),
            orderCountThisMonth: FieldValue.increment(-1),

            // order - coupon related
            couponUsageCountThisMonth: FieldValue.increment(-orderData.couponsUsed.length),
            discountAmountThisMonth: FieldValue.increment(-(orderData.discountAmount ?? 0)),

            // order - deliveryOption related
            deliveryChargeThisMonth: FieldValue.increment(-orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
        } else {
          const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            // order related
            [`revenue${index}MonthAgo`]: FieldValue.increment(-orderData.totalPriceAfterDiscount),
            [`sales${index}MonthAgo`]: FieldValue.increment(-orderData.totalQuantity),
            [`orderCount${index}MonthAgo`]: FieldValue.increment(-1),

            // order - coupon related
            [`couponUsageCount${index}MonthAgo`]: FieldValue.increment(-orderData.couponsUsed.length),
            [`discountAmount${index}MonthAgo`]: FieldValue.increment(-(orderData.discountAmount ?? 0)),

            // order - deliveryOption related
            [`deliveryCharge${index}MonthAgo`]: FieldValue.increment(-orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
        }
      });

      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        if (index === 0) {
          const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
            // order related
            revenueThisYear: FieldValue.increment(-orderData.totalPriceAfterDiscount),
            salesThisYear: FieldValue.increment(-orderData.totalQuantity),
            orderCountThisYear: FieldValue.increment(-1),

            // order - coupon related
            couponUsageCountThisYear: FieldValue.increment(orderData.couponsUsed.length),
            discountAmountThisYear: FieldValue.increment(-(orderData.discountAmount ?? 0)),

            // order - deliveryOption related
            deliveryChargeThisYear: FieldValue.increment(orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
        } else {
          const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
            // order related
            [`revenue${index}YearAgo`]: FieldValue.increment(-orderData.totalPriceAfterDiscount),
            [`sales${index}YearAgo`]: FieldValue.increment(-orderData.totalQuantity),
            [`orderCount${index}YearAgo`]: FieldValue.increment(-1),

            // order - coupon related
            [`couponUsageCount${index}YearAgo`]: FieldValue.increment(-orderData.couponsUsed.length),
            [`discountAmount${index}YearAgo`]: FieldValue.increment(-(orderData.discountAmount ?? 0)),

            // order - deliveryOption related
            [`deliveryCharge${index}YearAgo`]: FieldValue.increment(-orderData.deliveryChargeAtThisOrder),
          };
          bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
        }
      });

      const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
        // order related
        revenue: FieldValue.increment(-orderData.totalPriceAfterDiscount),
        sales: FieldValue.increment(-orderData.totalQuantity),
        orderCount: FieldValue.increment(-1),
        // order - coupon related
        couponUsageCount: FieldValue.increment(-orderData.couponsUsed.length),
        discountAmount: FieldValue.increment(-(orderData.discountAmount ?? 0)),
        // order - deliveryOption related
        deliveryCharge: FieldValue.increment(-orderData.deliveryChargeAtThisOrder),
      };

      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating order statistic', error);
  }
};
