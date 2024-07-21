import * as functions from 'firebase-functions';
import { DeliveryOptionUsageRecordData } from '../../../models/deliveryOption/usageRecord/DeliveryOptionUsageRecordData';
import { updateDeliveryOptionUsageRecordList } from './helpers/updateDeliveryOptionUsageRecordList';

export const onCreateDeliveryOptionUsageRecord = functions.firestore
  .document('deliveryOptions/{deliveryOptionId}/usageRecords/{deliveryOptionUsageRecordId}')
  .onCreate(async (snapshot, context) => {
    const { deliveryOptionId, deliveryOptionUsageRecordId } = context.params;
    const deliveryOptionUsageRecordData = snapshot.data() as DeliveryOptionUsageRecordData;

    await updateDeliveryOptionUsageRecordList({
      deliveryOptionId,
      deliveryOptionUsageRecordId,
      deliveryOptionUsageRecordDataAfter: deliveryOptionUsageRecordData,
      mode: 'create',
    });
  });
