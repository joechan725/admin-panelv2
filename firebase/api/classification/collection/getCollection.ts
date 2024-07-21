import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Collection } from '@/models/classification/collection/Collection';
import { doc, getDoc } from 'firebase/firestore';

export const getCollection = async (collectionId: string): Promise<Collection | undefined> => {
  // prepare
  const collectionRef = doc(db, `collections/${collectionId}`).withConverter(classificationConverter);

  // get
  const collectionSnap = await getDoc(collectionRef);

  // convert to data
  const collectionData = collectionSnap.data();

  return collectionData;
};
