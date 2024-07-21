import { fakerZH_TW as faker } from '@faker-js/faker';
import { Collection } from '@/models/classification/collection/Collection';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface CollectionData extends Omit<Collection, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeCollection = (): CollectionData => {
  const name = faker.commerce.department();
  return removeEmptyFieldFormObject({
    nameZH: name,
    nameEN: name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
