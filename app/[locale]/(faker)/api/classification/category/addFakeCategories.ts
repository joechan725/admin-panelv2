import { db } from '@/firebase/config';
import { generateFakeCategory } from './generateFakeCategory';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeCategories = async (numberOfCategories: number) => {
  const categoriesRef = collection(db, '/categories');
  for (let i = 0; i < numberOfCategories; i++) {
    const category = generateFakeCategory();
    await addDoc(categoriesRef, category);
    console.log(`Create Fake Categories ${i + 1}/${numberOfCategories}`);
  }
};
