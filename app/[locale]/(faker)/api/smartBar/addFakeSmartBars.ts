import { db } from '@/firebase/config';
import { generateFakeSmartBar } from './generateFakeSmartBar';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeSmartBars = async (numberOfSmartBars: number) => {
  const smartBarsRef = collection(db, '/smartBars');
  for (let i = 0; i < numberOfSmartBars; i++) {
    const storeAddress = generateFakeSmartBar();
    await addDoc(smartBarsRef, storeAddress);
    console.log(`Create Fake Smart Bars ${i + 1}/${numberOfSmartBars}`);
  }
};
