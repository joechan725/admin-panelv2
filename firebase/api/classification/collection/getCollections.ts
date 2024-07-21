import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Collection } from '@/models/classification/collection/Collection';
import { collection, getDocs } from 'firebase/firestore';

export const getCollections = async (): Promise<Collection[]> => {
  // prepare
  const collectionsRef = collection(db, 'collections').withConverter(classificationConverter);

  // get
  const collectionsSnap = await getDocs(collectionsRef);

  // convert to list
  const collectionsData = collectionsSnap.docs.map((doc) => ({ ...doc.data() }));

  return collectionsData;
};
