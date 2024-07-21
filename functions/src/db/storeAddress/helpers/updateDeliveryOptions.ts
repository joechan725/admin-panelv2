import { FieldValue } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { DeliveryOption } from '../../../models/deliveryOption/DeliveryOption';
import { StoreAddressData } from '../../../models/store/StoreAddressData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

interface UpdateDeliveryOptionParameter {
  storeAddressId: string;
  storeAddressData: StoreAddressData;
  mode: 'update' | 'delete';
}

/**
 * Update the delivery option when the store address is changed
 *
 * @param storeAddressId - The id of store address
 * @param storeAddressData - The firestore store Address data
 * @param mode - 'create' | 'update' | 'delete'
 *
 * @returns The promise of void
 */

export const updateDeliveryOption = async ({
  storeAddressId,
  mode,
  storeAddressData,
}: UpdateDeliveryOptionParameter) => {
  try {
    const bigBatch = new BigBatch(db);

    const { name, region, district, phoneNumber, detailAddress } = storeAddressData;

    const deliveryOptionsRef = db.collection('deliveryOptions');
    const deliveryOptionsQuery = deliveryOptionsRef.where('pickUpStoreAddressId', '==', storeAddressId);

    const deliveryOptionsSnap = await deliveryOptionsQuery.get();

    const deliveryOptionRefs = deliveryOptionsSnap.docs.map((doc) => doc.ref);

    if (mode === 'update') {
      const updateDeliveryOption: ExtendWithFieldValue<Partial<DeliveryOption>> = {
        storeAddressId,
        storeAddressName: name,
        storeAddressRegion: region,
        storeAddressDistrict: district,
        storeAddressPhoneNumber: phoneNumber,
        storeAddressDetailAddress: detailAddress,
        updatedAt: FieldValue.serverTimestamp(),
      };
      deliveryOptionRefs.forEach((deliveryOptionRef) => {
        bigBatch.set(deliveryOptionRef, updateDeliveryOption, { merge: true });
      });
    }

    if (mode === 'delete') {
      const updateDeliveryOption: ExtendWithFieldValue<Partial<DeliveryOption>> = {
        isPublic: false,
        storeAddressId: FieldValue.delete(),
        storeAddressName: FieldValue.delete(),
        storeAddressRegion: FieldValue.delete(),
        storeAddressDistrict: FieldValue.delete(),
        storeAddressPhoneNumber: FieldValue.delete(),
        storeAddressDetailAddress: FieldValue.delete(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      deliveryOptionRefs.forEach((deliveryOptionRef) => {
        bigBatch.set(deliveryOptionRef, updateDeliveryOption, { merge: true });
      });
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating delivery option after store address changes', error);
  }
};
