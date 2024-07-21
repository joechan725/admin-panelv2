import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Category } from '@/models/classification/category/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface GetCategoryBySlugParameters {
  slug: string;
}

export const getCategoryBySlug = async ({ slug }: GetCategoryBySlugParameters): Promise<Category | undefined> => {
  // prepare
  const categoriesRef = collection(db, 'categories').withConverter(classificationConverter);

  // Query by slug
  const categoriesQuery = query(categoriesRef, where('slug', '==', slug));

  // get
  const categoriesSnap = await getDocs(categoriesQuery);

  const categoryData = categoriesSnap.docs.at(0)?.data();

  return categoryData;
};
