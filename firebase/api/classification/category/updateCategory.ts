import { db } from '@/firebase/config';
import { Category } from '@/models/classification/category/Category';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

export interface UpdateCategoryData
  extends ExtendWithFieldValue<Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>> {
  updatedAt: FieldValue;
}

interface UpdateCategoryParameters {
  categoryData: UpdateCategoryData;
  categoryId: string;
}

export const updateCategory = async ({ categoryData, categoryId }: UpdateCategoryParameters) => {
  // prepare
  const categoryRef = doc(db, `categories/${categoryId}`);

  const updatedCategory = {
    ...categoryData,
  };

  // update
  await updateDoc(categoryRef, updatedCategory);
};
