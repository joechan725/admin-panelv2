import { fakerZH_TW as faker } from '@faker-js/faker';
import { Brand } from '@/models/classification/brand/Brand';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface BrandData extends Omit<Brand, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeBrand = (): BrandData => {
  const name = faker.company.name();
  return removeEmptyFieldFormObject({
    nameZH: name,
    nameEN: name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
