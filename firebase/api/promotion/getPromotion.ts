import { db } from '@/firebase/config';
import { promotionConverter } from '@/firebase/converter/promotion/promotionConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getPromotion = async (promotionId: string) => {
  // prepare
  const promotionRef = doc(db, `/promotions/${promotionId}`).withConverter(promotionConverter);

  // get
  const promotionSnap = await getDoc(promotionRef);

  // return
  const promotion = promotionSnap.data();
  return promotion;
};
