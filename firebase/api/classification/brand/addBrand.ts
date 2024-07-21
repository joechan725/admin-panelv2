import { db } from '@/firebase/config';
import { Brand } from '@/models/classification/brand/Brand';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddBrandData extends Omit<Brand, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addBrand = async (brandData: AddBrandData) => {
  // prepare
  const brandsRef = collection(db, 'brands');

  // add
  const res = await addDoc(brandsRef, brandData);

  // return the brand id
  return res.id;
};
