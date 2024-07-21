import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { productConverter } from '../../converter/product/productConverter';

interface GetProductsParameters {}

export const getProducts = async () => {
  const productsRef = collection(db, 'products').withConverter(productConverter);
  let productsQuery = query(productsRef, orderBy('updatedAt', 'asc'));

  // get the data
  const productsSnap = await getDocs(productsQuery);
  const products = productsSnap.docs.map((doc) => ({ ...doc.data() }));
  return products;
};
