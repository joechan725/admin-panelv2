import { addDoc, collection, FieldValue } from 'firebase/firestore';
import { db } from '../../config';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { StoreAddress } from '@/models/store/StoreAddress';

export interface CreateDeliveryOptionFirestoreData
  extends Omit<DeliveryOption, 'createdAt' | 'updatedAt' | 'id' | 'pickUpStoreAddress'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  pickUpStoreAddress?: StoreAddressData;
}

interface StoreAddressData extends Omit<StoreAddress, 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addDeliveryOption = async (deliveryOptionFirestoreData: CreateDeliveryOptionFirestoreData) => {
  // prepare
  const deliveryOptionsRef = collection(db, 'deliveryOptions');

  // Upload the new deliveryOption
  const res = await addDoc(deliveryOptionsRef, deliveryOptionFirestoreData);

  // return the uploaded doc id
  const id = res.id;

  return id;
};
