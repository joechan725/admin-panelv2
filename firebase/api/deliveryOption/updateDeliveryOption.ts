import { doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { StoreAddress } from '@/models/store/StoreAddress';

export interface UpdateDeliveryOptionFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<DeliveryOption, 'createdAt' | 'updatedAt' | 'id' | 'pickUpStoreAddress'>>> {
  updatedAt: FieldValue;
  pickUpStoreAddress?: StoreAddressData;
}

interface StoreAddressData extends Omit<StoreAddress, 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface UpdateDeliveryOptionParameters {
  deliveryOptionId: string;
  deliveryOptionFirestoreData: UpdateDeliveryOptionFirestoreData;
}

export const updateDeliveryOption = async ({
  deliveryOptionId,
  deliveryOptionFirestoreData,
}: UpdateDeliveryOptionParameters) => {
  // Prepare
  const deliveryOptionRef = doc(db, `/deliveryOptions/${deliveryOptionId}`);

  const updatedDeliveryOption = {
    ...deliveryOptionFirestoreData,
  };

  // Update the smart bar
  await updateDoc(deliveryOptionRef, updatedDeliveryOption);
};
