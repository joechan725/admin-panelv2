import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Category } from '@/models/classification/category/Category';
import { doc, getDoc } from 'firebase/firestore';

export const getCategory = async (categoryId: string): Promise<Category | undefined> => {
  // prepare
  const categoryRef = doc(db, `categories/${categoryId}`).withConverter(classificationConverter);

  // get
  const categorySnap = await getDoc(categoryRef);

  // convert to data
  const categoryData = categorySnap.data();

  return categoryData;
};
