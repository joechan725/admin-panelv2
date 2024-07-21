import { db } from '@/firebase/config';
import { Collection } from '@/models/classification/collection/Collection';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

export interface UpdateCollectionData
  extends ExtendWithFieldValue<Partial<Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>>> {
  updatedAt: FieldValue;
}

interface UpdateCollectionParameters {
  collectionData: UpdateCollectionData;
  collectionId: string;
}

export const updateCollection = async ({ collectionData, collectionId }: UpdateCollectionParameters) => {
  // prepare
  const collectionRef = doc(db, `collections/${collectionId}`);

  const updatedCollection = {
    ...collectionData,
  };

  // update
  await updateDoc(collectionRef, updatedCollection);
};
