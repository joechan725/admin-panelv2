import { db } from '@/firebase/config';
import { Promotion } from '@/models/promotion/Promotion';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddPromotionFirestoreData extends Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addPromotion = async (promotion: AddPromotionFirestoreData) => {
  // prepare
  const promotionsRef = collection(db, `/promotions`);

  // add
  const res = await addDoc(promotionsRef, promotion);

  // return
  const { id } = res;
  return id;
};
