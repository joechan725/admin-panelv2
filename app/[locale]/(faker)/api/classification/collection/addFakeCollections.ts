import { db } from '@/firebase/config';
import { generateFakeCollection } from './generateFakeCollection';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeCollections = async (numberOfCollections: number) => {
  const collectionsRef = collection(db, '/collections');
  for (let i = 0; i < numberOfCollections; i++) {
    const collection = generateFakeCollection();
    await addDoc(collectionsRef, collection);
    console.log(`Create Fake Collections ${i + 1}/${numberOfCollections}`);
  }
};
