import { fakerZH_TW as faker } from '@faker-js/faker';
import { db } from '@/firebase/config';
import { generateFakeAddress } from './generateFakeAddress';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export const addFakeAddresses = async (maxNumberOfAddresses: number = 5) => {
  const usersRef = collection(db, '/users');
  const usersSnap = await getDocs(usersRef);

  for (let i = 0; i < usersSnap.size; i++) {
    const numberOfAddresses = faker.number.int({ max: maxNumberOfAddresses, min: 0 });
    const userId = usersSnap.docs.at(i)?.id;
    if (!userId) {
      continue;
    }

    const addressesRef = collection(db, `/users/${userId}/addresses`);
    for (let j = 0; j < numberOfAddresses; j++) {
      const address = generateFakeAddress();
      await addDoc(addressesRef, address);
    }
    console.log(`Create Fake User Addresses ${i + 1}/${usersSnap.size}`);
  }
};
