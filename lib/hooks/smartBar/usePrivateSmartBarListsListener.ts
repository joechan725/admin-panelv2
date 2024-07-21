import { SmartBar } from '@/models/smartBar/SmartBar';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { smartBarListConverter } from '@/firebase/converter/smartBar/smartBarListConverter';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';

export const usePrivateSmartBarListsListener = () => {
  const [smartBars, setSmartBars] = useState<SmartBar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const smartBarListsRef = collection(db, 'privateSmartBarLists').withConverter(smartBarListConverter);
    const smartBarListsQuery = query(smartBarListsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      smartBarListsQuery,
      (snapshot) => {
        const smartBarsListsData = snapshot.docs.map((doc) => doc.data());
        const smartBarsData = smartBarsListsData.flat();

        const sortedSmartBarsData = sortObjectsByKey(smartBarsData, 'updatedAt', 'desc');

        setSmartBars(sortedSmartBarsData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    smartBars,
    isLoading,
    error,
  };
};
