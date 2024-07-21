import { db } from '@/firebase/config';
import { generateFakeProduct } from './generateFakeProduct';
import { addDoc, collection } from 'firebase/firestore';
import { getBrands } from '@/firebase/api/classification/brand/getBrands';
import { getCollections } from '@/firebase/api/classification/collection/getCollections';
import { getCategories } from '@/firebase/api/classification/category/getCategories';

export const addFakeProducts = async (numberOfProducts: number) => {
  const brands = await getBrands();
  const collections = await getCollections();
  const categories = await getCategories();

  const productsRef = collection(db, '/products');
  for (let i = 0; i < numberOfProducts; i++) {
    const product = generateFakeProduct({ brands, categories, collections });
    await addDoc(productsRef, product);
    console.log(`Create Fake Products ${i + 1}/${numberOfProducts}`);
  }
};
