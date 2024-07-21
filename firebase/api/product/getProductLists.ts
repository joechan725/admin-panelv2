import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

import { productListConverter } from '@/firebase/converter/product/productListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const getProductLists = async (productIds?: string[]) => {
  const productListsRef = collection(db, 'productLists').withConverter(productListConverter);

  const productListsQuery = productIds
    ? query(productListsRef, where('ids', 'array-contains-any', [...productIds]))
    : productListsRef;

  const productListsSnap = await getDocs(productListsQuery);

  const productLists = productListsSnap.docs.map((doc) => doc.data());

  const products = productLists.flat();

  const sortedProducts = sortObjectsByKey(products, 'updatedAt', 'desc');

  return sortedProducts;
};
