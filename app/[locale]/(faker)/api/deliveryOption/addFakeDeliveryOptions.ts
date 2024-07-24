import { db } from '@/firebase/config';
import { generateFakeDeliveryOption } from './generateFakeDeliveryOption';
import { addDoc, collection } from 'firebase/firestore';
import { getStoreAddresses } from '@/firebase/api/storeAddress/getStoreAddresses';

export const addFakeDeliveryOptions = async (numberOfDeliveryOptions: number) => {
  const storeAddresses = await getStoreAddresses();

  const deliveryOptionsRef = collection(db, '/deliveryOptions');
  for (let i = 0; i < numberOfDeliveryOptions; i++) {
    const storeAddress = generateFakeDeliveryOption({ storeAddresses });
    await addDoc(deliveryOptionsRef, storeAddress);
    console.log(`Create Fake Delivery Options ${i + 1}/${numberOfDeliveryOptions}`);
  }
};
