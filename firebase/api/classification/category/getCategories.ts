import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Category } from '@/models/classification/category/Category';
import { collection, getDocs } from 'firebase/firestore';

export const getCategories = async (): Promise<Category[]> => {
  // prepare
  const categoriesRef = collection(db, 'categories').withConverter(classificationConverter);

  // get
  const categoriesSnap = await getDocs(categoriesRef);

  // convert to list
  const categoriesData = categoriesSnap.docs.map((doc) => ({ ...doc.data() }));

  return categoriesData;
};
