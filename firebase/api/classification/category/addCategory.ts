import { db } from '@/firebase/config';
import { Category } from '@/models/classification/category/Category';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddCategoryData extends Omit<Category, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addCategory = async (categoryData: AddCategoryData) => {
  // prepare
  const categoriesRef = collection(db, 'categories');

  // add
  const res = await addDoc(categoriesRef, categoryData);

  // return the category id
  return res.id;
};
