import { PrivateProduct } from '@/models/product/PrivateProduct';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { privateProductListConverter } from '@/firebase/converter/product/privateProductListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const usePrivateProductListsListener = () => {
  const [privateProducts, setPrivateProducts] = useState<PrivateProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const privateProductListsRef = collection(db, '/privateProductLists').withConverter(privateProductListConverter);

  const privateProductListsQuery = query(privateProductListsRef, orderBy('createdAt', 'desc'));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      privateProductListsQuery,
      (snapshot) => {
        const privateProductListsData = snapshot.docs.map((doc) => doc.data());

        const privateProductsData = privateProductListsData.flat();

        const sortedProductsData = sortObjectsByKey(privateProductsData, 'updatedAt', 'desc');

        setPrivateProducts(sortedProductsData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    privateProducts,
    isLoading,
    error,
  };
};
