import { fakerZH_TW as faker } from '@faker-js/faker';
import { Category } from '@/models/classification/category/Category';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface CategoryData extends Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeCategory = (): CategoryData => {
  const name = faker.commerce.department();
  return removeEmptyFieldFormObject({
    nameZH: name,
    nameEN: name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
