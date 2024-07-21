import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getDateString } from '../../../../lib/helpers/date/getDateString';
import { ExtendWithFieldValue } from '../../../../types/ExtendWithFieldValue';
import { DailyStatistic } from '../../../../models/statistic/DailyStatistic';
import { MonthlyStatistic } from '../../../../models/statistic/MonthlyStatistic';
import { YearlyStatistic } from '../../../../models/statistic/YearlyStatistic';
import { AllHistoryStatistic } from '../../../../models/statistic/AllHistoryStatistic';
import { CartItemData } from '../../../../models/user/cartItem/CartItemData';
import { AddToCartRecord } from '../../../../models/statistic/record/AddToCartRecord';
import { BigBatch } from '../../../../classes/BigBatch';
import { db } from '../../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCartItemStatisticParameters {
  userId: string;
  cartItemData: CartItemData;
  date?: Date | number | Timestamp;
  mode: 'create';
}

/**
 * Update the cart item related statistic data
 * (dailyStatistics, monthlyStatistics, yearlyStatistics, allHistoryStatistic)
 *
 * @param cartItem - The new cartItem being added
 * @param cartItemData - The previous cartItem being added
 * @param mode - 'increment' | 'decrement'
 * @param date @optional - Updating a specific day data. Leave it blank to update today data.
 */

export const updateCartItemStatistic = async ({
  userId,
  date,
  cartItemData,
  mode,
}: UpdateCartItemStatisticParameters) => {
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

    if (mode === 'create') {
      const newAddToCartRecord: AddToCartRecord = {
        userId,
        productId: cartItemData.productId,
        productNameEN: cartItemData.nameEN,
        productNameZH: cartItemData.nameZH,
        productDescriptionEN: cartItemData.descriptionEN,
        productDescriptionZH: cartItemData.descriptionZH,
        productImage: cartItemData.image,
      };
      const unionAddToCartRecords = FieldValue.arrayUnion(newAddToCartRecord);

      dailyStatisticRefs.forEach((dailyRef, index) => {
        if (index === 0) {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            addToCartItemCountToday: FieldValue.increment(1),
            addToCartRecords: unionAddToCartRecords,
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        } else {
          const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
            [`addToCartItemCount${index}DayAgo`]: FieldValue.increment(1),
          };
          bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
        }
      });

      monthlyStatisticRefs.forEach((monthlyRef, index) => {
        if (index === 0) {
          const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            addToCartItemCountThisMonth: FieldValue.increment(1),
            addToCartRecords: unionAddToCartRecords,
          };
          bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
        } else {
          const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
            [`addToCartItemCount${index}MonthAgo`]: FieldValue.increment(1),
          };
          bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
        }
      });

      yearlyStatisticRefs.forEach((yearlyRef, index) => {
        if (index === 0) {
          const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
            addToCartItemCountThisYear: FieldValue.increment(1),
            addToCartRecords: unionAddToCartRecords,
          };
          bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
        } else {
          const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
            [`addToCartItemCount${index}YearAgo`]: FieldValue.increment(1),
          };
          bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
        }
      });

      const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
        addToCartItemCount: FieldValue.increment(1),
      };
      bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on checking cart item statistic', error);
  }
};

// if (mode === 'update') {
//   const newAddToCartRecord: AddToCartRecord = {
//     userId,
//     productId: cartItemData.productId,
//     productName: cartItemData.productName,
//     productDescription: cartItemData.product.description,
//     productImage: cartItemData.product.images?.[0],
//   };
//   const unionAddToCartRecords = FieldValue.arrayUnion(newAddToCartRecord);

//   dailyStatisticRefs.forEach((dailyRef, index) => {
//     if (index === 0) {
//       const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
//         addToCartItemCountToday: FieldValue.increment(cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)),
//         addToCartRecords: unionAddToCartRecords,
//       };
//       bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
//     } else {
//       const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
//         [`addToCartItemCount${index}DayAgo`]: FieldValue.increment(
//           cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)
//         ),
//       };
//       bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
//     }
//   });

//   monthlyStatisticRefs.forEach((monthlyRef, index) => {
//     if (index === 0) {
//       const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
//         addToCartItemCountThisMonth: FieldValue.increment(
//           cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)
//         ),
//         addToCartRecords: unionAddToCartRecords,
//       };
//       bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
//     } else {
//       const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
//         [`addToCartItemCount${index}MonthAgo`]: FieldValue.increment(
//           cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)
//         ),
//       };
//       bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
//     }
//   });

//   yearlyStatisticRefs.forEach((yearlyRef, index) => {
//     if (index === 0) {
//       const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
//         addToCartItemCountThisYear: FieldValue.increment(cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)),
//         addToCartRecords: unionAddToCartRecords,
//       };
//       bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
//     } else {
//       const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
//         [`addToCartItemCount${index}YearAgo`]: FieldValue.increment(
//           cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)
//         ),
//       };
//       bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
//     }
//   });

//   const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
//     addToCartItemCount: FieldValue.increment(cartItemData.quantity - (cartItemDataBefore?.quantity ?? 0)),
//   };
//   bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
// }

// if (mode === 'delete') {
//   const removeAddToCartRecords = FieldValue.arrayRemove({
//     userId,
//     productId: cartItemData.productId,
//     productName: cartItemData.productName,
//     productDescription: cartItemData.product.description,
//     productImage: cartItemData.product.images?.[0],
//     quantity: cartItemData.quantity,
//   });
//   dailyStatisticRefs.forEach((dailyRef, index) => {
//     if (index === 0) {
//       const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
//         addToCartItemCountToday: FieldValue.increment(-cartItemData.quantity),
//         addToCartRecords: removeAddToCartRecords,
//       };
//       bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
//     } else {
//       const dailyStatisticData: ExtendWithFieldValue<DailyStatistic> = {
//         [`addToCartItemCount${index}DayAgo`]: FieldValue.increment(-cartItemData.quantity),
//       };
//       bigBatch.set(dailyRef, dailyStatisticData, { merge: true });
//     }
//   });

//   monthlyStatisticRefs.forEach((monthlyRef, index) => {
//     if (index === 0) {
//       const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
//         addToCartItemCountThisMonth: FieldValue.increment(-cartItemData.quantity),
//         addToCartRecords: removeAddToCartRecords,
//       };
//       bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
//     } else {
//       const monthlyStatisticData: ExtendWithFieldValue<MonthlyStatistic> = {
//         [`addToCartItemCount${index}MonthAgo`]: FieldValue.increment(-cartItemData.quantity),
//       };
//       bigBatch.set(monthlyRef, monthlyStatisticData, { merge: true });
//     }
//   });

//   yearlyStatisticRefs.forEach((yearlyRef, index) => {
//     if (index === 0) {
//       const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
//         addToCartItemCountThisYear: FieldValue.increment(-cartItemData.quantity),
//         addToCartRecords: removeAddToCartRecords,
//       };
//       bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
//     } else {
//       const yearlyStatisticData: ExtendWithFieldValue<YearlyStatistic> = {
//         [`addToCartItemCount${index}YearAgo`]: FieldValue.increment(-cartItemData.quantity),
//       };
//       bigBatch.set(yearlyRef, yearlyStatisticData, { merge: true });
//     }
//   });

//   const allHistoryStatisticData: ExtendWithFieldValue<AllHistoryStatistic> = {
//     addToCartItemCount: FieldValue.increment(-cartItemData.quantity),
//   };
//   bigBatch.set(allHistoryStatisticRef, allHistoryStatisticData, { merge: true });
// }
