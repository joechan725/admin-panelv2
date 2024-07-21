import { db } from '@/firebase/config';
import { generateFakeStoreAddress } from './generateFakeStoreAddress';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeStoreAddresses = async (numberOfStoreAddresses: number) => {
  const storeAddressesRef = collection(db, '/storeAddresses');
  for (let i = 0; i < numberOfStoreAddresses; i++) {
    const storeAddress = generateFakeStoreAddress();
    await addDoc(storeAddressesRef, storeAddress);
    console.log(`Create Fake Store Addresses ${i + 1}/${numberOfStoreAddresses}`);
  }
};
