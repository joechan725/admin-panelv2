import { HttpsError } from 'firebase-functions/v2/https';
import { removeEmptyFieldFormObject } from '../../../lib/helpers/object/removeEmptyFieldFormObject';
import { PrivateCouponData } from '../../../models/coupon/PrivateCouponData';
import { PrivateCouponListData } from '../../../models/coupon/PrivateCouponListData';
import { CouponUsedData } from '../../../models/coupon/CouponUsedData';
import { CouponUsageRecordListData } from '../../../models/coupon/usageRecord/CouponUsageRecordListData';
import { filterUniqueObjects } from '../../../lib/helpers/object/filterUniqueObjects';
import { db } from '../../../admin';

interface ValidateCouponParameters {
  userId: string;
  couponCodes: string[];
  orderTotalPrice: number;
  isAnonymous: boolean;
}

export const validateCoupon = async ({
  userId,
  couponCodes,
  orderTotalPrice,
  isAnonymous,
}: ValidateCouponParameters) => {
  const errorMessages: string[] = [];

  if (!couponCodes || couponCodes.length === 0) {
    return {
      couponsUsedData: [],
      discountAmountInDollar: 0,
      discountAmountInCents: 0,
    };
  }

  // Query Firestore
  const privateCouponListsRef = db.collection('privateCouponLists');
  const privateCouponListsQuery = privateCouponListsRef.where('codes', 'array-contains-any', [...couponCodes]);
  const privateCouponListsSnap = await privateCouponListsQuery.get();
  const privateCouponListsData = privateCouponListsSnap.docs.map((doc) => doc.data() as PrivateCouponListData);

  const privateCouponsData: (PrivateCouponData & { id: string })[] = privateCouponListsData
    .map((list) => list.coupons)
    .flat();

  //  Check if the coupons exists
  if (privateCouponsData.length === 0) {
    errorMessages.push('Coupon does not exist');
  }

  // Check if there are any code not exist in the couponsData
  // i.e. the coupon is invalid.
  const invalidCodes = couponCodes.filter(
    (couponCode) => !privateCouponsData.some((couponData) => couponData.code === couponCode)
  );
  if (invalidCodes && invalidCodes.length > 0) {
    const invalidCodesString = invalidCodes.reduce((accumulator, code) => accumulator + `'${code}' `, '');
    errorMessages.push(`Coupon ${invalidCodesString} does not exist.`);
  }

  // filter the coupon by the code entered by users.
  const filteredCouponsData = privateCouponsData.filter((couponData) => couponCodes.includes(couponData.code));

  // filter the coupon with same code (which is mostly not happened)
  const uniqueCoupons = filterUniqueObjects(filteredCouponsData, 'code');

  // calculate the total discount amount
  const couponsUsedData: (CouponUsedData & { id: string })[] = [];

  for (let i = 0; i < uniqueCoupons.length; i++) {
    const couponData = uniqueCoupons[i];

    const {
      id,
      isPublic,
      registeredUserOnly,
      startDate,
      endDate,
      usageLimit,
      usageLimitPerUser,
      usageCount,
      minimumSpend,
      discountType,
      discountAmount,
      maximumDiscount,
      canBeUsedTogether,
      code,
      createdAt,
      description,
      updatedAt,
    } = couponData;

    // Check if the coupon is public
    if (!isPublic) {
      errorMessages.push(`Coupon '${code}' does not exist.`);
    }

    // Check if user registered (for coupon for registered user only)
    if (registeredUserOnly) {
      if (isAnonymous) {
        errorMessages.push(`Coupon '${code}' is for registered user only.`);
      }
    }

    if (!canBeUsedTogether) {
      if (couponCodes.length > 1) {
        errorMessages.push(`Coupon '${code}' can not be used with other coupons together.`);
      }
    }

    // Check if the coupon date validity
    const currentDate = new Date();
    if (startDate && currentDate < startDate.toDate()) {
      errorMessages.push(`Coupon '${code}' not begun yet.`);
    }
    if (endDate && currentDate > endDate.toDate()) {
      errorMessages.push(`Coupon '${code}' expired.`);
    }

    // Check if the overall usage limit has reached
    if (usageLimit) {
      const isReachedLimit = usageCount && usageCount >= usageLimit;
      if (isReachedLimit) {
        errorMessages.push(`Coupon '${code}' usage limit has been reached.`);
      }
    }

    // Check if the usage limit per user has reached
    if (usageLimitPerUser) {
      const couponUsageRecordListsRef = db.collection('coupons').doc(id).collection('usageRecordLists');
      const couponUsageRecordListsQuery = couponUsageRecordListsRef.where('userIds', 'array-contains', userId);
      const couponUsageRecordListsSnap = await couponUsageRecordListsQuery.get();
      const couponUsageRecordListsData = couponUsageRecordListsSnap.docs.map(
        (doc) => doc.data() as CouponUsageRecordListData
      );
      const couponUsageRecordsData = couponUsageRecordListsData.map((list) => list.couponUsageRecords).flat();

      const customerUsageCount = couponUsageRecordsData?.filter((record) => record.userId === userId).length;
      const isReachedLimit = customerUsageCount ? customerUsageCount >= usageLimitPerUser : false;
      if (isReachedLimit) {
        errorMessages.push(`You have reached the coupon '${code}' usage limit per user.`);
      }
    }

    // Check if the minimum spent has reached
    if (minimumSpend) {
      const notReachedMinimumSpend = orderTotalPrice < minimumSpend;
      if (notReachedMinimumSpend) {
        errorMessages.push(
          `For coupon '${code}', minimal order amount for coupon not reacted. ($${minimumSpend.toFixed(0)})`
        );
      }
    }

    // Calculate the discount amount
    let calculatedDisCountAmount = 0;
    if (discountType === 'fixed') {
      calculatedDisCountAmount = +discountAmount.toFixed(2);
    }
    if (discountType === 'percentage') {
      calculatedDisCountAmount = orderTotalPrice * (discountAmount / 100);
      calculatedDisCountAmount = +calculatedDisCountAmount.toFixed(2);
      if (maximumDiscount) {
        calculatedDisCountAmount = Math.min(calculatedDisCountAmount, maximumDiscount);
      }
    }

    const couponUsed: CouponUsedData & { id: string } = removeEmptyFieldFormObject({
      id,
      canBeUsedTogether,
      code,
      createdAt,
      description,
      discountAmount,
      discountAmountAtThisOrder: calculatedDisCountAmount,
      discountType,
      isPublic,
      registeredUserOnly,
      updatedAt,
      endDate,
      maximumDiscount,
      minimumSpend,
      startDate,
      usageLimit,
      usageLimitPerUser,
    });

    couponsUsedData.push(couponUsed);
  }

  const totalDiscountAmountInDollar = couponsUsedData.reduce(
    (accumulator, couponUsed) => (accumulator += couponUsed.discountAmountAtThisOrder),
    0
  );
  const totalDiscountAmountInCents = totalDiscountAmountInDollar * 100;

  if (errorMessages.length > 0) {
    const errorMessage = errorMessages.reduce((accumulator, message) => accumulator + message + ' ', '');
    throw new HttpsError('invalid-argument', errorMessage);
  }

  return {
    discountAmountInDollar: totalDiscountAmountInDollar,
    discountAmountInCents: totalDiscountAmountInCents,
    couponsUsedData,
  };
};
