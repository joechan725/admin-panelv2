import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

import { privateProductListConverter } from '@/firebase/converter/product/privateProductListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const getPrivateProductLists = async () => {
  const privateProductListsRef = collection(db, 'privateProductLists').withConverter(privateProductListConverter);
  const privateProductListsSnap = await getDocs(privateProductListsRef);

  const privateProductLists = privateProductListsSnap.docs.map((doc) => doc.data());

  const privateProducts = privateProductLists.flat();

  const sortedPrivateProducts = sortObjectsByKey(privateProducts, 'updatedAt', 'desc');

  return sortedPrivateProducts;
};
