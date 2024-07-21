import * as functions from 'firebase-functions';
import { updateDeliveryOptionCount } from './helpers/updateDeliveryOptionCount';
import { removeFieldsFormObject } from '../../lib/helpers/object/removeFieldsFormObject';
import { updateDeliveryOptionList } from './helpers/updateDeliveryOptionList';
import { PrivateDeliveryOptionData } from '../../models/deliveryOption/PrivateDeliveryOptionData';
import { DeliveryOptionData as PublicDeliveryOptionData } from '../../models/deliveryOption/DeliveryOptionData';

export const onCreateDeliveryOption = functions.firestore
  .document('deliveryOptions/{deliveryOptionId}')
  .onCreate(async (snapshot, context) => {
    const { deliveryOptionId } = context.params;
    const privateDeliveryOptionData = snapshot.data() as PrivateDeliveryOptionData;
    const publicDeliveryOptionData: PublicDeliveryOptionData = removeFieldsFormObject(privateDeliveryOptionData, [
      'usageCount',
      'accumulativeDeliveryCharge',
    ]);

    await updateDeliveryOptionList({
      deliveryOptionId,
      privateDeliveryOptionDataAfter: privateDeliveryOptionData,
      publicDeliveryOptionDataAfter: publicDeliveryOptionData,
      mode: 'create',
    });

    if (privateDeliveryOptionData.isPublic) {
      await updateDeliveryOptionCount({ mode: 'create-public' });
    }
    if (!privateDeliveryOptionData.isPublic) {
      await updateDeliveryOptionCount({ mode: 'create-private' });
    }
  });
