import { db } from '@/firebase/config';
import { generateFakeUser } from './generateFakeUser';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeUsers = async (numberOfUsers: number) => {
  const usersRef = collection(db, '/users');
  for (let i = 0; i < numberOfUsers; i++) {
    const user = generateFakeUser();
    await addDoc(usersRef, user);
    console.log(`Create Fake Users ${i + 1}/${numberOfUsers}`);
  }
};
