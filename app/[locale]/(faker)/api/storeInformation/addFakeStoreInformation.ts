import { db } from '@/firebase/config';
import { generateFakeStoreInformation } from './generateFakeStoreInformation';
import { doc, setDoc } from 'firebase/firestore';

export const addFakeStoreInformation = async () => {
  const storeInformationRef = doc(db, '/store/information');

  const storeInformation = generateFakeStoreInformation();

  await setDoc(storeInformationRef, { ...storeInformation });
  console.log('Create Fake Store Information');
};
