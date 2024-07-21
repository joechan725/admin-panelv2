import { db } from '@/firebase/config';
import { Collection } from '@/models/classification/collection/Collection';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddCollectionData extends Omit<Collection, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addCollection = async (collectionData: AddCollectionData) => {
  // prepare
  const collectionsRef = collection(db, 'collections');

  // add
  const res = await addDoc(collectionsRef, collectionData);

  // return the collection id
  return res.id;
};
