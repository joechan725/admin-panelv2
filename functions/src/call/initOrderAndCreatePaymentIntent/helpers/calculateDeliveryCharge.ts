import { HttpsError } from 'firebase-functions/v1/auth';
import { removeFieldsFormObject } from '../../../lib/helpers/object/removeFieldsFormObject';
import { DeliveryOptionData } from '../../../models/deliveryOption/DeliveryOptionData';
import { PrivateDeliveryOptionData } from '../../../models/deliveryOption/PrivateDeliveryOptionData';
import { db } from '../../../admin';

interface CalculateDeliveryChargeParameters {
  deliveryOptionId: string;
  totalPriceBeforeCouponInDollar: number;
  totalPriceAfterCouponInDollar: number;
}

export const calculateDeliveryCharge = async ({
  deliveryOptionId,
  totalPriceBeforeCouponInDollar,
  totalPriceAfterCouponInDollar,
}: CalculateDeliveryChargeParameters) => {
  const deliveryOptionRef = db.collection('deliveryOptions').doc(deliveryOptionId);

  const deliveryOptionSnap = await deliveryOptionRef.get();

  if (!deliveryOptionSnap.exists) {
    throw new HttpsError('invalid-argument', 'The delivery options dose not exist.');
  }

  const privateDeliveryOptionData = deliveryOptionSnap.data() as PrivateDeliveryOptionData;

  const privateDeliveryOptionDataWithId = {
    ...privateDeliveryOptionData,
    id: deliveryOptionSnap.id,
  };

  const deliveryOptionData: DeliveryOptionData & { id: string } = removeFieldsFormObject(
    privateDeliveryOptionDataWithId,
    ['usageCount', 'accumulativeDeliveryCharge']
  );

  const { applyThresholdBeforeCoupons, freeDeliveryThreshold, deliveryCharge, isPublic } = deliveryOptionData;

  if (!isPublic) {
    throw new HttpsError('invalid-argument', 'The delivery options dose not available.');
  }

  // not freeDeliveryThreshold
  // (i.e. delivery charge is required whatever the order total spent)
  if (!freeDeliveryThreshold) {
    const deliveryChargeInDollar = deliveryCharge;
    const deliveryChargeInCents = deliveryChargeInDollar * 100;
    return { deliveryOptionData, deliveryChargeInDollar, deliveryChargeInCents };
  }

  if (applyThresholdBeforeCoupons) {
    const deliveryChargeInDollar = totalPriceBeforeCouponInDollar >= freeDeliveryThreshold ? 0 : deliveryCharge;
    const deliveryChargeInCents = deliveryChargeInDollar * 100;
    return { deliveryOptionData, deliveryChargeInDollar, deliveryChargeInCents };
  } else {
    const deliveryChargeInDollar = totalPriceAfterCouponInDollar >= freeDeliveryThreshold ? 0 : deliveryCharge;
    const deliveryChargeInCents = deliveryChargeInDollar * 100;
    return { deliveryOptionData, deliveryChargeInDollar, deliveryChargeInCents };
  }
};
