import * as functions from 'firebase-functions';
import { DeliveryOptionUsageRecordData } from '../../../models/deliveryOption/usageRecord/DeliveryOptionUsageRecordData';
import { updateDeliveryOptionUsageRecordList } from './helpers/updateDeliveryOptionUsageRecordList';

export const onUpdateDeliveryOptionUsageRecord = functions.firestore
  .document('deliveryOptions/{deliveryOptionId}/usageRecords/{deliveryOptionUsageRecordId}')
  .onUpdate(async (change, context) => {
    const { deliveryOptionId, deliveryOptionUsageRecordId } = context.params;
    // get data after changes
    const deliveryOptionUsageRecordSnapBefore = change.before;
    const deliveryOptionUsageRecordSnapAfter = change.after;

    const deliveryOptionUsageRecordDataBefore =
      deliveryOptionUsageRecordSnapBefore.data() as DeliveryOptionUsageRecordData;

    const deliveryOptionUsageRecordDataAfter =
      deliveryOptionUsageRecordSnapAfter.data() as DeliveryOptionUsageRecordData;

    if (deliveryOptionUsageRecordDataAfter.deletedAt === undefined) {
      // The record is update
      await updateDeliveryOptionUsageRecordList({
        deliveryOptionId,
        deliveryOptionUsageRecordId,
        deliveryOptionUsageRecordDataAfter,
        deliveryOptionUsageRecordDataBefore,
        mode: 'update',
      });
    }

    if (deliveryOptionUsageRecordDataAfter.deletedAt !== undefined) {
      // The record is deleted
      await updateDeliveryOptionUsageRecordList({
        deliveryOptionId,
        deliveryOptionUsageRecordId,
        deliveryOptionUsageRecordDataBefore,
        mode: 'delete',
      });
    }
  });
