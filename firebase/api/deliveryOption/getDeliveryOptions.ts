import { db } from '@/firebase/config';
import { deliveryOptionConverter } from '@/firebase/converter/deliveryOption/deliveryOptionConverter';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

interface GetDeliveryOptionsParameters {
  isPublicOnly: boolean;
}

export const getDeliveryOptions = async ({ isPublicOnly }: GetDeliveryOptionsParameters) => {
  const deliveryOptionsRef = collection(db, 'deliveryOptions').withConverter(deliveryOptionConverter);
  let deliveryOptionsQuery = query(deliveryOptionsRef, orderBy('updatedAt', 'desc'));

  if (isPublicOnly) {
    deliveryOptionsQuery = query(deliveryOptionsQuery, where('isPublic', '==', true));
  }

  const deliveryOptionsSnap = await getDocs(deliveryOptionsQuery);

  const deliveryOptions = deliveryOptionsSnap.docs.map((doc) => ({ ...doc.data() }));
  return deliveryOptions;
};
