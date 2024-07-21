import { db } from '@/firebase/config';
import { generateFakeBrand } from './generateFakeBrand';
import { addDoc, collection } from 'firebase/firestore';

export const addFakeBrands = async (numberOfBrands: number) => {
  const brandsRef = collection(db, '/brands');
  for (let i = 0; i < numberOfBrands; i++) {
    const brand = generateFakeBrand();
    await addDoc(brandsRef, brand);
    console.log(`Create Fake Brands ${i + 1}/${numberOfBrands}`);
  }
};
