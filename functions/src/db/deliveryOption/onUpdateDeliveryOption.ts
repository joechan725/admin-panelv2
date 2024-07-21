import * as functions from 'firebase-functions';
import { updateDeliveryOptionCount } from './helpers/updateDeliveryOptionCount';
import { removeFieldsFormObject } from '../../lib/helpers/object/removeFieldsFormObject';
import { updateDeliveryOptionList } from './helpers/updateDeliveryOptionList';
import { PrivateDeliveryOptionData } from '../../models/deliveryOption/PrivateDeliveryOptionData';
import { DeliveryOptionData as PublicDeliveryOptionData } from '../../models/deliveryOption/DeliveryOptionData';

export const onUpdateDeliveryOption = functions.firestore
  .document('deliveryOptions/{deliveryOptionId}')
  .onUpdate(async (change, context) => {
    const { deliveryOptionId } = context.params;
    // get data after changes
    const deliveryOptionSnapBefore = change.before;
    const deliveryOptionSnapAfter = change.after;

    const privateDeliveryOptionDataBefore = deliveryOptionSnapBefore.data() as PrivateDeliveryOptionData;
    const privateDeliveryOptionDataAfter = deliveryOptionSnapAfter.data() as PrivateDeliveryOptionData;

    const publicDeliveryOptionDataAfter: PublicDeliveryOptionData = removeFieldsFormObject(
      privateDeliveryOptionDataAfter,
      ['usageCount', 'accumulativeDeliveryCharge']
    );
    const publicDeliveryOptionDataBefore: PublicDeliveryOptionData = removeFieldsFormObject(
      privateDeliveryOptionDataBefore,
      ['usageCount', 'accumulativeDeliveryCharge']
    );

    if (privateDeliveryOptionDataAfter.deletedAt === undefined) {
      // The delivery option is updated
      await updateDeliveryOptionList({
        deliveryOptionId,
        privateDeliveryOptionDataBefore,
        publicDeliveryOptionDataBefore,
        privateDeliveryOptionDataAfter,
        publicDeliveryOptionDataAfter,
        mode: 'update',
      });

      if (!privateDeliveryOptionDataBefore.isPublic && privateDeliveryOptionDataAfter.isPublic) {
        await updateDeliveryOptionCount({ mode: 'change-to-public' });
      }

      if (privateDeliveryOptionDataBefore.isPublic && !privateDeliveryOptionDataAfter.isPublic) {
        await updateDeliveryOptionCount({ mode: 'change-to-private' });
      }
    }

    if (
      privateDeliveryOptionDataBefore.deletedAt === undefined &&
      privateDeliveryOptionDataAfter.deletedAt !== undefined
    ) {
      // The deliveryOption is deleted
      await updateDeliveryOptionList({
        deliveryOptionId,
        privateDeliveryOptionDataBefore,
        publicDeliveryOptionDataBefore,
        mode: 'delete',
      });

      if (privateDeliveryOptionDataAfter.isPublic) {
        await updateDeliveryOptionCount({ mode: 'delete-public' });
      }
      if (!privateDeliveryOptionDataAfter.isPublic) {
        await updateDeliveryOptionCount({ mode: 'delete-private' });
      }
    }
  });
