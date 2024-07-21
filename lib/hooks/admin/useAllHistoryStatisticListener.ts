import { db } from '@/firebase/config';
import { AllHistoryStatistic } from '@/models/statistic/AllHistoryStatistic';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useAllHistoryStatisticListener = (fetch = true) => {
  const [isFetch, setIsFetch] = useState(fetch);
  const [isLoading, setIsLoading] = useState(true);
  const [allHistoryStatistic, setAllHistoryStatistic] = useState<AllHistoryStatistic | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const allHistoryStatisticRef = doc(db, '/allHistoryStatistic/allHistoryStatistic');

  useEffect(() => {
    if (!isFetch) {
      return;
    }

    const unsubscribe = onSnapshot(
      allHistoryStatisticRef,
      (snapshot) => {
        const allHistoryStatisticData = snapshot.data() as AllHistoryStatistic | undefined;
        setAllHistoryStatistic(allHistoryStatisticData);
        setIsLoading(false);
      },
      () => {
        setError('Unexpected error. Please try again later');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isFetch]);

  const loadAllHistoryStatistic = () => {
    setIsFetch(true);
  };

  return {
    allHistoryStatistic,
    error,
    isLoading,
    loadAllHistoryStatistic,
  };
};
