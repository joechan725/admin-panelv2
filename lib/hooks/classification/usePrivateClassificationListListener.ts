import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { privateClassificationListConverter } from '@/firebase/converter/classification/privateClassificationListConverter';
import { PrivateClassificationList } from '@/models/classification/PrivateClassificationList';

export const usePrivateClassificationListListener = () => {
  const [privateClassificationList, setPrivateClassificationList] = useState<PrivateClassificationList>({
    privateBrands: [],
    privateCategories: [],
    privateCollections: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const privateClassificationListRef = doc(db, '/privateLists/privateClassificationList').withConverter(
      privateClassificationListConverter
    );

    const unsubscribe = onSnapshot(
      privateClassificationListRef,
      (snapshot) => {
        const privateClassificationListData = snapshot.data();
        if (privateClassificationListData) {
          setPrivateClassificationList(privateClassificationListData);
        }
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
    privateClassificationList,
    isLoading,
    error,
  };
};
