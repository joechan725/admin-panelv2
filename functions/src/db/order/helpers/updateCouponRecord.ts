import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { PrivateCoupon } from '../../../models/coupon/PrivateCoupon';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { removeEmptyFieldFormObject } from '../../../lib/helpers/object/removeEmptyFieldFormObject';
import { OrderData } from '../../../models/order/OrderData';
import { CouponUsageRecord } from '../../../models/coupon/usageRecord/CouponUsageRecord';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateCouponRecordParameters {
  orderId: string;
  orderData: OrderData;
  mode: 'create' | 'delete';
}

/**
 * Update the accumulativeDiscountAmount, usageCount and usageRecords in coupon document
 *
 * @param order - The order data
 * @param mode - 'create' | 'delete'
 * @returns The promise of void
 */

export const updateCouponRecord = async ({ orderId, orderData, mode }: UpdateCouponRecordParameters) => {
  try {
    const {
      userId,
      userRole,
      userAvatar,
      userEmail,
      userFirstName,
      userLastName,
      totalPriceAfterDiscount,
      totalPriceBeforeDiscount,
      amountToPay,
      createdAt,
    } = orderData;

    // update the accumulativeDiscountAmount, usageCount and usageRecords of coupon
    const bigBatch = new BigBatch(db);
    if (mode === 'create') {
      orderData.couponsUsed.forEach((couponUsed) => {
        // Update the coupon
        const couponRef = db.collection('coupons').doc(couponUsed.id);
        const updateCoupon: ExtendWithFieldValue<Partial<PrivateCoupon>> = {
          usageCount: FieldValue.increment(1),
          accumulativeDiscountAmount: FieldValue.increment(couponUsed.discountAmountAtThisOrder),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(couponRef, updateCoupon);

        // Add a new usage record
        const couponUsageRecordRef = db.collection('coupons').doc(couponUsed.id).collection('usageRecords').doc();
        const couponUsageRecord: ExtendWithFieldValue<Omit<CouponUsageRecord, 'id'>> = removeEmptyFieldFormObject({
          orderId,
          userId,
          userRole,
          userAvatar,
          userEmail,
          userFirstName,
          userLastName,
          couponId: couponUsed.id,
          couponCode: couponUsed.code,
          couponDescription: couponUsed.description,
          couponDiscountType: couponUsed.discountType,
          couponDiscountAmount: couponUsed.discountAmount,
          couponMaximumDiscount: couponUsed.maximumDiscount,
          couponMinimumSpend: couponUsed.minimumSpend,
          discountAmountAtThisOrder: couponUsed.discountAmountAtThisOrder,
          orderTotalPriceAfterDiscount: totalPriceAfterDiscount,
          orderTotalPriceBeforeDiscount: totalPriceBeforeDiscount,
          orderAmountToPay: amountToPay,
          usedAt: Timestamp.fromMillis(createdAt.toMillis()),
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
        bigBatch.create(couponUsageRecordRef, couponUsageRecord);
      });
    }

    if (mode === 'delete') {
      for (let i = 0; i < orderData.couponsUsed.length; i++) {
        // Update the coupon
        const couponUsed = orderData.couponsUsed[i];
        const couponRef = db.collection('privateCoupons').doc(couponUsed.id);
        const updateCoupon: ExtendWithFieldValue<Partial<PrivateCoupon>> = {
          usageCount: FieldValue.increment(-1),
          accumulativeDiscountAmount: FieldValue.increment(-couponUsed.discountAmountAtThisOrder),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(couponRef, updateCoupon);

        // Delete the usage record
        const couponUsageRecordsRef = db.collection('coupons').doc(couponUsed.id).collection('usageRecords');
        const couponUsageRecordsQuery = couponUsageRecordsRef.where('orderId', '==', orderId).limit(1);
        const couponUsageRecordsSnap = await couponUsageRecordsQuery.get();
        const couponUsageRecordRef = couponUsageRecordsSnap.docs.at(0)?.ref;
        if (couponUsageRecordRef) {
          const couponUsageRecord: Partial<ExtendWithFieldValue<Omit<CouponUsageRecord, 'id'>>> = {
            deletedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(couponUsageRecordRef, couponUsageRecord);
        }
      }
    }
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating coupon record', error);
  }
};
