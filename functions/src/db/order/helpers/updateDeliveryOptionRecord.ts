import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { PrivateDeliveryOption } from '../../../models/deliveryOption/PrivateDeliveryOption';
import { removeEmptyFieldFormObject } from '../../../lib/helpers/object/removeEmptyFieldFormObject';
import { OrderData } from '../../../models/order/OrderData';
import { DeliveryOptionUsageRecord } from '../../../models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateDeliveryOptionRecordParameters {
  orderId: string;
  orderData: OrderData;
  mode: 'create' | 'delete';
}

/**
 * Update the usageCount and totalDeliveryChange in the privateDeliveryOption document
 *
 * @param order - The order data
 * @param mode - 'create' | 'delete'
 * @returns The promise of void
 */

export const updateDeliveryOptionRecord = async ({
  orderId,
  orderData,
  mode,
}: UpdateDeliveryOptionRecordParameters) => {
  try {
    const {
      userId,
      userRole,
      userAvatar,
      userEmail,
      userFirstName,
      userLastName,
      deliveryOptionId,
      deliveryOptionNameZH,
      deliveryOptionNameEN,
      deliveryOptionDeliveryCharge,
      deliveryOptionDescriptionZH,
      deliveryOptionDescriptionEN,
      deliveryOptionFreeDeliveryThreshold,
      totalPriceAfterDiscount,
      totalPriceBeforeDiscount,
      amountToPay,
      deliveryChargeAtThisOrder,
      createdAt,
    } = orderData;
    const bigBatch = new BigBatch(db);

    // update the usageCount and totalDeliveryChange of deliveryOption
    // And add a usageRecord
    const privateDeliveryOptionRef = db.collection('deliveryOptions').doc(deliveryOptionId);
    const deliveryOptionUsageRecordRef = db
      .collection('deliveryOptions')
      .doc(deliveryOptionId)
      .collection('usageRecords')
      .doc();

    if (mode === 'create') {
      const updatedDeliveryOption: ExtendWithFieldValue<Partial<PrivateDeliveryOption>> = {
        usageCount: FieldValue.increment(1),
        accumulativeDeliveryCharge: FieldValue.increment(deliveryChargeAtThisOrder),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.update(privateDeliveryOptionRef, updatedDeliveryOption);
      const deliveryOptionUsageRecord: ExtendWithFieldValue<Omit<DeliveryOptionUsageRecord, 'id'>> =
        removeEmptyFieldFormObject({
          orderId,
          userId,
          userRole,
          userAvatar,
          userEmail,
          userFirstName,
          userLastName,
          deliveryOptionId,
          deliveryOptionNameZH,
          deliveryOptionNameEN,
          deliveryOptionDeliveryCharge,
          deliveryOptionDescriptionZH,
          deliveryOptionDescriptionEN,
          deliveryOptionFreeDeliveryThreshold,
          orderTotalPriceAfterDiscount: totalPriceAfterDiscount,
          orderTotalPriceBeforeDiscount: totalPriceBeforeDiscount,
          orderAmountToPay: amountToPay,
          deliveryChargeAtThisOrder,
          orderedAt: Timestamp.fromMillis(createdAt.toMillis()),
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      bigBatch.create(deliveryOptionUsageRecordRef, deliveryOptionUsageRecord);
    }

    if (mode === 'delete') {
      // Update the delivery option
      const updatedDeliveryOption: ExtendWithFieldValue<Partial<PrivateDeliveryOption>> = {
        usageCount: FieldValue.increment(-1),
        accumulativeDeliveryCharge: FieldValue.increment(-deliveryChargeAtThisOrder),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.update(privateDeliveryOptionRef, updatedDeliveryOption);

      // Delete the usage record
      const deliveryOptionUsageRecordsRef = db
        .collection('deliveryOptions')
        .doc(deliveryOptionId)
        .collection('usageRecords');
      const deliveryOptionUsageRecordsQuery = deliveryOptionUsageRecordsRef.where('orderId', '==', orderId).limit(1);
      const deliveryOptionUsageRecordsSnap = await deliveryOptionUsageRecordsQuery.get();
      const deliveryOptionUsageRecordRef = deliveryOptionUsageRecordsSnap.docs.at(0)?.ref;
      if (deliveryOptionUsageRecordRef) {
        const updatedDeliveryOptionUsageRecord: ExtendWithFieldValue<Partial<DeliveryOptionUsageRecord>> = {
          deletedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(deliveryOptionUsageRecordRef, updatedDeliveryOptionUsageRecord);
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating delivery option record', error);
  }
};
