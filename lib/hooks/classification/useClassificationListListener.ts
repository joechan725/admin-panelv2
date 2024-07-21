import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { classificationListConverter } from '@/firebase/converter/classification/classificationListConverter';
import { ClassificationList } from '@/models/classification/ClassificationList';

export const useClassificationListListener = () => {
  const [classificationList, setClassificationList] = useState<ClassificationList>({
    brands: [],
    categories: [],
    collections: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ClassificationListRef = doc(db, '/lists/classificationList').withConverter(classificationListConverter);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      ClassificationListRef,
      (snapshot) => {
        const classificationListData = snapshot.data();
        if (classificationListData) {
          setClassificationList(classificationListData);
        }
        setIsLoading(false);
      },
      (error) => {
        setError('Unexpected error. Please try again later.');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    classificationList,
    isLoading,
    error,
  };
};
