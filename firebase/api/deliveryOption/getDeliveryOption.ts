import { db } from '@/firebase/config';
import { deliveryOptionConverter } from '@/firebase/converter/deliveryOption/deliveryOptionConverter';
import { doc, getDoc } from 'firebase/firestore';

interface GetDeliveryOptionsProps {
  deliveryOptionId: string;
}

export const getDeliveryOption = async ({ deliveryOptionId }: GetDeliveryOptionsProps) => {
  const deliveryOptionRef = doc(db, `deliveryOptions/${deliveryOptionId}`).withConverter(deliveryOptionConverter);

  const deliveryOptionSnap = await getDoc(deliveryOptionRef);

  const deliveryOption = deliveryOptionSnap.data();

  return deliveryOption;
};
