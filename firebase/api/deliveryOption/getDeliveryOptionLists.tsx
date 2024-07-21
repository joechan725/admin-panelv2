import { db } from '@/firebase/config';
import { deliveryOptionListConverter } from '@/firebase/converter/deliveryOption/deliveryOptionListConverter';
import { collection, getDocs } from 'firebase/firestore';

export const getDeliveryOptionLists = async () => {
  // Prepare
  const deliveryOptionListsRef = collection(db, '/deliveryOptionLists').withConverter(deliveryOptionListConverter);

  // Get docs
  const deliveryOptionListsSnap = await getDocs(deliveryOptionListsRef);
  const deliveryOptionLists = deliveryOptionListsSnap.docs.map((doc) => doc.data());

  // Convert lists to documents
  const deliveryOptions = deliveryOptionLists.flat();

  return deliveryOptions;
};
