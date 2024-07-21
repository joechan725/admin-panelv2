import { db } from '@/firebase/config';
import { classificationConverter } from '@/firebase/converter/classification/classificationConverter';
import { Collection } from '@/models/classification/collection/Collection';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface GetCollectionBySlugParameters {
  slug: string;
}

export const getCollectionBySlug = async ({ slug }: GetCollectionBySlugParameters): Promise<Collection | undefined> => {
  // prepare
  const collectionsRef = collection(db, 'collections').withConverter(classificationConverter);

  // Query by slug
  const collectionsQuery = query(collectionsRef, where('slug', '==', slug));

  // get
  const collectionsSnap = await getDocs(collectionsQuery);

  const collectionData = collectionsSnap.docs.at(0)?.data();

  return collectionData;
};
